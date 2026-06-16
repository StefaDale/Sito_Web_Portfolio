# PROJECT_CONTEXT.md

> Documento di contesto generato automaticamente per permettere a qualsiasi IA o sviluppatore di
> riprendere il progetto senza ulteriori spiegazioni. Ultima analisi: giugno 2026.

---

## Panoramica del progetto

| Campo | Dettaglio |
|---|---|
| **Nome** | Sito personale di Stefano Catalin D'Alessandro |
| **Titolo HTML corrente** | `Stefano Catalin D'Alessandro \| Sito personale` (home) / `Vita personale \| Stefano Catalin D'Alessandro` / `Vita lavorativa e CV \| Stefano Catalin D'Alessandro` |
| **Tipo** | Sito web personale statico ibrido: home one-page + due pagine sorgente/modificabili |
| **Scopo principale** | Presentare il proprietario — chi è, le sue passioni e il suo percorso scolastico/lavorativo — con un curriculum vitae visualizzabile online |
| **Problema che risolve** | Fornisce un biglietto da visita digitale completo, accessibile in piu lingue, navigabile da chiunque voglia conoscere Stefano |
| **Stato attuale** | **Completo per lo scope statico attuale e online.** La home carica in una pagina lunga i contenuti delle pagine personale e lavorativa; le due sottopagine restano modificabili e apribili direttamente. Navbar dinamica trasparente con blur, i18n multi-lingua, selettore lingue con modal ricercabile, tema chiaro/scuro, modal contatti accessibile, form EmailJS inline dopo il CV, invio diretto preceduto da verifica email tramite codice, scroll spy, scroll fluido, SEO base, favicon SCD, visualizzatore CV renderizzato con PDF.js e fallback, pagina 404 personalizzata, sfondo live canvas e animazioni di entrata sono operativi. Deploy completato su Netlify. Restano solo miglioramenti opzionali/futuri: backend proprietario per i contatti, verifica email server-side e rifinitura eventuale dell'immagine Open Graph. |
| **URL di produzione** | https://stefanocatalin.netlify.app |
| **Hosting** | Netlify (deploy statico) |

---

## Tecnologie utilizzate

### Linguaggi
- **HTML5** — struttura semantica di tutte le pagine
- **CSS3** — stile, layout, animazioni; uso estensivo di Custom Properties (variabili CSS)
- **JavaScript (ES2020+, vanilla)** — nessun framework JS; moduli separati per navbar/modal (`main.js`) e internazionalizzazione (`i18n.js`)

### Framework e librerie
- **Nessun framework applicativo CSS o JS** — niente React, Vue, Bootstrap o simili; il comportamento del sito resta vanilla JavaScript
- **EmailJS Browser SDK** — libreria esterna usata per l'invio dei codici di verifica e dei messaggi dai form contatti
- **PDF.js** — libreria esterna caricata da CDN per renderizzare il CV PDF in canvas dentro la pagina, senza dipendere dal viewer PDF nativo del browser

### Strumenti e API esterne
- **flagcdn.com** — CDN di bandiere SVG usato per le flag nel selettore lingua (dipendenza esterna leggera, nessun pacchetto npm)
- **EmailJS Browser SDK + REST API** — SDK caricato via CDN (`@emailjs/browser@4`) per inviare i messaggi del form contatti senza backend proprietario, con fallback REST ufficiale quando il CDN non espone `window.emailjs`
- **cdnjs.cloudflare.com / PDF.js** — CDN usato per caricare `pdf.min.js` e `pdf.worker.min.js`, necessari al rendering custom del CV
- **Simple Icons / Devicon** — sorgenti degli SVG brand scaricati localmente in `assets/icons/` per le skill card
- **localStorage** — usato da `i18n.js` per persistere la scelta della lingua e da `main.js` per persistere il tema chiaro/scuro
- **IntersectionObserver** — usato da `main.js` per attivare le animazioni di entrata durante lo scroll
- **matchMedia / prefers-reduced-motion** — usato per rispettare le preferenze utente sulle animazioni

### Formato dati
- **JSON** — file di traduzione in `locales/*.json`
- **PDF** — curriculum vitae renderizzato in canvas tramite PDF.js nella pagina lavorativa; restano sempre disponibili link diretto di apertura e download

---

## Struttura delle cartelle

```
mio-sito/                        ← root del progetto
│
├── assets/
│   ├── images/
│   │   └── og-preview.svg       ← immagine preview social/SEO
│   ├── favicon.svg              ← favicon SVG del sito, testo "SCD" viola su sfondo scuro
│   └── Stefano_Catalin_DAlessandro_CV.pdf ← Curriculum Vitae in PDF; renderizzato con PDF.js e disponibile per apertura/download
│
├── css/
│   └── style.css                ← UNICO foglio di stile per tutte le pagine
│                                   (1390 righe, organizzato per sezioni con commenti)
│
├── js/
│   ├── i18n.js                  ← Sistema di internazionalizzazione multi-lingua
│   └── main.js                  ← Navbar dinamica, frammenti, modal, modal lingue, EmailJS, tema, scroll, frecce skill e reveal
│
├── locales/
│   ├── en.json                  ← Tutte le stringhe in inglese (chiavi piatte annidate)
│   ├── es.json                  ← Tutte le stringhe in spagnolo
│   └── it.json                  ← Tutte le stringhe in italiano
│
├── index.html                   ← Pagina Home (body.page-home)
├── 404.html                     ← Pagina errore 404 personalizzata (body.page-not-found)
├── vita-lavorativa.html         ← Pagina Vita Lavorativa (body.page-work)
└── vita-personale.html          ← Pagina Vita Personale (body.page-personal)
```

### Descrizione file per file

| File | Ruolo |
|---|---|
| `index.html` | Home one-page: hero + contenitori `page-fragment` che caricano i blocchi personale/lavorativo + footer + modal |
| `404.html` | Pagina 404 personalizzata: messaggio localizzato, pulsanti verso home/CV, navbar dinamica, tema, sfondo live e modal contatti |
| `vita-personale.html` | Pagina autonoma e sorgente del blocco `#personal-section-source`: chi sono, passioni, storia personale |
| `vita-lavorativa.html` | Pagina autonoma e sorgente del blocco `#work-section-source`: skill cards con badge livello, timeline esperienze, contenitore CV renderizzato da PDF.js e form contatti EmailJS inline subito dopo il CV |
| `style.css` | CSS globale. Sezioni: variabili tema dark/light, reset, animazioni reveal, navbar, hero, footer, modal, modal lingue, page-hero, content-section, cards, skills, timeline, CV viewer, lang-dropdown, mobile menu |
| `main.js` | Costruisce la navbar lato client, carica i frammenti nella home, gestisce i form contatti con EmailJS e verifica email, modal contatti accessibile, modal lingue ricercabile, tema, scroll spy, scroll fluido, hamburger, skill scroller con frecce disabilitabili, sfondo live canvas, rendering CV con PDF.js e fallback, e animazioni reveal |
| `i18n.js` | Carica il JSON della lingua corrente via `fetch()`, applica le stringhe agli elementi `[data-i18n]`, persiste la scelta in localStorage, espone i metadati delle lingue e riapplica le traduzioni ai frammenti caricati |
| `locales/*.json` | Dizionari di traduzione, struttura identica con chiavi annidate: `nav`, `home`, `personal`, `work`, `modal`, `language_modal`, `footer` |
| `Stefano_Catalin_DAlessandro_CV.pdf` | PDF del CV; referenziato da `data-cv-url` nel contenitore `.cv-render-container` e dai link apertura/download in `vita-lavorativa.html` |
| `favicon.svg` | Favicon SVG del sito con scritta `SCD` viola su sfondo scuro |
| `assets/images/og-preview.svg` | Immagine preview locale usata dai meta Open Graph/Twitter Card |
| `assets/images/` | Contiene asset SEO; |

