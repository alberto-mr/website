import rawPublicationsData from '../data/publications.json';

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
  isInPress?: boolean;
}

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
/**
 * Lightweight TF-IDF + cosine similarity classifier
 * - Builds a corpus from publication texts + 3 area seed documents
 * - Computes IDF across corpus
 * - Scores each publication by cosine similarity to each area seed
 */
const AREA_SEEDS: Record<'eud' | 'dwb' | 'deceptive', string> = {
  eud: [
    'end user development eud trigger action if then rules automation personalization customization',
    'recommendation discovery debugging internet of things iot smart home ontology semantic shortcuts'
  ].join(' '),
  dwb: [
    'digital wellbeing self control distraction habit addiction mindful intervention nudge blocking',
    'multi device cross device smartphone screen time behavior autonomy agency humane meaningful interaction'
  ].join(' '),
  deceptive: [
    'dark pattern deceptive manipulative attention capture damaging pattern deception trick misleading',
    'consent cookie privacy opt out opt in manipulation unethical design'
  ].join(' ')
};

const STOPWORDS = new Set([
  'the','and','of','in','on','a','an','to','for','with','by','at','from','as','that','this','these','those','into','across','over','under','within','without','is','are','was','were','be','been','or','it','its','their','our','your','you','we'
]);

/**
 * Determines if a publication is "in press" based on year and DOI
 */
function isInPress(year: string, doi?: string): boolean {
  return year === '9999' || !doi;
}

/**
 * Gets the display year for a publication (shows "in press" for in press publications)
 */
export function getDisplayYear(publication: Publication): string {
  return publication.isInPress ? 'in press' : publication.year;
}

function tokenize(text: string): string[] {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t && !STOPWORDS.has(t));
}

function termFreq(tokens: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  for (const t of tokens) tf.set(t, (tf.get(t) || 0) + 1);
  return tf;
}

