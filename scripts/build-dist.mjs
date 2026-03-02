import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const distDir = path.join(repoRoot, 'dist');

const BLOCKED_DIRS = new Set([
  '.git',
  '.github',
  'node_modules',
  'dist',
  'scripts'
]);

const BLOCKED_FILES = [/^AGENTS\.md$/i, /^package(?:-lock)?\.json$/i, /\.py$/i, /\.md$/i, /\.log$/i];

function shouldSkipFile(name) {
  return BLOCKED_FILES.some((pattern) => pattern.test(name));
}

async function copyPublicFiles() {
  const entries = await readdir(repoRoot, { withFileTypes: true });

  for (const entry of entries) {
    const src = path.join(repoRoot, entry.name);
    const dest = path.join(distDir, entry.name);

    if (entry.isDirectory()) {
      if (BLOCKED_DIRS.has(entry.name)) {
        continue;
      }
      await cp(src, dest, { recursive: true, force: true });
      continue;
    }

    if (entry.isFile() && !shouldSkipFile(entry.name)) {
      await cp(src, dest, { force: true });
    }
  }
}

async function build() {
  await rm(distDir, { recursive: true, force: true });
  await mkdir(distDir, { recursive: true });
  await copyPublicFiles();
  console.log(`Built Cloudflare Pages output in ${path.relative(repoRoot, distDir)}`);
}

build().catch((error) => {
  console.error('Failed to generate dist directory:', error);
  process.exitCode = 1;
});