---

## Funzionalità implementate

### 1. Navigazione one-page + pagine autonome
- **Dove:** `main.js` → funzione `buildNavbar()`
- **Come:** La navbar viene iniettata via `document.body.prepend(navbar)` al `DOMContentLoaded`.
  Sulla home i link puntano alle ancore interne `#home-section`, `#personal-section`,
  `#work-section`; sulle sottopagine puntano alla home con hash (`index.html#...`).
- **Bottoni presenti:** Home, Vita Personale, Vita Lavorativa, toggle tema, Contatti,
  Selettore lingua.
- **Scroll spy:** `setupScrollSpy()` evidenzia il bottone della sezione visibile mentre
  l'utente scorre la pagina. Lo stato attivo è sincronizzato tra navbar desktop e menu mobile.
- **Scroll fluido:** i link interni vengono intercettati da `setupNavLinks()` e gestiti con
  animazione custom (`smoothVerticalScroll()`), così il comportamento resta fluido anche su desktop.

### 2. Sistema i18n (Internazionalizzazione multi-lingua)
- **Dove:** `i18n.js` + `locales/*.json`
- **Come:**
  1. Al caricamento, `getStoredLang()` controlla `localStorage`. Se l'utente non ha mai
     scelto, legge `navigator.language` e usa la lingua supportata corrispondente; altrimenti usa `en`.
  2. `loadTranslations(lang)` fa un `fetch()` del JSON corrispondente.
  3. `applyTranslations()` scorre tutti gli elementi con `data-i18n="chiave.annidata"` e
     imposta `textContent` col valore risolto da `resolve(obj, key)`.
  4. Applica anche `data-i18n-placeholder` e `data-i18n-aria-label`, così placeholder dei form
     e label accessibili restano localizzati senza testo hardcoded nel JS.
  5. `updateLangButton()` aggiorna bandiera e codice nel bottone dropdown.
  6. Clic su una voce del menu chiama `setLang(lang)`, che salva in localStorage e riapplica.
  7. `refreshI18n()` riapplica le traduzioni ai frammenti HTML caricati dopo il primo render.
- **Event delegation:** il click sulle `.lang-option` è gestito con un listener sul `document`,
  quindi il cambio lingua funziona anche se la navbar viene generata dinamicamente.
- **Lingue disponibili:** `it`, `en`, `es`, `fr`, `de`, `pt`, `ro`, `nl`, `pl`, `sv`, `da`, `no`, `ja`, `zh`, `zh-TW`, `ko`.
  Il dropdown mostra italiano, inglese e spagnolo come lingue rapide, più un pulsante
  "Visualizza tutto" che apre il modal con ricerca. Cinese semplificato (`zh`) e
  cinese tradizionale (`zh-TW`) sono file separati.

### 3. Modal Tutte le Lingue
- **Dove:** `main.js` → `buildLanguageModal()`, `openLanguageModal()`, `filterLanguageOptions()`;
  `style.css` → classi `.language-*`; `locales/*.json` → chiave `language_modal`.
- **Come:** il modal viene generato dinamicamente dalla lista `SUPPORTED` e dai metadati
  `LANG_META` in `i18n.js`. Contiene una barra di ricerca e una lista di bottoni lingua con
  bandiera, nome nativo, nome inglese e codice. La scelta chiama `setLang()` e chiude il modal.
- **Accessibilità:** usa `role="dialog"`, `aria-modal`, `role="listbox"`/`role="option"`,
  `aria-selected` sulla lingua corrente, label nascosta per la ricerca e chiusura tramite
  pulsante, click fuori o cambio lingua.

### 4. Form e Modal Contatti
- **Dove:** HTML di ogni pagina (`.modal-overlay#modal-contatti`), form inline in
  `vita-lavorativa.html` subito dopo il CV, + `main.js`
- **Come:** `openModal()` aggiunge la classe `.open` all'overlay (che passa da `display:none`
  a `display:flex`). Si chiude con il bottone ✕ (`#btn-close-modal`) o cliccando fuori dal box.
- **Accessibilità:** il box usa `role="dialog"`, `aria-modal`, `aria-labelledby` e
  `aria-describedby`. All'apertura il focus passa al campo nome; `Escape` chiude il modal;
  `Tab` resta intrappolato nel dialog; alla chiusura il focus torna al bottone che lo ha aperto.
- **Contenuto:** form di contatto statico con campi nome/email/codice verifica/messaggio e link diretti
  a Instagram e GitHub nel modal. L'email non è mostrata nel footer o nel modal.
- **Form inline dopo CV:** in `vita-lavorativa.html`, dentro `#work-section-source`, esiste
  un secondo form con la stessa logica EmailJS del modal. Usa ID dedicati `inline-*`,
  così resta valido anche quando la sezione lavoro viene importata nella home.
- **Submit form:** `setupContactForm()` inizializza tutti gli elementi `.contact-form`,
  intercetta l'invio e manda i dati a EmailJS
  tramite lo SDK browser (`emailjs.send`) o fallback REST ufficiale. Prima dell'invio
  finale richiede la verifica dell'email: viene inviato un codice temporaneo a `{{email}}`
  usando un secondo template EmailJS (`verificationTemplateId`, attualmente `template_scqodrl`)
  e il messaggio può essere scritto/inviato solo dopo l'inserimento del codice corretto.
  Il codice è generato lato browser e resta valido per 5 minuti (`EMAIL_VERIFICATION_TTL_MS`).
  La funzione è idempotente grazie a `data-contact-ready`, quindi può essere richiamata
  sia al `DOMContentLoaded` sia dopo il caricamento dei frammenti nella home.

