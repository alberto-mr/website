import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../data/site';

export async function GET(context) {
  const posts = await getCollection('posts');
  const sortedPosts = posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  
  return rss({
    title: site.title,
    description: site.description,
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt || '',
      link: `/blog/${post.slug}/`,
    })),
  });
}
