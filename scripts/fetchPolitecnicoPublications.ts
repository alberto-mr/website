import fetch from 'node-fetch';
import { writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface PolitecnicoRecord {
  name: string;
  handle: string;
  lookupValues: {
    title: string;
    year: string;
    citation: string;
    contributors: string;
    jtitle?: string;
    stitle?: string;
    book?: string;
    doi?: string;
    isbn?: string;
    volume?: string;
    issue?: string;
    spage?: string;
    epage?: string;
  };
  collection: {
    name: string;
  };
}

interface PolitecnicoResponse {
  TotalRecs: number;
  records: PolitecnicoRecord[];
}

interface Publication {
  title: string;
  authors: string;
  year: string;
  venue: string;
  link: string;
  type: string;
  doi?: string;
  pages?: string;
  volume?: string;
  issue?: string;
}

const POLITECNICO_API_URL = 'https://www.swas.polito.it/dotnet/WMHandler/IrisEsportaJson.ashx?rp=rp29216';
const PUBLICATIONS_FILE = path.resolve(__dirname, '../src/data/publications.json');

function mapPolitecnicoToPublication(record: PolitecnicoRecord): Publication {
  const { lookupValues, handle, collection } = record;
  
  // Determine publication type based on collection name
  let type = 'misc';
  if (collection.name.includes('Articolo in rivista')) {
    type = 'journal';
  } else if (collection.name.includes('Atti di convegno')) {
    type = 'conference';
  } else if (collection.name.includes('Doctoral thesis')) {
    type = 'thesis';
  } else if (collection.name.includes('volume')) {
    type = 'book';
  }

  // Extract venue information
  let venue = lookupValues.jtitle || lookupValues.stitle || lookupValues.book || 'Unknown venue';
  
  // Clean up venue name
  if (venue.includes('Proceedings of')) {
    venue = venue.replace('Proceedings of', '').trim();
  }
  if (venue.includes('CHI')) {
    venue = `Proceedings of the ${lookupValues.year} CHI Conference on Human Factors in Computing Systems`;
  }

  // Format pages
  let pages = '';
  if (lookupValues.spage && lookupValues.epage) {
    pages = `${lookupValues.spage}-${lookupValues.epage}`;
  } else if (lookupValues.spage) {
    pages = lookupValues.spage;
  }

  // Create link to Politecnico repository
  const link = `https://iris.polito.it/handle/${handle}`;

  // Format authors from "SURNAME, NAME" to "Name Surname"
  const formatAuthors = (authorsString: string): string => {
    return authorsString
      .split(';')
      .map(author => {
        const trimmed = author.trim();
        if (trimmed.includes(',')) {
          const [surname, ...nameParts] = trimmed.split(',').map(s => s.trim());
          const name = nameParts.join(' ').trim();
          return name && surname ? `${name} ${surname}` : trimmed;
        }
        return trimmed;
      })
      .join('; ');
  };

  return {
    title: lookupValues.title,
    authors: formatAuthors(lookupValues.contributors),
    year: lookupValues.year,
    venue: venue,
    link: link,
    type: type,
    doi: lookupValues.doi,
    pages: pages,
    volume: lookupValues.volume,
    issue: lookupValues.issue
  };
}

async function fetchPolitecnicoPublications(): Promise<Publication[]> {
  try {
    console.log('Fetching publications from Politecnico di Torino portal...');
    
    const response = await fetch(POLITECNICO_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: PolitecnicoResponse = await response.json();
    console.log(`Found ${data.TotalRecs} publications`);
    
    const publications = data.records.map(mapPolitecnicoToPublication);
    
    // Sort by year (newest first)
    publications.sort((a, b) => {
      const yearA = parseInt(a.year) || 0;
      const yearB = parseInt(b.year) || 0;
      return yearB - yearA;
    });
    
    return publications;
  } catch (error) {
    console.error('Error fetching publications:', error);
    throw error;
  }
}

async function main() {
  try {
    const publications = await fetchPolitecnicoPublications();
    
    // Write to JSON file
    writeFileSync(PUBLICATIONS_FILE, JSON.stringify(publications, null, 2), 'utf-8');
    
    console.log(`Successfully fetched ${publications.length} publications and saved to ${PUBLICATIONS_FILE}`);
    
    // Show some statistics
    const byType = publications.reduce((acc, pub) => {
      acc[pub.type] = (acc[pub.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    console.log('\nPublication types:');
    Object.entries(byType).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });
    
  } catch (error) {
    console.error('Failed to fetch publications:', error);
    process.exit(1);
  }
}

main();
