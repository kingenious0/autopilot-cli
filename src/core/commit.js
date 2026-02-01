/**
 * Smart commit message generator
 */

const path = require('path');

/**
 * Generate a conventional commit message based on changed files
 * @param {Array<{status: string, file: string}>} files - Array of changed file objects
 * @returns {string} Conventional commit message
 */
function generateCommitMessage(files) {
  if (!files || files.length === 0) {
    return 'chore: update changes';
  }

  // 1. Group files by category/directory
  const groups = {};
  const categories = {
    fix: false,
    feat: false,
    docs: false,
    test: false,
    config: false,
  };

  files.forEach(({ status, file }) => {
    const normalized = file.replace(/\\/g, '/');
    const parts = normalized.split('/');
    let group = 'root';
    
    // Determine group based on path
    if (parts.length > 1) {
      if (parts[0] === 'src' && parts.length > 2) {
        group = parts[1]; // e.g. src/core -> core
      } else if (parts[0] === 'app' || parts[0] === 'pages' || parts[0] === 'components' || parts[0] === 'lib') {
        group = parts[0]; // Next.js standard folders
      } else {
        group = parts[0];
      }
    }

    if (!groups[group]) {
      groups[group] = { added: [], modified: [], deleted: [] };
    }

    // Categorize for commit type
    detectCategory(normalized, categories);

    // Add to group lists based on status
    // Status codes: '??' (untracked), 'A' (added), 'M' (modified), 'D' (deleted), 'R' (renamed)
    if (status === '??' || status === 'A') {
      groups[group].added.push(path.basename(normalized));
    } else if (status === 'D') {
      groups[group].deleted.push(path.basename(normalized));
    } else {
      groups[group].modified.push(path.basename(normalized));
    }
  });

  // 2. Determine primary type
  let type = 'chore';
  if (categories.fix) type = 'fix';
  else if (categories.feat) type = 'feat';
  else if (categories.docs) type = 'docs';
  else if (categories.config) type = 'chore'; // Config usually chore unless explicit
  else if (categories.test) type = 'test';

  // 3. Build Header
  // e.g., "feat: update components and core"
  const groupNames = Object.keys(groups).filter(g => g !== 'root');
  let subject = 'update changes';
  if (groupNames.length > 0) {
    if (groupNames.length <= 3) {
      subject = `update ${groupNames.join(', ')}`;
    } else {
      subject = `update ${groupNames.slice(0, 2).join(', ')} and others`;
    }
  }
  
  const header = `${type}: ${subject}`;

  // 4. Build Body
  const bodyLines = [];
  
  Object.keys(groups).sort().forEach(group => {
    const changes = [];
    const g = groups[group];
    
    if (g.added.length > 0) {
      changes.push(`Added ${formatFileList(g.added)}`);
    }
    if (g.modified.length > 0) {
      changes.push(`Modified ${formatFileList(g.modified)}`);
    }
    if (g.deleted.length > 0) {
      changes.push(`Deleted ${formatFileList(g.deleted)}`);
    }

    if (changes.length > 0) {
      const groupLabel = group === 'root' ? 'Root' : capitalize(group);
      bodyLines.push(`- ${groupLabel}: ${changes.join('; ')}`);
    }
  });

  return `${header}\n\n${bodyLines.join('\n')}`;
}

function formatFileList(files) {
  if (files.length <= 3) return files.join(', ');
  return `${files.slice(0, 3).join(', ')} (+${files.length - 3} more)`;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function detectCategory(normalized, categories) {
  // Fix detection
  if (
    normalized.includes('/fix/') || normalized.includes('fix') ||
    normalized.includes('bug') || normalized.includes('error')
  ) {
    categories.fix = true;
  }

  // Docs detection
  if (normalized.endsWith('.md') || normalized.endsWith('.txt')) {
    categories.docs = true;
  }

  // Test detection
  if (normalized.includes('.test.') || normalized.includes('.spec.') || normalized.includes('__tests__')) {
    categories.test = true;
  }

  // Feat detection (src/app/components changes)
  if (
    (normalized.startsWith('src/') || normalized.startsWith('app/') || normalized.startsWith('components/')) &&
    !categories.test && !categories.fix
  ) {
    categories.feat = true;
  }

  // Config detection
  if (
    normalized.includes('config') || normalized.includes('.json') || 
    normalized.startsWith('.')
  ) {
    categories.config = true;
  }
}

module.exports = { generateCommitMessage };
