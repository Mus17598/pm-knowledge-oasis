import axios from 'axios';
import { promises as fs } from 'fs';
import path from 'path';
import { youtubeResources, blogResources, pmTools, caseStudies, templates } from '../src/data/resources.ts';

interface Resource {
  title?: string;
  name?: string;
  url: string;
  [key: string]: any;
}

interface ValidationResult {
  valid: boolean;
  status?: number;
  error?: string;
}

async function validateLink(url: string): Promise<ValidationResult> {
  try {
    const response = await axios.head(url, {
      timeout: 5000
    });
    return { valid: true, status: response.status };
  } catch (error) {
    return { 
      valid: false, 
      status: error.response?.status,
      error: error.message 
    };
  }
}

async function validateYouTubeLink(url: string): Promise<ValidationResult> {
  try {
    // Extract video ID from URL
    const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
    if (!videoId) {
      return { valid: false, error: 'Invalid YouTube URL format' };
    }

    // Check video existence using YouTube API
    const response = await axios.get(`https://www.youtube.com/oembed?url=${url}&format=json`, {
      timeout: 5000
    });
    return { valid: true, status: response.status };
  } catch (error) {
    return { 
      valid: false, 
      status: error.response?.status,
      error: error.message 
    };
  }
}

async function validateResources(resources: Resource[], isYouTube: boolean = false): Promise<Resource[]> {
  const validResources: Resource[] = [];
  const invalidResources: Resource[] = [];

  console.log(`\nValidating ${resources.length} resources...`);

  for (const resource of resources) {
    const resourceTitle = resource.title || resource.name;
    console.log(`Checking: ${resourceTitle}`);
    const result = isYouTube 
      ? await validateYouTubeLink(resource.url)
      : await validateLink(resource.url);

    if (result.valid) {
      validResources.push(resource);
      console.log(`✅ Valid: ${resourceTitle}`);
    } else {
      invalidResources.push(resource);
      console.log(`❌ Invalid: ${resourceTitle} (${result.error || `Status: ${result.status}`})`);
    }
  }

  console.log(`\nValidation Summary:`);
  console.log(`Total: ${resources.length}`);
  console.log(`Valid: ${validResources.length}`);
  console.log(`Invalid: ${invalidResources.length}`);

  return validResources;
}

async function updateResourcesFile(validResources: {
  youtube: Resource[];
  blog: Resource[];
  tools: Resource[];
  caseStudies: Resource[];
  templates: Resource[];
}) {
  // ESM-compatible __dirname replacement
  const __filename = new URL(import.meta.url).pathname;
  const __dirname = path.dirname(__filename);
  let filePath = path.join(__dirname, '../src/data/resources.ts');
  filePath = decodeURIComponent(filePath);
  let content = await fs.readFile(filePath, 'utf-8');

  // Update each resource array
  content = content.replace(
    /export const youtubeResources = \[[\s\S]*?\];/,
    `export const youtubeResources = ${JSON.stringify(validResources.youtube, null, 2)};`
  );
  content = content.replace(
    /export const blogResources = \[[\s\S]*?\];/,
    `export const blogResources = ${JSON.stringify(validResources.blog, null, 2)};`
  );
  content = content.replace(
    /export const pmTools = \[[\s\S]*?\];/,
    `export const pmTools = ${JSON.stringify(validResources.tools, null, 2)};`
  );
  content = content.replace(
    /export const caseStudies = \[[\s\S]*?\];/,
    `export const caseStudies = ${JSON.stringify(validResources.caseStudies, null, 2)};`
  );
  content = content.replace(
    /export const templates = \[[\s\S]*?\];/,
    `export const templates = ${JSON.stringify(validResources.templates, null, 2)};`
  );

  await fs.writeFile(filePath, content, 'utf-8');
  console.log('\nResources file updated successfully!');
}

async function main() {
  try {
    console.log('Starting resource validation...');

    const validResources = {
      youtube: await validateResources(youtubeResources, true),
      blog: await validateResources(blogResources),
      tools: await validateResources(pmTools),
      caseStudies: await validateResources(caseStudies),
      templates: await validateResources(templates)
    };

    await updateResourcesFile(validResources);

    console.log('\nValidation complete!');
  } catch (error) {
    console.error('Error during validation:', error);
    process.exit(1);
  }
}

main(); 