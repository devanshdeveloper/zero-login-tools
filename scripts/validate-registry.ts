import fs from 'fs';
import path from 'path';
import { tools } from '../lib/tools/tool-registry';
import { categories } from '../data/categories';

const TOOL_COMPONENTS_DIR = path.join(process.cwd(), 'components', 'tool');

function validateRegistry() {
  const errors: string[] = [];
  const slugs = new Set<string>();
  const categoryIds = new Set(categories.map((c) => c.id));

  console.log('Validating tool registry and categories...');

  // 1. Validate ToolCategory union type sync
  const registryFilePath = path.join(process.cwd(), 'lib', 'tools', 'tool-registry.ts');
  const registryContent = fs.readFileSync(registryFilePath, 'utf8');
  const toolCategoryMatch = registryContent.match(/export type ToolCategory =([\s\S]*?);/);
  
  if (toolCategoryMatch) {
    const typeValues = toolCategoryMatch[1]
      .split('|')
      .map(v => v.trim().replace(/['"]/g, ''))
      .filter(v => v.length > 0);
    
    const typeValuesSet = new Set(typeValues);
    
    // Check if all categories in data/categories.ts are in the union type
    categories.forEach(cat => {
      if (!typeValuesSet.has(cat.id)) {
        errors.push(`Category "${cat.id}" from data/categories.ts is missing from ToolCategory union type in lib/tools/tool-registry.ts`);
      }
    });
    
    // Check if all values in union type are in data/categories.ts
    typeValues.forEach(val => {
      if (!categoryIds.has(val)) {
        errors.push(`Value "${val}" in ToolCategory union type is missing from data/categories.ts`);
      }
    });
  } else {
    errors.push('Could not find ToolCategory union type definition in lib/tools/tool-registry.ts');
  }

  // 2. Validate Categories data
  const categorySlugs = new Set<string>();
  categories.forEach((cat) => {
    if (categorySlugs.has(cat.id)) {
      errors.push(`Duplicate category ID found: ${cat.id}`);
    }
    categorySlugs.add(cat.id);

    if (cat.parentId && !categoryIds.has(cat.parentId)) {
      errors.push(`Category "${cat.name}" (${cat.id}) has non-existent parentId: ${cat.parentId}`);
    }
  });

  tools.forEach((tool) => {
    // 2. Check for duplicate slugs
    if (slugs.has(tool.slug)) {
      errors.push(`Duplicate tool slug found: ${tool.slug}`);
    }
    slugs.add(tool.slug);

    // 3. Check if slug matches a directory in components/tool
    const componentDir = path.join(TOOL_COMPONENTS_DIR, tool.slug);
    if (!fs.existsSync(componentDir)) {
      errors.push(`Tool "${tool.name}" has slug "${tool.slug}" but no directory exists at components/tool/${tool.slug}`);
    }

    // 4. Check if tool category exists in data/categories.ts
    if (!categoryIds.has(tool.category)) {
      errors.push(`Tool "${tool.name}" has category "${tool.category}" which is missing from data/categories.ts`);
    }

    // 5. Check for required SEO fields
    if (!tool.seo.title || tool.seo.title.length < 10) {
      errors.push(`Tool "${tool.name}" has a weak or missing SEO title.`);
    }
    if (!tool.seo.description || tool.seo.description.length < 50) {
      errors.push(`Tool "${tool.name}" has a weak or missing SEO description.`);
    }

    // 6. Check if related tools exist
    tool.relatedTools.forEach((relatedSlug) => {
      if (relatedSlug === tool.slug) {
        errors.push(`Tool "${tool.name}" lists itself as a related tool.`);
      }
    });
  });

  // 7. Second pass for cross-references
  tools.forEach((tool) => {
    tool.relatedTools.forEach((relatedSlug) => {
      if (!slugs.has(relatedSlug)) {
        errors.push(`Tool "${tool.name}" references non-existent related tool: ${relatedSlug}`);
      }
    });
  });

  // 8. Check for unused categories
  const usedCategories = new Set(tools.map((t) => t.category));
  categories.forEach((cat) => {
    // We only care about leaf categories (those not used as parentId) being used,
    // or we can just list them as a warning.
    const isParent = categories.some((c) => c.parentId === cat.id);
    if (!isParent && !usedCategories.has(cat.id)) {
      console.warn(`Warning: Category "${cat.name}" (${cat.id}) is not used by any tool.`);
    }
  });

  if (errors.length > 0) {
    console.error(`\nValidation failed with ${errors.length} errors:`);
    errors.forEach((err) => console.error(`- ${err}`));
    process.exit(1);
  } else {
    console.log('\nValidation successful! All tools and categories are correctly synchronized.');
    process.exit(0);
  }
}

validateRegistry();