### 5. Skill Cards con scroll orizzontale e badge livello
- **Dove:** `vita-lavorativa.html` + CSS `.skills-scroll-wrapper`
- **Come:** Le card sono in un contenitore `overflow-x: auto` con `scrollbar-width: none`.
  Due bottoni ← → chiamano `smoothHorizontalScroll()` in `main.js` e avanzano di una card intera
  calcolando dinamicamente larghezza card + gap.
  I bottoni vengono disabilitati automaticamente quando lo scroll è già a inizio/fine lista:
  lo stato disabilitato rimuove hover, pointer cursor e interazione.
  Ogni card usa un layout orizzontale: titolo e descrizione a sinistra, icona grande a destra
  e badge livello centrato in basso. L'hover evidenzia la card senza nascondere la descrizione.
- **Contenuto:** le competenze sono suddivise in 11 card autonome: Windows, C#, Python, C,
  C++, HTML, CSS, Assembly, Intelligenza Artificiale, Google Workspace e Microsoft Office.
  Ogni card ha un'icona brand locale in `assets/icons/` e un badge di preparazione (`Ottimo`, `Buono`,
  `Intermedio`, `Base`) gestito via i18n.

### 6. Timeline esperienze
- **Dove:** `vita-lavorativa.html` + CSS `.timeline`
- **Come:** Lista verticale con bordo sinistro viola e pallino posizionato in assoluto.
  Attualmente contiene una sola voce (ITIS Artom, 2022–Oggi).

### 7. Visualizzatore CV con PDF.js e fallback
- **Dove:** `vita-lavorativa.html` + `main.js` → `renderCustomCV()` + CSS `.cv-render-container`
- **Come:** l'HTML espone un contenitore `<div id="cv-render-container" class="cv-render-container" data-cv-url="assets/Stefano_Catalin_DAlessandro_CV.pdf">`.
  `main.js` usa `pdfjsLib.getDocument(url).promise`, scorre tutte le pagine del PDF e crea un `<canvas class="cv-page">` per ogni pagina.
  Il rendering usa scala `1.5` e limita il device pixel ratio a `2` per mantenere buona nitidezza senza caricare troppo il browser.
- **Dipendenze:** `index.html` e `vita-lavorativa.html` caricano PDF.js da cdnjs (`pdf.min.js`) e configurano `pdf.worker.min.js`.
- **Azioni sempre disponibili:** sotto al viewer, ma fuori da `.cv-wrapper`, restano i link per apertura in nuova scheda e download diretto del file PDF. Sono centrati, affiancati in una griglia a due colonne e più grandi dei pulsanti standard.
- **Fallback visivo:** se PDF.js non riesce a caricare o renderizzare il documento, viene mostrata `.cv-fallback`.

### 8. Card Passioni
- **Dove:** `vita-personale.html` + CSS `.cards-grid`
- **Come:** Grid CSS con `repeat(auto-fit, minmax(200px, 1fr))` per adattarsi alla larghezza.
  Tre card: Videogiochi, Sport, Musica — con icone emoji e testo descrittivo.
  Al hover usano bordo viola, leggero sollevamento e ombra/glow coerente con le skill cards.

### 9. Tema scuro/chiaro con toggle
- **Dove:** `style.css` → `:root` e `:root[data-theme="light"]`; `main.js` → funzioni
  `applyTheme()`, `getStoredTheme()`, `updateThemeButtons()`.
- **Come:** Il tema scuro è il default. Il bottone `theme-toggle` permette di passare al
  tema chiaro e viceversa; la scelta viene salvata in `localStorage["theme"]`.
- **Anti-flash:** ogni pagina imposta subito `document.documentElement.dataset.theme` nel
  `<head>` prima di caricare il CSS.

### 10. Favicon SCD
- **Dove:** `assets/favicon.svg` + `<link rel="icon">` nelle tre pagine HTML.
- **Come:** SVG statico con fondo scuro coerente col tema e testo `SCD` viola. È referenziato
  da home, vita personale e vita lavorativa.

### 11. Home one-page con frammenti HTML
- **Dove:** `index.html` + `main.js` → `loadPageFragments()`.
- **Come:** La home contiene due contenitori `.page-fragment` che caricano via `fetch()`
  i blocchi `#personal-section-source` e `#work-section-source` dalle rispettive pagine.
- **Vantaggio:** `vita-personale.html` e `vita-lavorativa.html` restano file distinti e
  modificabili, ma l'utente può navigare il sito come una pagina lunga.

### 12. Animazioni di entrata
- **Dove:** `style.css` → classi `.reveal` / `.is-visible`; `main.js` → `setupRevealAnimations()`.
- **Come:** JavaScript assegna la classe `.reveal` a hero, sezioni, testi, card, timeline,
  skill cards, blocco CV e footer. `IntersectionObserver` aggiunge `.is-visible` quando
  l'elemento entra nel viewport, producendo una comparsa progressiva verso l'alto.
  Le skill card vengono rivelate come gruppo quando il loro wrapper orizzontale entra
  verticalmente nel viewport, così anche le card fuori asse sono già visibili quando
  l'utente usa le frecce orizzontali.
- **Accessibilità:** se l'utente ha attivo `prefers-reduced-motion`, gli elementi sono
  mostrati senza animazione.

### 13. Sfondo live particellare
- **Dove:** `main.js` → `setupLiveBackground()`; `style.css` → `#live-background`.
- **Come:** al `DOMContentLoaded` viene creato un `<canvas id="live-background">` fisso,
  non interattivo (`pointer-events: none`) e dietro al contenuto (`z-index: -1`).
  Il canvas disegna nodi/particelle e linee tra punti vicini; il mouse genera una lieve
  attrazione sui nodi per dare un effetto interattivo morbido.
- **Tema:** i colori cambiano in base a `data-theme`, con viola più luminoso nel tema scuro
  e linee più leggere nel tema chiaro.
- **Accessibilità/performance:** se `prefers-reduced-motion: reduce` è attivo, lo sfondo
  non viene avviato. La densità dei nodi è calcolata in base all'area viewport e limitata.

---

## Architettura del progetto

### Organizzazione generale

```
BROWSER
  │
  ├─ Carica HTML statico (una delle tre pagine)
  │    └─ <link> → style.css (stile globale)
  │
  ├─ <head> imposta subito data-theme da localStorage
  │    └─ evita flash del tema al reload
  │
  ├─ DOMContentLoaded ──► main.js::buildNavbar()
  │    ├─ Crea <nav> e lo prepend al body
  │    ├─ Aggancia #btn-contatti → openModal()
  │    ├─ Aggancia dropdown lingua (toggle .open)
  │    ├─ Aggancia toggle tema dark/light
  │    ├─ Aggancia link interni con scroll fluido
  │    └─ Avvia scroll spy
  │
  ├─ DOMContentLoaded ──► main.js::loadPageFragments() [solo home]
  │    ├─ fetch("vita-personale.html") → #personal-section-source
  │    ├─ fetch("vita-lavorativa.html") → #work-section-source
  │    ├─ inserisce i blocchi nella home
  │    ├─ richiama refreshI18n()
  │    ├─ inizializza skill scroller e viewer/fallback CV
  │    ├─ inizializza animazioni reveal dopo il layout
  │    └─ gestisce hash iniziale
  │
  └─ DOMContentLoaded → requestAnimationFrame ──► i18n.js::initI18n()
       ├─ Determina lingua (localStorage, navigator.language o default "en")
       ├─ fetch("locales/{lang}.json")
       ├─ applyTranslations() → scrive textContent sugli [data-i18n]
       ├─ updateLangButton() → aggiorna bandiera/codice
       └─ document click delegation su .lang-option → setLang()
```

