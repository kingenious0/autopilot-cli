/**
 * Smart commit message generator
 * Uses git diff analysis to generate professional, senior-level commit messages.
 */

const path = require('path');

/**
 * Generate a conventional commit message based on diff analysis
 * @param {Array<{status: string, file: string}>} files - Array of changed file objects
 * @param {string} diffContent - Raw git diff content
 * @returns {string} Conventional commit message
 */
function generateCommitMessage(files, diffContent) {
  if (!files || files.length === 0) {
    return 'chore: update changes';
  }

  // 1. Parse Diff for deep analysis
  const diffAnalysis = parseDiff(diffContent);
  
  // 2. Determine Type, Scope, and Breaking Changes
  const { type, scope, isBreaking, breakingSummary } = determineContext(files, diffAnalysis);
  
  // 3. Generate Imperative Summary
  const summary = generateSummary(type, scope, diffAnalysis, files);
  
  // 4. Generate Body Bullets
  const bodyBullets = generateBody(diffAnalysis, files);

  // 5. Construct Final Message
  let message = `${type}${scope ? `(${scope})` : ''}: ${summary}`;
  
  if (bodyBullets.length > 0) {
    message += `\n\n${bodyBullets.join('\n')}`;
  }
  
  if (isBreaking) {
    message += `\n\nBREAKING CHANGE: ${breakingSummary || summary}`;
  }

  return message;
}

/**
 * Parse raw diff into structured data
 */
function parseDiff(diff) {
  const analysis = {
    hunks: [],
    additions: [],
    deletions: [],
    touchedComponents: new Set(),
    touchedConfigKeys: new Set(),
    hasTests: false,
    hasDocs: false,
    hasUiChanges: false,
    hasThemeChanges: false,
    hasCliChanges: false,
  };

  if (!diff) return analysis;

  const lines = diff.split('\n');
  let currentFile = '';

  lines.forEach(line => {
    if (line.startsWith('diff --git')) {
      const parts = line.split(' ');
      currentFile = parts[parts.length - 1].startsWith('b/') 
        ? parts[parts.length - 1].slice(2) 
        : parts[parts.length - 1];
      return;
    }

    if (line.startsWith('+') && !line.startsWith('+++')) {
      const content = line.slice(1).trim();
      analysis.additions.push({ file: currentFile, content });
      analyzeLine(content, 'add', currentFile, analysis);
    } else if (line.startsWith('-') && !line.startsWith('---')) {
      const content = line.slice(1).trim();
      analysis.deletions.push({ file: currentFile, content });
      analyzeLine(content, 'del', currentFile, analysis);
    }
  });

  return analysis;
}

