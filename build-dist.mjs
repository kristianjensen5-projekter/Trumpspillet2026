/* build-dist.mjs — samler KUN de filer spillet faktisk bruger i dist/.
 *
 * Hvorfor: `wrangler pages deploy .` uploader HELE mappen og respekterer IKKE
 * .gitignore. Granskningen 2026-08-12 fandt derfor STATUS.md,
 * GITHUB_APPEAL_UDKAST.md, OVERSIGT_JOKES.md, tre gamle spilversioner og
 * tests/ liggende offentligt på pages.dev. Deploy dist/ — aldrig "." igen.
 *
 * Kør:   node build-dist.mjs
 * Deploy: npx wrangler pages deploy dist --project-name trumpspillet2026 \
 *           --branch=main --commit-dirty=true
 */
import { readFileSync, existsSync, mkdirSync, copyFileSync, rmSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const DIST = join(ROOT, 'dist');
const html = readFileSync(join(ROOT, 'index.html'), 'utf8');

// Assets udledes af index.html — så en ny bane med et nyt billede kommer
// automatisk med, i stedet for at blive glemt her.
const refs = new Set(['index.html', '_redirects']);
for (const m of html.matchAll(/["']((?:assets|Musik til trumpspillet)\/[^"']+)["']/g)) refs.add(m[1]);
for (const m of html.matchAll(/["'](icon-\d+\.png|apple-touch-icon\.png|favicon-32\.png|manifest\.json)["']/g)) refs.add(m[1]);

const missing = [...refs].filter(r => !existsSync(join(ROOT, r)));
if (missing.length) {
  console.error('❌ Manglende filer:\n  ' + missing.join('\n  '));
  process.exit(1);
}

rmSync(DIST, { recursive: true, force: true });
for (const rel of refs) {
  const dest = join(DIST, rel);
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(join(ROOT, rel), dest);
}

// Kvittering: præcis hvad der bliver offentligt
const walk = (d, base = '') => readdirSync(d).flatMap(f => {
  const p = join(d, f), rel = base ? `${base}/${f}` : f;
  return statSync(p).isDirectory() ? walk(p, rel) : [[rel, statSync(p).size]];
});
const files = walk(DIST).sort();
const total = files.reduce((s, [, n]) => s + n, 0);
console.log(`dist/ bygget — ${files.length} filer, ${(total / 1024 / 1024).toFixed(2)} MB\n`);
for (const [f, n] of files) console.log(`  ${String(Math.round(n / 1024)).padStart(5)} KB  ${f}`);

const forbidden = files.filter(([f]) => /\.(md|mjs)$/i.test(f) || f.startsWith('tests/') || f.startsWith('.'));
if (forbidden.length) {
  console.error('\n❌ Dokumenter/tests er havnet i dist/:', forbidden.map(([f]) => f).join(', '));
  process.exit(1);
}
console.log('\n✅ Ingen .md, .mjs, tests/ eller dotfiles i dist/.');