### Flusso dei dati

```
localStorage["lang"]          ←── scelta utente
       │
       ▼
getStoredLang()               restituisce "it" | "en"
       │
       ▼
fetch("locales/{lang}.json")  carica dizionario
       │
       ▼
resolve(obj, "a.b.c")         naviga il JSON annidato
       │
       ▼
el.textContent = value        applica a ogni [data-i18n]
```

### Flusso del tema

```
localStorage["theme"]         ←── scelta utente ("dark" | "light")
       │
       ▼
script nel <head>             imposta subito documentElement.dataset.theme
       │
       ▼
CSS variables                 :root o :root[data-theme="light"]
       │
       ▼
theme-toggle                  cambia tema e aggiorna icona/tooltip
```

### Relazioni tra pagine e componenti

```
index.html ──────────────────────────────────────────
  │  hero + page-fragment + footer + modal           │
  │  carica contenuti da pagine separate via fetch    │  Tutti e tre
  │                                                  │  condividono:
vita-personale.html ──────────────────────────────── │  - style.css
  │  #personal-section-source + footer + modal        │  - i18n.js
  │                                                  │  - main.js
vita-lavorativa.html ─────────────────────────────── │  - locales/
     #work-section-source + footer + modal           │
     + footer + modal                               ──
```

### Pattern di internazionalizzazione

Ogni testo visibile nell'HTML **non contiene mai testo statico** (tranne eccezioni come
date, simboli e icone emoji). Le stringhe sono sempre recuperate dal JSON via `data-i18n`.
Questo garantisce che aggiungere una nuova lingua richieda soprattutto un nuovo file JSON
e l'aggiunta della lingua in `SUPPORTED` e `LANG_META` in `i18n.js`; se la lingua deve
comparire anche nel dropdown rapido, va aggiunta anche al template `.lang-menu` in `main.js`.

---

## Stato attuale

### Completato ✅
- Struttura ibrida: home one-page + pagine personale/lavorativa autonome e usate come sorgenti dei frammenti
- Foglio di stile completo con variabili CSS per tema scuro e tema chiaro
- Navbar dinamica generata via JS con link ad ancore, scroll spy e stato attivo desktop/mobile
- Sistema i18n funzionante con 16 lingue, persistenza localStorage, rilevamento `navigator.language` e `refreshI18n()`
- Modal contatti funzionante (apertura via bottone navbar, chiusura con ✕ o click esterno)
- Form contatti statico nel modal: campi nome/email/codice verifica/messaggio, submit diretto via EmailJS dopo verifica email, stato invio accessibile e testi i18n
- Modal contatti con semantica dialog, gestione `Escape`, focus iniziale, focus trap e ripristino focus alla chiusura
- Footer e modal contatti con link a Instagram e GitHub
- Pulizia HTML/accessibilità dei modal contatti: chiusura coerente dei tag `<li>`, label nascosta per codice OTP, stati ARIA e `rel="noopener noreferrer"` sui link aperti in nuova scheda
- Menu hamburger mobile con chiusura su click esterno e click sui link
- Animazioni di entrata scroll-triggered con `IntersectionObserver`, effetto comparsa verso l'alto e rispetto di `prefers-reduced-motion`
- Sfondo live canvas con rete di nodi/particelle, interazione leggera col mouse e rispetto di `prefers-reduced-motion`
- Skill cards più ampie con layout orizzontale, icona grande a destra, descrizione visibile, badge livello e scroll orizzontale fluido custom
- Frecce skill cards con `aria-label` localizzato
- Timeline esperienze
- Visualizzatore CV con PDF.js, fallback automatico e link apertura/download
- Card passioni in griglia responsive con hover glow coerente con le skill cards
- Selettore lingua con bandiere, dropdown animato, tre lingue rapide e pulsante "Visualizza tutto"
- Modal "Tutte le lingue" con barra di ricerca, lista generata da `SUPPORTED`/`LANG_META` e selezione lingua
- Toggle tema chiaro/scuro con persistenza localStorage e anti-flash nel `<head>`
- Pagina `404.html` personalizzata, noindex, localizzata tramite chiavi `not_found`, con azioni verso home e CV
- SEO base: title coerenti, meta description, canonical URL, `og:url`, Open Graph, Twitter Card, favicon SVG `SCD` e immagine preview locale
- Contenitori principali e sezioni alternate allineati su una larghezza comune tramite `--content-width`
- QA Browser su `localhost:5500` completato con esito positivo: home, pagine autonome, 404, navbar trasparente, CV, mobile, EN/ES, console e overflow verificati
- Il progetto puo considerarsi finito per lo scope statico attuale; i lavori rimasti sono solo evoluzioni opzionali

### In lavorazione / da consolidare 🔄
- Nessuna attività di sviluppo attiva al momento dell'analisi

### Non ancora implementato ❌
- Nessuna funzionalita obbligatoria mancante per lo scope statico attuale

---

## Problemi noti

### Bug

- Nessun bug bloccante noto al momento dell'ultimo aggiornamento.

### Limitazioni
- Il sito è interamente statico: nessun backend, nessuna API propria
- La verifica email del form contatti è gestita lato browser con EmailJS: evita errori casuali
  e obbliga l'utente a ricevere un codice, ma non offre la stessa robustezza anti-abuso di
  un controllo OTP server-side con sessione/backend proprietario
- Il CV è un file PDF statico; per aggiornarlo occorre sostituire il file fisicamente
- I testi della sezione personale/lavorativa sono hardcoded nel JSON; non c'è CMS
- Le bandiere del selettore lingua dipendono da `flagcdn.com`; in ambienti con rete esterna
  bloccata possono non caricarsi, senza compromettere il cambio lingua
- EmailJS dipende da un servizio esterno: se CDN/API EmailJS non sono raggiungibili, il form
  non può spedire messaggi o codici di verifica
- PDF.js è caricato da CDN: se cdnjs non è raggiungibile, il rendering inline del CV può non
  partire, ma restano disponibili il link diretto al PDF e il download.

### Possibili miglioramenti

---

## Decisioni progettuali

### Nessun framework
**Scelta:** Vanilla HTML/CSS/JS senza React, Vue, Bootstrap o simili.
**Motivazione:** Il sito è un progetto didattico personale. L'autore vuole apprendere
le basi senza dipendenze esterne. Il sito è abbastanza semplice da non richiedere reattività.