function cosine(a: Map<string, number>, b: Map<string, number>): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (const [, v] of a) normA += v * v;
  for (const [, v] of b) normB += v * v;
  const shorter = a.size < b.size ? a : b;
  const other = shorter === a ? b : a;
  for (const [k, v] of shorter) {
    const ov = other.get(k);
    if (ov) dot += v * ov;
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

function adjustAreaSims(text: string, sims: Record<'eud' | 'dwb' | 'deceptive', number>): Record<'eud' | 'dwb' | 'deceptive', number> {
  const t = (text || '').toLowerCase();
  let { eud, dwb, deceptive } = sims;

  const talksWellbeing = /\b(digital\s*well\s*being|wellbeing|well-being|well being)\b/.test(t);
  const mentionsShortcuts = /\b(shortcut|shortcuts|ios\s*shortcuts)\b/.test(t);
  const mentionsTriggerAction = /\b(trigger[-\s]?action|if[-\s]?then|rule|rules)\b/.test(t);
  const mentionsAttention = /\b(attention|attention\s*capture|respect\s*user\s*attention|attention\s*heuristics)\b/.test(t);

  // Specific known titles/phrases
  if (t.includes('trigger-action programming for wellbeing')) {
    dwb += 0.3;
    eud -= 0.1;
  }
  if (t.includes('digital wellbeing lens') || t.includes('attention heuristics')) {
    deceptive += 0.3;
    dwb -= 0.1;
  }

  // General adjustments
  if (talksWellbeing && (mentionsShortcuts || mentionsTriggerAction)) {
    dwb += 0.15;
    eud -= 0.05;
  }
  if (mentionsAttention) {
    deceptive += 0.15;
    dwb -= 0.05;
    eud -= 0.05;
  }

  return { eud, dwb, deceptive };
}

function processPublications(): Publication[] {
  if (Array.isArray(rawPublicationsData)) {
    // If data is already processed, ensure isInPress is set correctly
    return (rawPublicationsData as Publication[]).map(pub => ({
      ...pub,
      isInPress: pub.isInPress ?? isInPress(pub.year, pub.doi)
    }));
  } else {
    const apiData = rawPublicationsData as PolitecnicoResponse;
    
    const mapPolitecnicoToPublication = (record: PolitecnicoRecord): Publication => {
      const { lookupValues, handle, collection } = record;
      
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

      let venue = lookupValues.jtitle || lookupValues.stitle || lookupValues.book || 'Unknown venue';
      
      // Handle PhD thesis specifically
      if (collection.name.includes('Doctoral thesis')) {
        venue = 'PhD Thesis';
      }
      
      if (venue.includes('Proceedings of')) {
        venue = venue.replace('Proceedings of', '').trim();
      }
      if (venue.includes('CHI')) {
        venue = `Proceedings of the ${lookupValues.year} CHI Conference on Human Factors in Computing Systems`;
      }

      let pages = '';
      if (lookupValues.spage && lookupValues.epage) {
        pages = `${lookupValues.spage}-${lookupValues.epage}`;
      } else if (lookupValues.spage) {
        pages = lookupValues.spage;
      }

      const link = `https://iris.polito.it/handle/${handle}`;

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

      // Extract year from date string (e.g., "2020-05-22" -> "2020")
      const year = lookupValues.year ? lookupValues.year.split('-')[0] : lookupValues.year;
      
      // Determine if publication is in press
      const inPress = isInPress(year, lookupValues.doi);

      return {
        title: lookupValues.title,
        authors: formatAuthors(lookupValues.contributors),
        year: year,
        venue: venue,
        link: link,
        type: type,
        doi: lookupValues.doi,
        pages: pages,
        volume: lookupValues.volume,
        issue: lookupValues.issue,
        isInPress: inPress
      };
    };

    const publications = apiData.records.map(mapPolitecnicoToPublication);
    
    publications.sort((a, b) => {
      // In press publications come first
      if (a.isInPress && !b.isInPress) return -1;
      if (!a.isInPress && b.isInPress) return 1;
      
      // Then sort by year (most recent first)
      const yearA = parseInt(a.year) || 0;
      const yearB = parseInt(b.year) || 0;
      return yearB - yearA;
    });

    return publications;
  }
}

export function getPublicationsByResearchArea(area: 'eud' | 'dwb' | 'deceptive', limit: number = 4): Publication[] {
  const allPublications = processPublications();

  // Build seed vectors
  const seedTF: Record<'eud' | 'dwb' | 'deceptive', Map<string, number>> = {
    eud: termFreq(tokenize(AREA_SEEDS.eud)),
    dwb: termFreq(tokenize(AREA_SEEDS.dwb)),
    deceptive: termFreq(tokenize(AREA_SEEDS.deceptive))
  };

  const scored = allPublications.map((pub) => {
    const text = `${pub.title} ${pub.venue} ${pub.authors}`;
    const tf = termFreq(tokenize(text));
    const sims = {
      eud: cosine(tf, seedTF.eud),
      dwb: cosine(tf, seedTF.dwb),
      deceptive: cosine(tf, seedTF.deceptive)
    } as const;
    const adjusted = adjustAreaSims(text, { ...sims });
    const simToArea = adjusted[area];
    const otherAreas: Array<'eud' | 'dwb' | 'deceptive'> = ['eud', 'dwb', 'deceptive'].filter(a => a !== area) as any;
    const maxOther = Math.max(...otherAreas.map(a => adjusted[a]));
    return { pub, simToArea, maxOther };
  });

  const filtered = scored
    .filter(({ simToArea, maxOther }) => simToArea >= 0.05 && simToArea >= maxOther + 0.02)
    .sort((a, b) => {
      // Primary sort: in press publications first
      if (a.pub.isInPress && !b.pub.isInPress) return -1;
      if (!a.pub.isInPress && b.pub.isInPress) return 1;
      
      // Secondary sort: by year (most recent first)
      const yearA = parseInt(a.pub.year) || 0;
      const yearB = parseInt(b.pub.year) || 0;
      if (yearB !== yearA) return yearB - yearA;
      
      // Tertiary sort: by similarity score (highest first)
      return b.simToArea - a.simToArea;
    })
    .map(({ pub }) => pub);

  return filtered.slice(0, limit);
}

export function getAllPublications(): Publication[] {
  return processPublications();
}

/**
 * Generate a BibTeX entry for a publication
 */
export function generateBibTeX(publication: Publication): string {
  const { title, authors, year, venue, type, doi, pages, volume, issue } = publication;
  
  // Generate a unique key for the BibTeX entry
  const firstAuthor = authors.split(';')[0].trim();
  const lastName = firstAuthor.split(' ').pop()?.toLowerCase() || 'unknown';
  const yearShort = year.slice(-2);
  const titleWords = title.split(' ').slice(0, 3).join('').toLowerCase().replace(/[^a-z]/g, '');
  const key = `${lastName}${yearShort}${titleWords}`;
  
  // Format authors for BibTeX (convert "Name Surname" to "Surname, Name")
  const formatAuthorsForBibTeX = (authorsString: string): string => {
    return authorsString
      .split(';')
      .map(author => {
        const trimmed = author.trim();
        const parts = trimmed.split(' ');
        if (parts.length >= 2) {
          const lastName = parts.pop();
          const firstName = parts.join(' ');
          return `${lastName}, ${firstName}`;
        }
        return trimmed;
      })
      .join(' and ');
  };
  
  const bibtexAuthors = formatAuthorsForBibTeX(authors);
  
  // Generate BibTeX entry based on publication type
  let bibtex = '';
  
  if (type === 'journal') {
    bibtex = `@article{${key},
  title={${title}},
  author={${bibtexAuthors}},
  journal={${venue}},
  year={${year}}`;
    
    if (volume) bibtex += `,\n  volume={${volume}}`;
    if (issue) bibtex += `,\n  number={${issue}}`;
    if (pages) bibtex += `,\n  pages={${pages}}`;
    if (doi) bibtex += `,\n  doi={${doi}}`;
    
    bibtex += '\n}';
  } else if (type === 'conference') {
    bibtex = `@inproceedings{${key},
  title={${title}},
  author={${bibtexAuthors}},
  booktitle={${venue}},
  year={${year}}`;
    
    if (pages) bibtex += `,\n  pages={${pages}}`;
    if (doi) bibtex += `,\n  doi={${doi}}`;
    
    bibtex += '\n}';
  } else if (type === 'thesis') {
    bibtex = `@phdthesis{${key},
  title={${title}},
  author={${bibtexAuthors}},
  school={${venue}},
  year={${year}}`;
    
    if (doi) bibtex += `,\n  doi={${doi}}`;
    
    bibtex += '\n}';
  } else if (type === 'book') {
    bibtex = `@book{${key},
  title={${title}},
  author={${bibtexAuthors}},
  publisher={${venue}},
  year={${year}}`;
    
    if (doi) bibtex += `,\n  doi={${doi}}`;
    
    bibtex += '\n}';
  } else {
    // Default to misc
    bibtex = `@misc{${key},
  title={${title}},
  author={${bibtexAuthors}},
  howpublished={${venue}},
  year={${year}}`;
    
    if (doi) bibtex += `,\n  doi={${doi}}`;
    
    bibtex += '\n}';
  }
  
  return bibtex;
}

/**
 * Download BibTeX content as a file
 */
export function downloadBibTeX(bibtex: string, filename: string): void {
  const blob = new Blob([bibtex], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