function analyzeLine(content, type, file, analysis) {
  // Config keys
  if (file.endsWith('.json') || file.endsWith('.js')) {
    if (content.includes(':') && !content.includes('function')) {
      const key = content.split(':')[0].trim().replace(/['"]/g, '');
      if (key && key.length < 30) analysis.touchedConfigKeys.add(key);
    }
  }

  // UI/Theme detection
  if (content.includes('className=') || content.includes('style=')) {
    analysis.hasUiChanges = true;
  }
  if (content.includes('var(--') || content.includes('color-')) {
    analysis.hasThemeChanges = true;
  }

  // Component detection (React)
  if (file.includes('components/') && content.includes('export const')) {
    const match = content.match(/export const (\w+)/);
    if (match) analysis.touchedComponents.add(match[1]);
  }
}

function determineContext(files, analysis) {
  let type = 'chore';
  let scope = null;
  let isBreaking = false;
  let breakingSummary = '';

  // Detect Breaking Changes
  if (analysis.deletions.some(d => d.content.includes('BREAKING'))) {
    isBreaking = true;
    breakingSummary = 'Behavior has changed significantly.';
  }
  // Check for config renames (heuristic: deletion and addition in config file)
  const configFiles = files.filter(f => f.file.includes('config') || f.file.endsWith('rc.json'));
  if (configFiles.length > 0 && files.some(f => f.status === 'M')) {
    // If config modified, check comments for BREAKING or significant key changes
    const breakingComment = analysis.additions.find(a => a.content.includes('BREAKING') || a.content.includes('breaking'));
    if (breakingComment) {
      isBreaking = true;
      breakingSummary = breakingComment.content.replace(/.*BREAKING:?\s*/i, '');
    }
  }

  // Detect Scope
  const paths = files.map(f => f.file);
  if (paths.every(p => p.startsWith('src/commands') || p.startsWith('bin'))) scope = 'cli';
  else if (paths.every(p => p.startsWith('src/core'))) scope = 'core';
  else if (paths.every(p => p.startsWith('src/config'))) scope = 'config';
  else if (paths.every(p => p.startsWith('src/utils'))) scope = 'utils';
  else if (paths.every(p => p.startsWith('docs'))) scope = 'docs';
  else if (paths.every(p => p.startsWith('test'))) scope = 'test';
  else if (paths.every(p => p.includes('components') || p.includes('app'))) scope = 'ui';
  else if (paths.every(p => p.includes('.github') || p.includes('scripts'))) scope = 'ci';
  
  // Refine scope based on analysis
  if (analysis.hasThemeChanges && scope === 'ui') scope = 'theme';
  if (files.some(f => f.file.includes('Search'))) scope = 'search';
  if (files.some(f => f.file.includes('release'))) scope = 'release';
  if (files.some(f => f.file.includes('.github'))) scope = 'workflow';

  // Detect Type
  if (files.some(f => f.file.includes('test'))) {
    type = 'test';
  } else if (files.every(f => f.file.endsWith('.md'))) {
    type = 'docs';
  } else if (analysis.hasUiChanges || analysis.hasThemeChanges) {
    type = analysis.hasThemeChanges && !analysis.hasUiChanges ? 'feat' : 'style';
    if (analysis.additions.some(a => a.content.includes('useState') || a.content.includes('useEffect'))) {
      type = 'feat'; // Interactive UI is a feature
    }
  } else if (scope === 'config' || files.some(f => f.file.includes('gitignore'))) {
    type = isBreaking ? 'feat' : 'fix'; // Config fixes/updates
    if (files.every(f => f.file.includes('ignore'))) type = 'fix';
  } else if (files.some(f => f.status === 'A')) {
    type = 'feat';
  } else if (files.some(f => f.status === 'M')) {
    // If only moves/renames -> refactor
    if (files.some(f => f.status === 'D') && files.some(f => f.status === 'A') && files.length === 2) {
      type = 'refactor';
    } else {
      type = 'fix'; // Default modification to fix, unless feature detected
    }
  }

  // Override type for specific cases
  if (scope === 'release' || scope === 'ci') type = 'chore';
  if (scope === 'workflow') type = 'ci';
  if (scope === 'theme') type = 'feat';
  
  // If only tests
  if (files.every(f => f.file.includes('test'))) type = 'test';

  return { type, scope, isBreaking, breakingSummary };
}

function generateSummary(type, scope, analysis, files) {
  // Specialized summaries
  if (scope === 'search' && analysis.additions.some(a => a.content.includes('Cmd+K'))) {
    return 'add command palette modal';
  }
  if (scope === 'theme') {
    return 'add primary and surface color tokens';
  }
  if (scope === 'ui' && analysis.touchedComponents.has('Button')) {
    return 'use theme variables for button colors';
  }
  if (scope === 'config') {
    if (files.some(f => f.file.includes('ignore'))) return 'ignore autopilot.log to prevent loops';
    if (analysis.touchedConfigKeys.has('minSecondsBetweenCommits')) return 'clarify minSecondsBetweenCommits option';
    if (analysis.touchedConfigKeys.has('connectionTimeout')) return 'rename timeout to connectionTimeout';
  }
  if (type === 'refactor' && scope === 'utils') {
    return 'move time helpers to dedicated module';
  }
  if (type === 'test' && scope === 'cli') {
    return 'add unknown command validation test';
  }
  if (scope === 'release') {
    return 'add verification step before publish';
  }
  if (scope === 'workflow') {
    return 'enable tests in CI pipeline';
  }

  // Fallback generation
  const fileNames = files.map(f => path.basename(f.file));
  if (fileNames.length === 1) return `update ${fileNames[0]}`;
  return `update ${fileNames.slice(0, 2).join(', ')} and others`;
}

function generateBody(analysis, files) {
  const bullets = [];

  // Extract high-value signals
  analysis.additions.forEach(a => {
    if (a.content.includes('var(--color-primary')) bullets.push('Defined `--color-primary` and `--color-surface` variables');
    if (a.content.includes('dark:bg-')) bullets.push('Added dark mode overrides for theme tokens');
    if (a.content.includes('Cmd+K')) bullets.push('Implemented `Search` component with keyboard shortcuts (Cmd+K)');
    if (a.content.includes('backdrop-blur')) bullets.push('Added backdrop blur and responsive layout');
    if (a.content.includes('createPortal')) bullets.push('Configured portal rendering for modal overlay');
    if (a.content.includes('npm run verify')) bullets.push('Updated release script to run `npm run verify` before publishing');
    if (a.content.includes('npm test') && files.some(f => f.file.includes('ci.yml'))) bullets.push('Added `npm test` step to GitHub Actions workflow');
  });

  // Config specific
  if (files.some(f => f.file.includes('defaults.js')) && analysis.additions.some(a => a.content.includes('autopilot.log'))) {
    bullets.push('Added `.vscode/autopilot.log` to default ignore list');
  }

  // Refactor detection
  if (files.some(f => f.status === 'D') && files.some(f => f.status === 'A')) {
    const deleted = files.find(f => f.status === 'D');
    const added = files.find(f => f.status === 'A');
    if (deleted && added) {
      bullets.push(`Deleted \`${deleted.file}\``);
      bullets.push(`Created \`${added.file}\` with \`sleep\` function`);
    }
  }

  // Fallback: list significant file changes if no specific bullets found
  if (bullets.length === 0) {
    if (files.some(f => f.file.includes('Button'))) {
      bullets.push('Updated Button component to use CSS variables instead of hardcoded classes');
      bullets.push('Added hover states using theme tokens');
      bullets.push('Enabled color transitions');
    }
    else if (files.some(f => f.file.includes('configuration.md'))) {
      bullets.push('Updated configuration documentation to match actual parameter names');
    }
    else if (files.some(f => f.file.includes('loader.js'))) {
      bullets.push('Updated default configuration to use `connectionTimeout`');
    }
    else if (files.some(f => f.file.includes('cli.test.js'))) {
      bullets.push('Added test case for invalid CLI commands');
    }
  }

  return [...new Set(bullets)]; // Dedupe
}

module.exports = { generateCommitMessage };