### Navbar generata via JavaScript
**Scelta:** La `<nav>` non è nell'HTML ma viene creata e iniettata da `buildNavbar()`.
**Motivazione:** Evita la duplicazione del codice della navbar nelle tre pagine HTML e
permette di omettere dinamicamente il link alla pagina corrente.
**Compromesso:** Il sito non funziona senza JavaScript abilitato (nessuna navbar = nessuna navigazione).

### Sistema i18n custom (no libreria)
**Scelta:** Sistema di traduzione scritto da zero in ~80 righe.
**Motivazione:** Librerie come `i18next` sarebbero eccessive per due lingue e tre pagine.
Il pattern `data-i18n="chiave.annidata"` è semplice, leggibile e sufficiente.

### Un solo file CSS
**Scelta:** `style.css` copre tutte e tre le pagine.
**Motivazione:** Il progetto è piccolo e le pagine condividono la maggior parte degli stili.
Separare i CSS per pagina sarebbe prematuro. Il file è organizzato con commenti a blocchi
per facilitare la navigazione.

### Tema scuro come default, tema chiaro opzionale
**Scelta:** Palette scura (`#1a1a1e` come sfondo principale) con accento viola (`#7c3aed`)
come default; tema chiaro attivabile con toggle.
**Motivazione:** Mantiene la preferenza estetica originale ma dà all'utente controllo sulla
leggibilità. La scelta viene salvata in `localStorage` e applicata subito nel `<head>`.

### `data-i18n` su textContent, non innerHTML
**Scelta:** `el.textContent = value` (non `innerHTML`).
**Motivazione:** Sicurezza (nessun rischio XSS da testi di traduzione) e semplicità.
Significa che le traduzioni non possono contenere HTML formattato.

### Emoji come icone
**Scelta:** Emoji Unicode (`🕹️`, `🚵‍♂️`, `🎵`, ecc.) invece di SVG icon libraries o Font Awesome.
**Motivazione:** Zero dipendenze, zero richieste di rete aggiuntive per icone.
**Compromesso:** Il rendering delle emoji varia tra sistemi operativi e browser.

---

## Roadmap

### Priorità alta 🔴
- Nessuna voce ad alta priorità registrata al momento.

### Priorità media 🟡
1. **Backend contatti proprietario** — eventuale sostituzione futura di EmailJS con API/server gestito dal progetto
2. **Verifica email server-side** — eventuale evoluzione della verifica codice verso un backend/edge function con sessione e rate limit

### Priorità bassa 🟢
- Nessuna voce a bassa priorità registrata al momento.

---

## Istruzioni per continuare il progetto

### Come avviare il progetto
Il progetto è puramente statico: **non richiede build step, npm install o server Node**.

```bash
# Opzione 1 — VS Code Live Server (consigliato in sviluppo)
# Installa l'estensione "Live Server" di Ritwick Dey, poi click destro su index.html → Open with Live Server

# Opzione 2 — Python (se installato)
cd mio-sito
python -m http.server 8080
# Apri http://localhost:8080

# Opzione 3 — Node.js (se installato)
npx serve .
```

> ⚠️ **Non aprire i file direttamente nel browser** (`file://`): il `fetch()` in `i18n.js`
> fallirà per CORS. È necessario un server HTTP locale.  
>⚠️ **Collegarsi a 127.0.0.1:5500/index.html**

### Come effettuare modifiche

| Cosa modificare | File da toccare |
|---|---|
| Testi / traduzioni | `locales/it.json`, `locales/en.json`, `locales/es.json` |
| Stile visivo / colori | `css/style.css` (variabili in `:root`) |
| Tema chiaro/scuro | `css/style.css` (`:root[data-theme="light"]`) + `js/main.js` |
| Struttura navbar | `js/main.js` → `buildNavbar()` |
| Logica lingua | `js/i18n.js` |
| Contenuto home | `index.html` (hero + contenitori frammento) |
| Contenuto vita personale | `vita-personale.html` dentro `#personal-section-source` |
| Contenuto vita lavorativa | `vita-lavorativa.html` dentro `#work-section-source` |
| CV | Sostituire `assets/Stefano_Catalin_DAlessandro_CV.pdf` e aggiornare `data-cv-url`/link se cambia nome file |
| Aggiungere immagini | Mettere i file in `assets/images/` e referenziarli nell'HTML |
| Favicon | Modificare `assets/favicon.svg` |
| Configurazione EmailJS | Modificare `EMAILJS_CONFIG` in `js/main.js` |
| Durata codice verifica email | Modificare `EMAIL_VERIFICATION_TTL_MS` in `js/main.js` |

### Per aggiungere una nuova sezione
1. Aggiungere le chiavi al JSON in tutte le lingue supportate
2. Aggiungere il blocco HTML con gli attributi `data-i18n` corretti
3. Aggiungere eventuali stili in `style.css`

### Per aggiungere una nuova lingua
1. Scegliere il codice ISO a due lettere della lingua, ad esempio `de` o `pt`.
2. Copiare uno dei file esistenti in `locales/{codice}.json` e tradurre tutte le chiavi mantenendo identica la struttura.
3. Verificare che il nuovo JSON abbia le stesse chiavi di `it.json`, `en.json` ed `es.json`.
4. In `js/i18n.js`, aggiungere il codice a `SUPPORTED`, ad esempio `['it', 'en', 'es', 'de']`.
5. In `js/i18n.js`, aggiungere una voce in `LANG_META` con `code`, `name`, `nativeName`, `flagSrc` e `flagAlt`.
6. In `js/main.js` → `buildNavbar()`, aggiungere la lingua anche nel dropdown rapido `.lang-menu` se deve comparire tra le lingue visibili subito.
7. Non serve modificare il modal "Tutte le lingue": viene generato automaticamente da `SUPPORTED` e `LANG_META`.
8. Avviare il sito via server locale e testare: dropdown rapido, pulsante "Visualizza tutto", ricerca nel modal lingue, cambio lingua e persistenza in `localStorage`.

---

## Cronologia dello sviluppo

> Le date esatte non sono disponibili nel codice sorgente analizzato.
> La cronologia è ricostruita inferendo l'ordine logico di sviluppo.

