# EMBED_GUIDE — Trumpspillet på politiken.dk

> Fable 5, 2026-07-11. Publicerings-forarbejde: embed-anbefaling,
> sikkerheds-audit mod `context/03_security.md` og verificeret iframe-test.
> Når redaktionen har valgt format, er resten ren udførelse.

## Anbefaling: IFRAME (ikke inline HTML)

Spillet er bygget som en **fuldskærms-side**, ikke en komponent: det
styler `body/html`, bruger globale ID'er (`#intro`, `#start-btn`, HUD),
`position:fixed`-UI, globale event-listeners og `window`-resize. Det
opfylder derfor IKKE brand-reglernes CMS-isolationskrav for inline-embeds
(unik wrapper, scoped CSS, ingen globale selectors — `02_brand.md`).

- **Iframe giver al isolationen gratis** — værtssiden kan ikke påvirkes
- Inline i CUE ville kræve en stor omskrivning (wrapper + scoping af alt)
  med høj regressionsrisiko — **frarådes**
- Kristian har afklaret (2026-07-08) at begge formater er acceptable

## Iframe-koden til CUE

```html
<iframe src="https://trumpspillet2026.pages.dev/"
        title="Trumpspillet 2026"
        style="width:100%; aspect-ratio:16/10; border:0; display:block"
        loading="lazy"></iframe>
```

- **Højde:** spillet tilpasser sig SELV iframens format — bredt vindue =
  desktop-stage med guldramme, højt/smalt = mobiloplevelsen. På mobil bør
  iframen være høj: tilføj fx
  `@media (max-width:600px){ iframe { aspect-ratio:9/16; } }` (eller brug
  CUE's standard-højder). Testet i begge formater
- Ingen `allow`-tilladelser nødvendige (lyd starter først ved brugerens
  tryk — iOS-kompatibelt). `sandbox` er unødvendigt (eget indhold), men
  `sandbox="allow-scripts allow-same-origin"` virker hvis IT kræver det
  (`allow-same-origin` er nødvendig for medalje-lagring)
- Fuld URL-liste: `/` (spillet) · `/index-v1` (arkiv, skal IKKE embeddes)

## Sikkerheds-audit mod `context/03_security.md` (2026-07-11)

Baselinens fem lag er designet til widgets med læserindhold + workers.
Trumpspillet har **ingen læser-input, ingen backend, ingen eksterne
scripts** — auditens resultat:

| Lag | Status | Begrundelse |
|---|---|---|
| 1. SRI på CDN-scripts | **N/A ✓** | Nul eksterne scripts/styles — verificeret: `grep -c "https://" index.html` = 0. Alt er self-contained; kun relative assets (4 MP3, 3 billeder) fra samme origin |
| 2. CORS-allowlist på worker | **N/A ✓** | Ingen worker, ingen API-kald, ingen fetch/XHR i koden |
| 3. File-upload-validering | **N/A ✓** | Ingen uploads |
| 4. XSS ved JSON-rendering | **N/A ✓** | Al JSON er egen, statisk, inline i filen (`#game-data`) — intet eksternt indhold renderes. Tegning sker på canvas (ikke innerHTML) |
| 5. CSP-headers på API | **N/A ✓** | Intet API |

**GDPR/localStorage:** kun spil-fremskridt (`trumpv2-medals`,
`trumpv2-music-muted`) — ingen personhenførbare data, ingen cookies,
ingen tracking. Ingen samtykke-implikationer.

**Redaktionelt (afklaret):** `assets/oval office/obamaabes.jpeg` vises
åbent i spillet — Kristian har clearet det redaktionelt 2026-07-08
(billedet har været bragt i alle større medier).

## Før produktion (anbefalinger, kræver beslutning)

1. **Flyt til Politikens Cloudflare-konto** (baseline-kravet i
   03_security "før produktion") — eller aftal at pages.dev-URL'en er OK
2. **Valgfrit hardening:** en `_headers`-fil kan låse indlejring til
   Politiken: `Content-Security-Policy: frame-ancestors 'self'
   https://politiken.dk https://*.politiken.dk` — IKKE aktiveret endnu,
   da CUE-preview-domænerne skal kendes først
3. Overvej et politiken-venligt URL-alias/custom domain

## Verificeret iframe-test

`tests/embed_host.html` (simuleret artikelside) + `tests/embed.mjs`:

- ✅ Desktop 1200×900 + iPhone 390×844 (touch): spillet booter i iframen,
  klik/tap-input virker GENNEM iframen, værtssiden er upåvirket,
  0 pageerrors. Kør igen med `node tests/embed.mjs`
- Testnote: klik skal ske som rigtige brugere gør (side-koordinater over
  iframen) — Playwrights frame-lokator-klik kunne ikke ramme knappen
  gennem host-sidens layout, men rigtige klik virker (verificeret)