| Fase | Evento |
|---|---|
| **Fase 1** | Creazione della struttura base del progetto: tre file HTML (`index.html`, `vita-lavorativa.html`, `vita-personale.html`) con layout statico in italiano |
| **Fase 2** | Sviluppo di `style.css`: definizione variabili CSS, reset, stile navbar, hero, footer, modal |
| **Fase 3** | Introduzione di `main.js`: logica per generare la navbar dinamicamente e gestire il modal contatti |
| **Fase 4** | Introduzione del sistema i18n: creazione di `i18n.js`, `locales/en.json` e `locales/it.json`; migrazione di tutti i testi statici a `data-i18n` |
| **Fase 5** | Aggiunta del selettore lingua con dropdown animato, bandiere da flagcdn.com, persistenza in localStorage |
| **Fase 6** | Sviluppo della pagina `vita-lavorativa.html`: skill cards con scroll orizzontale, timeline esperienze e visualizzatore CV |
| **Fase 7** | Sviluppo della pagina `vita-personale.html`: sezione chi sono, card passioni in griglia, storia personale |
| **Fase 8** | Ottimizzazione mobile: menu hamburger, drawer mobile, chiusura su click esterno e sincronizzazione dei controlli desktop/mobile |
| **Fase 9** | Consolidamento i18n: rilevamento `navigator.language`, event delegation sulle `.lang-option`, aggiornamento desktop/mobile e `refreshI18n()` |
| **Fase 10** | Conversione della home in pagina lunga: `index.html` carica via `fetch()` i blocchi `#personal-section-source` e `#work-section-source` dalle due sottopagine |
| **Fase 11** | Miglioramento navigazione one-page: link ad ancore, scroll spy, stato attivo navbar, scroll fluido verticale custom e chiusura automatica del drawer mobile |
| **Fase 12** | Miglioramento skill cards: scroll orizzontale fluido custom condiviso tra home e pagina lavorativa autonoma |
| **Fase 13** | Introduzione tema chiaro/scuro: toggle in navbar, persistenza in `localStorage`, variabili `:root[data-theme="light"]` e anti-flash nel `<head>` |
| **Fase 14** | Aggiornamento documentazione di progetto: riallineamento di architettura, funzionalità, problemi noti, roadmap e contesto IA |
| **Fase 15** | Implementazione SEO base: title coerenti, meta description, Open Graph, Twitter Card, favicon SVG e immagine preview locale |
| **Fase 16** | Implementazione fallback CV: link apertura/download sempre visibili e rilevamento supporto PDF inline con fallback automatico |
| **Fase 17** | Implementazione animazioni di entrata: comparsa progressiva verso l'alto con `IntersectionObserver`, classi `.reveal`/`.is-visible` e rispetto di `prefers-reduced-motion` |
| **Fase 18** | Verifica animazioni con Chromium Playwright, correzione reveal di skill card/footer, pulizia HTML dei modal contatti e riallineamento completo del file di contesto |
| **Fase 19** | Miglioramenti interazione card: hover glow sulle card passioni e stato `disabled` automatico delle frecce skill cards a inizio/fine scroll, con verifica tramite Browser in-app |
| **Fase 20** | Implementazione form contatti statico nel modal: campi nome/email/messaggio, submit iniziale via `mailto:`, supporto i18n per placeholder/aria-label e stili responsive |
| **Fase 21** | Sostituzione del submit `mailto:` con invio diretto tramite servizio esterno, messaggi di stato accessibili e aggiornamento testi del modal |
| **Fase 22** | Migrazione del form contatti a EmailJS Browser SDK: rimozione del precedente endpoint AJAX, aggiunta CDN EmailJS e configurazione `EMAILJS_CONFIG` in `main.js` |
| **Fase 23** | Aggiunta verifica email tramite codice prima dell'invio: secondo template EmailJS configurabile, campo codice nel modal, blocco del messaggio fino a verifica completata |
| **Fase 24** | Configurazione del template EmailJS di verifica (`template_scqodrl`), riduzione durata codice a 5 minuti, cursore normale sui bottoni disabilitati e aggiornamento favicon a `SCD` |
| **Fase 25** | Passata accessibilità/HTML: dialog semantico, focus trap, chiusura con Escape, ripristino focus, label nascosta OTP, aria-label frecce skill e rel coerenti sui link esterni |
| **Fase 26** | Aggiunta lingua spagnola, dropdown rapido a tre lingue e modal "Tutte le lingue" con ricerca generato da `SUPPORTED`/`LANG_META` |
| **Fase 27** | Test manuale completato, deploy Netlify registrato e successivo aggiornamento del viewer CV con Google Docs Viewer su mobile/browser senza PDF inline nativo |
| **Fase 28** | Aggiunti canonical URL e `og:url` di produzione alle tre pagine HTML; roadmap SEO aggiornata |
| **Fase 29** | Skill cards rifinite con hover/focus visivo, classe CSS `.is-open` equivalente allo stato evidenziato e overflow verticale per contenuti lunghi |
| **Fase 30** | Allargamento coordinato dei contenitori tramite `--content-width`, ingrandimento skill card, separazione delle competenze accorpate, aggiunta icone brand locali e badge livello i18n |
| **Fase 31** | Ridisegno layout skill card: card più grandi, icona grande a destra, titolo/descrizione a sinistra e badge livello centrato in basso |
| **Fase 32** | Aggiornamento frecce skill card: step di scorrimento calcolato dinamicamente su larghezza card + gap |
| **Fase 33** | Aggiunta sfondo live canvas con rete di nodi/particelle, colori per tema dark/light e interazione leggera col mouse |
| **Fase 34** | Ridisegno completo sfondo particellare con movimento organico sinusoidale, livelli di profondità e particelle gradienti, e risoluzione scroll bug |
| **Fase 35** | Aggiunto glassmorphism (sfondo trasparente sfocato) alla barra delle azioni nel visualizzatore CV per migliorare l'estetica |
| **Fase 36** | Migrazione del visualizzatore CV a PDF.js: sostituzione dell'iframe/viewer esterno con rendering canvas multipagina tramite `renderCustomCV()` e `data-cv-url` |
| **Fase 37** | Separazione dei pulsanti "Apri CV" e "Scarica CV" dal viewer: azioni spostate fuori da `.cv-wrapper`, centrate, affiancate e ingrandite |
| **Fase 38** | Aggiunta pagina `404.html` personalizzata: layout coerente col sito, `noindex`, navbar/tema/modal riusati e testi localizzati in tutte le 16 lingue |
| **Fase 39** | Bonifica encoding dei file `locales/*.json`: correzione mojibake UTF-8/Windows-1252 (`piÃ¹`, `Â©`, `â†’`, accenti europei e testi CJK/KR/JP corrotti) e validazione JSON completa |
| **Fase 40** | Navbar resa trasparente: `background-color` con alpha, `backdrop-filter`/`-webkit-backdrop-filter` e bordo inferiore semitrasparente differenziato per tema scuro/chiaro |
| **Fase 41** | QA finale tramite Browser plugin su `localhost:5500`: home, pagine autonome, 404, navbar trasparente, CV, mobile 360 px, cambio lingua EN/ES, console e overflow verificati; corretto refuso italiano `sopratutto` -> `soprattutto` |
| **Fase 42** | Rifinitura hero home: rimosso il saluto iniziale `home.greeting` dal markup, nome visualizzato come `home.name` + `home.name_extra`, con `Catalin D'Alessandro` in viola glow/ombra e chiave aggiunta a tutte le 16 lingue |
| **Stato corrente** | Progetto completo per lo scope statico attuale, funzionale e online. Restano opzionali: backend proprietario/server-side per il form e rifinitura futura dell'immagine Open Graph |

---

## Contesto per IA

### Obiettivo generale
Creare un sito web personale professionale ma accessibile per Stefano Catalin D'Alessandro,
studente del 5° anno all'ITIS "Alessandro Artom" di Asti (Piemonte), appassionato di
informatica, con intenzione di proseguire gli studi in Ingegneria Informatica.
Il sito deve presentarlo in modo completo: chi è, le sue passioni e il suo percorso
scolastico/professionale, con il CV scaricabile/visualizzabile.

### Filosofia e stile del codice
- **Semplicità prima di tutto:** nessuna dipendenza esterna non necessaria
- **Tutto deve funzionare senza build step** (nessun bundler, nessun transpiler)
- **Commenti a blocchi in italiano** nelle sezioni CSS e JS (es. `/* ── NAVBAR ── */`)
- **Separazione delle responsabilità:** HTML = struttura, CSS = stile, JS = comportamento
- **Nessun testo hardcoded nell'HTML** (eccetto emoji e simboli) — tutto via `data-i18n`

### Convenzioni di naming

| Contesto | Convenzione | Esempi |
|---|---|---|
| Classi CSS | kebab-case | `.nav-btn`, `.skill-card`, `.modal-overlay` |
| ID HTML | kebab-case | `#btn-contatti`, `#modal-contatti`, `#lang-dropdown` |
| Funzioni JS | camelCase | `buildNavbar()`, `openModal()`, `setLang()`, `applyTranslations()` |
| Costanti JS | SCREAMING_SNAKE_CASE | `I18N_KEY`, `SUPPORTED`, `DEFAULT_LANG` |
| Chiavi JSON i18n | dot.notation annidata | `"home.greeting"`, `"work.skill1_name"` |
| Classi body pagina | `page-{nome}` | `page-home`, `page-personal`, `page-work` |
| Sezioni CSS | blocchi con commento `/* ── NOME ── */` | `/* ── NAVBAR ── */` |

### Pattern utilizzati
- **JS Module Pattern (informale):** ogni file JS ha un proprio scope; comunicano solo
  tramite DOM e `localStorage`
- **Data-attribute driven UI:** tutta la localizzazione è guidata da `data-i18n` attribute;
  nessuna logica di traduzione nell'HTML
- **CSS Custom Properties:** tutti i valori riusabili (colori, raggi, transizioni) sono
  variabili in `:root` e `:root[data-theme="light"]` per gestire dark/light
- **Dynamic DOM injection:** la navbar non è nell'HTML ma viene costruita e iniettata via JS;
  pattern adottato per evitare duplicazioni nelle tre pagine
- **Fragment loading:** la home carica via `fetch()` blocchi HTML dalle due sottopagine,
  mantenendo un'esperienza one-page senza perdere file separati e modificabili
- **Scroll spy:** la sezione visibile aggiorna lo stato attivo dei bottoni navbar desktop/mobile
- **Lazy content reveal (CSS + JS):** le animazioni di entrata usano `.reveal`/`.is-visible`
  e `IntersectionObserver`; le skill card usano un layout stabile con descrizione sempre visibile

### Stato preciso dell'ultima versione analizzata
- Tre pagine HTML complete: home one-page + due sottopagine autonome/sorgente
- CSS: include media query mobile, tema dark/light, scroll margin per ancore, utility `.sr-only`, modal lingue, classi reveal e fallback reduced motion
- `main.js`: navbar, modal contatti accessibile, modal lingue ricercabile, frammenti, tema, scroll spy, scroll fluido, skill scroller con frecce disabilitabili, sfondo live canvas, visualizzatore CV tramite PDF.js con fallback e animazioni reveal
- `i18n.js`: sistema i18n completo con event delegation, `navigator.language`, `refreshI18n()`, `SUPPORTED` e `LANG_META`
- JSON: struttura identica per tutte le lingue supportate in `locales/`
- `Stefano_Catalin_DAlessandro_CV.pdf`: presente in `assets/` (contenuto non analizzato)
- `assets/favicon.svg`: favicon `SCD` viola su sfondo scuro
- `assets/images/`: contiene `og-preview.svg`; nessuna foto profilo personale prevista

### Ultimo lavoro svolto
Claude Opus 4.6 ha ridisegnato il sistema di particelle dello sfondo, introducendo un movimento autonomo ondulatorio fluido, diversi livelli di profondità (parallax) e nodi gradienti glow; ha aumentato la densità e risolto un bug di posizionamento (`position: fixed`) su mobile. In seguito le azioni del CV sono state staccate dal viewer e rese più grandi, centrate e sempre affiancate. Gemini Pro 3 (High) ha supportato i controlli finali e il riallineamento del contesto. Codex ha poi rifinito la hero della home rimuovendo il saluto iniziale e aggiungendo `Catalin D'Alessandro` come parte evidenziata del nome.

### Prossimo passo consigliato
Test manuale completato con esito positivo. Deploy effettuato su Netlify all'indirizzo https://stefanocatalin.netlify.app.
Non ci sono attivita obbligatorie aperte per lo scope attuale. Prossimi passi solo opzionali: rifinire l'immagine Open Graph quando necessario, valutare backend contatti proprietario/verifica server-side e mantenere allineati i meta social dopo future modifiche.

### Istruzione per futuri aggiornamenti del documento
Quando un'IA aggiorna questo file deve aggiornare anche la tabella "Tracciamento IA" e la
nota finale, mantenendo traccia di chi ha generato o modificato il documento e di come ha
analizzato/verificato il progetto. La nota deve restare grammaticalmente corretta e coerente:
se, ad esempio, il prossimo modello fosse Gemini, dovrà conservare il senso della nota
esistente e aggiungere il proprio contributo, riformulando il testo solo quanto basta per
mantenerlo leggibile.

---

## Tracciamento IA

| Data | Modello IA | Attività |
|---|---|---|
| 11 giugno 2026 | Claude Code | Generazione iniziale del documento tramite analisi statica del codice sorgente |
| 12 giugno 2026 | Codex | Aggiornamento del documento dopo modifiche al progetto, verifiche tramite browser integrato/Chromium Playwright, implementazione SEO base, fallback CV, animazioni di entrata, pulizia HTML modal, hover card passioni, miglioramento frecce skill cards e riallineamento contesto |
| 12 giugno 2026 | Codex | Correzione della codifica UTF-8 del documento, aggiornamento del conteggio righe CSS e verifica puntuale di struttura file, titoli HTML, funzioni JS e chiavi i18n |
| 12 giugno 2026 | Codex | Implementazione form contatti statico via mailto, supporto i18n per placeholder/aria-label, aggiornamento CSS modal e riallineamento roadmap/stato del documento |
| 12 giugno 2026 | Codex | Sostituzione del submit mailto con invio diretto tramite servizio esterno e documentazione del requisito di conferma iniziale del destinatario |
| 12 giugno 2026 | Codex | Aggiornamento endpoint del servizio email da email in chiaro ad alias/token suggerito dalla mail di conferma |
| 12 giugno 2026 | Codex | Rimozione del link email visibile da footer e modal contatti, mantenendo il form di contatto e i link Instagram/GitHub |
| 15 giugno 2026 | Codex | Sostituzione del servizio di invio contatti con EmailJS, aggiunta SDK browser via CDN, configurazione placeholder e aggiornamento del contesto |
| 15 giugno 2026 | Codex | Implementazione verifica email tramite codice prima dell'invio del messaggio, con secondo template EmailJS configurabile |
| 15 giugno 2026 | Codex | Configurazione template verifica EmailJS, durata codice a 5 minuti, normalizzazione cursori dei bottoni disabilitati, aggiornamento favicon SCD e riallineamento completo del contesto |
| 15 giugno 2026 | Codex | Passata accessibilità/HTML su modal, link esterni e controlli skill, con verifica tramite Browser in-app su `127.0.0.1:5500` |
| 15 giugno 2026 | Codex | Aggiunta lingua spagnola, modal "Tutte le lingue" con ricerca, istruzioni precise per aggiungere nuove lingue e aggiornamento del contesto |
| 15 giugno 2026 | Claude (claude.ai) | Test manuale completato con esito positivo. Deploy effettuato su Netlify (https://stefanocatalin.netlify.app). Aggiornamento del documento: stato progetto, URL di produzione, hosting e prossimo passo consigliato. Foto profilo ancora assente. |
| 15 giugno 2026 | Claude (claude.ai) + Codex | Modifica del viewer CV per usare Google Docs Viewer su mobile/browser senza viewer PDF nativo; verifica Codex del codice attuale e riallineamento del documento di contesto. |
| 15 giugno 2026 | Codex | Allargamento coordinato dei contenitori, rifinitura tema chiaro del modal contatti, ingrandimento/separazione skill card e aggiunta badge livello i18n. |
| 16 giugno 2026 | Claude Opus 4.6 | Ridisegno completo dello sfondo particellare in JS (movimento organico, parallax, colori glow), correzione bug `position: fixed` canvas per mobile e barra inferiore CV viewer resa trasparente (glassmorphism). |
| 16 giugno 2026 | Gemini Pro 3 (High) | Verifica e applicazione finale `position: fixed` in JS e aggiornamento strutturale di questo file di contesto con i cambiamenti apportati. |
| 16 giugno 2026 | Gemini Pro 3 (High) | Analisi statica di `style.css`, `index.html`, `main.js` e `vita-lavorativa.html`; completamento del contesto con rendering CV PDF.js, dipendenze CDN, nome reale del PDF, conteggio righe CSS e stato aggiornato. |
| 16 giugno 2026 | Codex | Separazione e ridisegno dei pulsanti apertura/download CV: gruppo azioni fuori dal viewer, griglia a due colonne, centratura e dimensioni aumentate; verifica su `127.0.0.1:5500` desktop e mobile 360 px. |
| 16 giugno 2026 | Codex | Implementazione pagina `404.html` personalizzata con testi `not_found` in tutte le lingue, stile dedicato e verifica locale su `127.0.0.1:5500`. |
| 16 giugno 2026 | Codex | Correzione degli accenti e dei caratteri mojibake nei file `locales/*.json`, inclusi simboli `©`/`→` e lingue europee/asiatiche; validazione JSON su tutte le 16 lingue. |
| 16 giugno 2026 | Codex | Aggiornamento del contesto dopo modifica manuale della navbar: sfondo trasparente con blur, bordo semitrasparente e variante tema chiaro documentati. |
| 16 giugno 2026 | Codex | QA finale con Browser plugin su `localhost:5500`: controllate home, pagine autonome, pagina 404, mobile, CV, cambio lingua EN/ES, console e overflow; corretto refuso `sopratutto` in `locales/it.json` e registrato progetto completo per lo scope statico. |
| 16 giugno 2026 | Codex | Rifinitura finale della hero home: rimosso il saluto iniziale, aggiunto `home.name_extra` in tutte le lingue e stile viola glow/ombra per `Catalin D'Alessandro`; verifica locale su `localhost:5500`. |

---

*Documento inizialmente generato da Claude Code tramite analisi statica del codice sorgente:
per quella prima analisi nessuna esecuzione del codice è stata effettuata. Successivamente
Codex ha aggiornato questo documento dopo aver modificato il progetto ed eseguito/verificato
il sito tramite browser integrato. In controlli successivi, Codex ha corretto la codifica del documento, riallineato i dati verificabili, documentato il form contatti statico, migrato l'invio a EmailJS, aggiunto la verifica email tramite codice, aggiornato la favicon SCD, migliorato l'accessibilita del modal e dei controlli, e ampliato il sistema lingue con spagnolo e modal ricercabile. Claude (claude.ai) ha poi aggiornato il documento dopo il completamento del test manuale e del deploy su Netlify, registrando l'URL di produzione e il nuovo stato del progetto, e ha modificato il viewer CV per usare Google Docs Viewer dove necessario; la versione attuale usa invece PDF.js per il rendering inline del CV. Codex ha infine verificato questa modifica rispetto al codice attuale, riallineato il contesto, rifinito il tema chiaro del modal contatti e riorganizzato le skill card con contenitori piu ampi e badge livello. Successivamente, Claude Opus 4.6 e Gemini Pro 3 (High) hanno ridisegnato il motore dello sfondo animato, migliorato la fisica delle particelle, introdotto in una fase precedente il glassmorphism, risolto il corretto posizionamento fisso per l'esperienza mobile e riallineato questo documento ai file del progetto. Le azioni del CV sono poi state staccate dal viewer e rese piu grandi, centrate e affiancate, con verifica su `127.0.0.1:5500`. Infine Codex ha aggiunto la pagina 404 personalizzata, localizzata in tutte le lingue supportate e verificata in locale, ha bonificato i file di traduzione correggendo accenti, simboli e caratteri CJK/KR/JP rovinati da mojibake, ha documentato la navbar trasparente con blur dopo la modifica manuale, e ha eseguito un QA finale tramite Browser plugin su `localhost:5500`, registrando il progetto come completo per lo scope statico attuale. In seguito Codex ha rimosso il saluto iniziale dalla hero, aggiunto `home.name_extra` a tutte le lingue e applicato lo stile viola glow/ombra a `Catalin D'Alessandro`, verificando la home in locale. Alcune inferenze (es. cronologia iniziale) restano basate sulla struttura logica del progetto e potrebbero non riflettere l'ordine reale di sviluppo.*
