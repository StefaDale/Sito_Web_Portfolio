# PROJECT_CONTEXT.md

> Documento di contesto generato automaticamente per permettere a qualsiasi IA o sviluppatore di
> riprendere il progetto senza ulteriori spiegazioni. Ultima analisi: giugno 2026.

---

## Panoramica del progetto

| Campo | Dettaglio |
|---|---|
| **Nome** | Sito personale di Stefano Catalin D'Alessandro |
| **Titolo HTML corrente** | `Stefano Catalin D'Alessandro \| Sito personale` (home) / `Vita personale \| Stefano Catalin D'Alessandro` / `Vita lavorativa e CV \| Stefano Catalin D'Alessandro` / `Pagina non trovata \| Stefano Catalin D'Alessandro` |
| **Tipo** | Sito web personale statico ibrido: home one-page + due pagine sorgente/modificabili |
| **Scopo principale** | Presentare il proprietario — chi è, le sue passioni e il suo percorso scolastico/lavorativo — con un curriculum vitae visualizzabile online |
| **Problema che risolve** | Fornisce un biglietto da visita digitale completo, accessibile in più lingue, navigabile da chiunque voglia conoscere Stefano |
| **Stato attuale** | **Completo per lo scope statico attuale e online.** La home carica in una pagina lunga i contenuti delle pagine personale e lavorativa; le due sottopagine restano modificabili e apribili direttamente. Navbar dinamica trasparente con blur, i18n multi-lingua con 20 file JSON completi, selettore lingue con modal ricercabile, tema chiaro/scuro, modal contatti accessibile, form EmailJS inline dopo il CV, invio diretto preceduto da verifica email tramite codice, scroll spy, scroll fluido, SEO base, favicon SCD, CV multilingua IT/EN/ES con fallback inglese e nome download unico, pagina 404 personalizzata, sfondo live canvas e animazioni di entrata sono operativi. Sotto le competenze è presente una sezione Progetti automatica che legge le repository pubbliche GitHub di `StefaDale`, filtra `Login_Registration_Form`, recupera anche i linguaggi reali da `languages_url`, mostra card orizzontali e apre in modal iframe le demo live quando disponibili. Il visualizzatore inline del CV e PDF.js sono disattivati tramite commenti: restano visibili solo i pulsanti per aprire e scaricare il PDF. Deploy completato su Netlify. Restano solo miglioramenti opzionali/futuri: backend proprietario per i contatti, verifica email server-side, gestione RTL completa per l'arabo, rimozione del codice verifica di test e rifinitura eventuale dell'immagine Open Graph. |
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
- **PDF.js** — codice e tag CDN conservati ma commentati; servivano a renderizzare il CV PDF in canvas dentro la pagina

### Strumenti e API esterne
- **flagcdn.com** — CDN di bandiere SVG usato per le flag nel selettore lingua (dipendenza esterna leggera, nessun pacchetto npm)
- **EmailJS Browser SDK + REST API** — SDK caricato via CDN (`@emailjs/browser@4`) per inviare i messaggi del form contatti senza backend proprietario, con fallback REST ufficiale quando il CDN non espone `window.emailjs`
- **GitHub REST API** — `main.js` legge `https://api.github.com/users/StefaDale/repos?type=owner&sort=created&direction=asc&per_page=100` per generare automaticamente la sezione Progetti dalle repository pubbliche in ordine di creazione; per ogni repository usa anche `repo.languages_url` quando disponibile, così mostra la lista reale dei linguaggi.
- **cdnjs.cloudflare.com / PDF.js** — CDN conservato nei commenti di `index.html` e `vita-lavorativa.html`; va decommentato solo se si riattiva il viewer inline del CV
- **Simple Icons / Devicon** — sorgenti degli SVG brand scaricati localmente in `assets/icons/` per le skill card
- **localStorage** — usato da `i18n.js` per persistere la scelta della lingua e da `main.js` per persistere il tema chiaro/scuro
- **sessionStorage** — usato da `main.js` per memorizzare temporaneamente i linguaggi GitHub già letti (`PROJECT_LANGUAGE_CACHE_KEY`) durante la sessione
- **IntersectionObserver** — usato da `main.js` per attivare le animazioni di entrata durante lo scroll
- **matchMedia / prefers-reduced-motion** — usato per rispettare le preferenze utente sulle animazioni

### Formato dati
- **JSON** — file di traduzione in `locales/*.json`; ogni file contiene 120 chiavi foglia con la stessa struttura (`nav`, `home`, `personal`, `work`, `modal`, `language_modal`, `footer`, `not_found`, `contact_messages`)
- **Dati repository GitHub** — metadati pubblici delle repo (`name`, `description`, `html_url`, `homepage`, `has_pages`, `language`, `languages_url`, `created_at`) usati per popolare le card progetto
- **PDF** — curriculum vitae disponibile tramite link diretto di apertura e download; versioni italiana, inglese e spagnola in `assets/`; i tre PDF risultano `%PDF-1.4` e a una pagina dalla verifica binaria; il vecchio rendering canvas tramite PDF.js è conservato commentato

---

## Struttura delle cartelle

```
mio-sito/                        ← root del progetto
│
├── .gitignore                   ← file presente ma vuoto
│
├── assets/
│   ├── icons/
│   │   ├── ai.svg               ← icona AI/Gemini per skill card
│   │   ├── assembly.svg         ← icona Assembly
│   │   ├── c.svg                ← icona C
│   │   ├── cplusplus.svg        ← icona C++
│   │   ├── csharp.svg           ← icona C#
│   │   ├── css3.svg             ← icona CSS
│   │   ├── googledrive.svg      ← icona Google Workspace/Drive
│   │   ├── html5.svg            ← icona HTML
│   │   ├── microsoftoffice.svg  ← icona Microsoft Office
│   │   ├── python.svg           ← icona Python
│   │   └── windows11.svg        ← icona Windows
│   ├── images/
│   │   └── og-preview.svg       ← immagine preview social/SEO
│   ├── favicon.svg              ← favicon SVG del sito, testo "SCD" viola su sfondo scuro
│   ├── Stefano Catalin D'Alessandro CV.pdf ← Curriculum Vitae italiano; disponibile per apertura/download
│   ├── Curriculum_EN.pdf        ← Curriculum Vitae inglese
│   └── Curriculum_ES.pdf        ← Curriculum Vitae spagnolo
│
├── css/
│   └── style.css                ← UNICO foglio di stile per tutte le pagine
│                                   (1666 righe, organizzato per sezioni con commenti)
│
├── js/
│   ├── i18n.js                  ← Sistema di internazionalizzazione multi-lingua (192 righe)
│   └── main.js                  ← Navbar dinamica, frammenti, modal, modal lingue, EmailJS, tema, scroll, progetti, sfondo live e reveal (1821 righe)
│
├── locales/
│   ├── ar.json                  ← Traduzioni arabe
│   ├── da.json                  ← Traduzioni danesi
│   ├── de.json                  ← Traduzioni tedesche
│   ├── en.json                  ← Traduzioni inglesi
│   ├── es.json                  ← Traduzioni spagnole
│   ├── fr.json                  ← Traduzioni francesi
│   ├── hi.json                  ← Traduzioni hindi
│   ├── it.json                  ← Traduzioni italiane
│   ├── ja.json                  ← Traduzioni giapponesi
│   ├── ko.json                  ← Traduzioni coreane
│   ├── mk.json                  ← Traduzioni macedoni
│   ├── nl.json                  ← Traduzioni olandesi
│   ├── no.json                  ← Traduzioni norvegesi
│   ├── pl.json                  ← Traduzioni polacche
│   ├── pt.json                  ← Traduzioni portoghesi
│   ├── ro.json                  ← Traduzioni rumene
│   ├── sv.json                  ← Traduzioni svedesi
│   ├── tr.json                  ← Traduzioni turche
│   ├── zh.json                  ← Traduzioni cinese semplificato
│   └── zh-TW.json               ← Traduzioni cinese tradizionale
│
├── index.html                   ← Pagina Home (body.page-home)
├── 404.html                     ← Pagina errore 404 personalizzata (body.page-not-found)
├── PROJECT_CONTEXT.md           ← Questo documento di contesto
├── robots.txt                   ← Regole crawler + link sitemap
├── sitemap.xml                  ← Sitemap di produzione
├── vita-lavorativa.html         ← Pagina Vita Lavorativa (body.page-work)
└── vita-personale.html          ← Pagina Vita Personale (body.page-personal)
```

### Descrizione file per file

| File | Ruolo |
|---|---|
| `index.html` | Home one-page: hero + contenitori `page-fragment` che caricano i blocchi personale/lavorativo + footer + modal |
| `404.html` | Pagina 404 personalizzata: messaggio localizzato, pulsanti verso home e ancora diretta `index.html#cv-section`, navbar dinamica, tema, sfondo live e modal contatti |
| `vita-personale.html` | Pagina autonoma e sorgente del blocco `#personal-section-source`: chi sono, passioni, storia personale |
| `vita-lavorativa.html` | Pagina autonoma e sorgente del blocco `#work-section-source`: skill cards con badge livello, sezione Progetti automatica sotto le competenze, timeline esperienze, sezione CV con ancora `#cv-section`, pulsanti apertura/download CV e form contatti EmailJS inline subito dopo il CV; il vecchio `.cv-wrapper` PDF.js e' commentato |
| `style.css` | CSS globale. Sezioni: variabili tema dark/light, reset, animazioni reveal, navbar, hero, 404, footer, modal, form contatti, page-hero, content-section, cards, skills, projects, timeline, CV viewer conservato, lang-dropdown, mobile menu, modal lingue e responsive |
| `main.js` | Costruisce la navbar lato client, carica i frammenti nella home, gestisce i form contatti con EmailJS e verifica email, modal contatti accessibile, modal lingue ricercabile, modal progetti, tema, scroll spy, scroll fluido, hamburger, skill scroller con frecce disabilitabili, sezione Progetti automatica da GitHub API con filtro repo, lettura linguaggi da `languages_url` e cache `sessionStorage`, sfondo live canvas a scie geometriche, selezione automatica del PDF CV in base alla lingua, link apertura/download CV e animazioni reveal; il vecchio `renderCustomCV()` PDF.js e' commentato |
| `i18n.js` | Carica il JSON della lingua corrente via `fetch()`, applica le stringhe agli elementi `[data-i18n]`, persiste la scelta in localStorage, espone i metadati delle lingue, riapplica le traduzioni ai frammenti caricati ed emette l'evento `languagechange` quando la lingua viene inizializzata o cambiata |
| `locales/*.json` | 20 dizionari di traduzione, struttura identica con chiavi annidate: `nav`, `home`, `personal`, `work`, `modal`, `language_modal`, `footer`, `not_found`, `contact_messages` |
| `assets/Stefano Catalin D'Alessandro CV.pdf` | PDF del CV in italiano; usato quando la lingua corrente è `it` |
| `assets/Curriculum_EN.pdf` | PDF del CV in inglese; usato quando la lingua corrente è `en` e come fallback per tutte le lingue senza traduzione del CV |
| `assets/Curriculum_ES.pdf` | PDF del CV in spagnolo; usato quando la lingua corrente è `es` |
| `favicon.svg` | Favicon SVG del sito con scritta `SCD` viola su sfondo scuro |
| `assets/images/og-preview.svg` | Immagine preview locale usata dai meta Open Graph/Twitter Card |
| `assets/icons/*.svg` | Icone locali per le 11 skill card: Windows, C#, Python, C, C++, HTML, CSS, Assembly, AI, Google Workspace e Microsoft Office |
| `.gitignore` | Presente ma vuoto |
| `robots.txt` | Consente l'indicizzazione e dichiara la sitemap di produzione |
| `sitemap.xml` | Elenca home, vita personale e vita lavorativa con priorità SEO |
| `PROJECT_CONTEXT.md` | Documento operativo di contesto, cronologia, decisioni e istruzioni per futuri interventi |

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
- **Lingue disponibili:** `it`, `en`, `es`, `fr`, `de`, `pt`, `ro`, `nl`, `pl`, `sv`, `da`, `no`, `mk`, `ja`, `zh`, `zh-TW`, `ko`, `ar`, `hi`, `tr`.
  Il dropdown mostra italiano, inglese e spagnolo come lingue rapide, più un pulsante
  "Visualizza tutto" che apre il modal con ricerca. Cinese semplificato (`zh`) e
  cinese tradizionale (`zh-TW`) sono file separati. La scelta utente viene distinta dal
  rilevamento automatico tramite `I18N_KEY_SET`, così `navigator.language` viene usato
  solo finché l'utente non seleziona manualmente una lingua.

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
  È presente anche `TEST_VERIFICATION_CODE = '7946130258'`, accettato come codice di test:
  va considerato un bypass di sviluppo da rimuovere se la verifica email deve diventare
  affidabile in produzione.
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
- **Traduzioni:** le descrizioni delle card sono separate in tutte le 20 lingue supportate:
  C# non include Python, Python non include C#, C non include C++, C++ non include C,
  HTML non include CSS e CSS non include HTML. Questo evita il vecchio testo accorpato
  dopo la separazione delle competenze in card autonome.

### 6. Sezione Progetti automatica
- **Dove:** `vita-lavorativa.html` (`#projects-section`), `main.js` (`setupProjects()`, `PROJECT_REPO_OVERRIDES`, `PROJECT_HIDDEN_REPOS`, `openProjectModal()`), `style.css` (classi `.projects-*` e `.project-*`), `locales/*.json`.
- **Come:** `setupProjects()` chiama la GitHub REST API pubblica `https://api.github.com/users/StefaDale/repos?type=owner&sort=created&direction=asc&per_page=100`, filtra fork/archivi e repository escluse, poi crea una card per ogni repo visibile mantenendo l'ordine di creazione.
- **Layout:** le card sono in uno scroller orizzontale come le skill cards, con pulsanti freccia che avanzano o arretrano di una repository alla volta.
- **Repo nascoste:** `PROJECT_HIDDEN_REPOS` contiene `Login_Registration_Form`, cosi' la repo originale locale/didattica non appare come doppione della versione deploy.
- **Override manuali:** `PROJECT_REPO_OVERRIDES` è volutamente minimo. Attualmente contiene solo `Sito_Web_Portfolio`, con `hideDemoButton: true` e `disablePreview: true`, per evitare che il sito apra se stesso in un iframe. `Login_Registration_Form_Deploy`, `LinkTree` e altre repo visibili usano i dati provenienti da GitHub, senza override dedicati nel codice attuale.
- **Demo live:** `getRepoDemoUrl()` usa prima `override.demoUrl`, poi `repo.homepage` (campo Website/About della repo GitHub), poi genera l'URL GitHub Pages se `repo.has_pages` e' vero; se nessuna fonte e' disponibile la card resta senza demo.
- **Linguaggi repository:** `fetchRepoLanguages(repo)` legge `repo.languages_url`, ordina i linguaggi secondo `PROJECT_LANGUAGE_DISPLAY_ORDER`, li formatta come `HTML / CSS / JavaScript / ...` e li salva in `sessionStorage` sotto `project-repo-languages-v1`; se la chiamata fallisce usa `repo.language` o il fallback i18n `project_language_unknown`.
- **Card:** l'anteprima mostra titolo e lista linguaggi reali (`languages`); nel corpo viene mostrata la descrizione da `repo.description` di GitHub, con fallback i18n `project_no_description`, e `Linguaggio piu utilizzato: ...` usando `mainLanguage`; la data mostrata e' `created_at` della repo GitHub, formattata come mese/anno con prima lettera maiuscola.
- **Interazione:** i pulsanti freccia scorrono lo slider una repository alla volta; se una repo ha demo live, il pulsante "Apri demo" e il click sulla card aprono il modal `#project-modal` con iframe; se la preview e' disabilitata o manca demo resta il link Repository.
- **Modal progetto:** presente in `index.html` e `vita-lavorativa.html`; la home importa la sezione lavoro via frammento ma usa il modal gia' presente nella pagina home. La chiusura svuota l'iframe per fermare la demo.
- **i18n:** le stringhe della sezione Progetti sono presenti in tutte le 20 lingue supportate, incluse le label accessibili dei pulsanti freccia.

### 7. Timeline esperienze
- **Dove:** `vita-lavorativa.html` + CSS `.timeline`
- **Come:** Lista verticale con bordo sinistro viola e pallino posizionato in assoluto.
  Attualmente contiene una sola voce (ITIS Artom, 2022–Oggi).

### 8. CV: apertura/download, viewer PDF.js commentato
- **Dove:** `vita-lavorativa.html` + `main.js` + CSS `.cv-actions`
- **Come:** la sezione CV mostra solo i pulsanti per aprire il PDF in una nuova scheda e scaricarlo. `main.js` sceglie il PDF tramite `getCurrentCvAssetUrl()` e la mappa `CV_ASSETS`: `it` usa `assets/Stefano Catalin D'Alessandro CV.pdf`, `en` usa `assets/Curriculum_EN.pdf`, `es` usa `assets/Curriculum_ES.pdf`; ogni altra lingua supportata ricade su `assets/Curriculum_EN.pdf`.
- **Cambio lingua:** `i18n.js` emette `document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }))` dopo inizializzazione o cambio lingua. `main.js` ascolta l'evento e aggiorna gli `href` dei pulsanti CV e il nome del download.
- **Viewer conservato:** il vecchio `.cv-wrapper`, i tag CDN PDF.js in `index.html`/`vita-lavorativa.html`, la funzione `renderCustomCV()` e le relative chiamate in `main.js` sono commentati, non eliminati.
- **Per far riapparire il viewer:** togliere il commento HTML attorno a `.cv-wrapper` in `vita-lavorativa.html`; togliere il commento attorno ai due script PDF.js in `index.html` e `vita-lavorativa.html`; togliere il commento a blocco attorno a `renderCustomCV()` in `js/main.js`; decommentare le tre chiamate `renderCustomCV()` in `loadPageFragments()`, nel listener `languagechange` e nel listener `DOMContentLoaded`.
- **Azioni sempre disponibili:** i link per apertura in nuova scheda e download diretto del file PDF sono centrati, affiancati in una griglia a due colonne e più grandi dei pulsanti standard. Il download imposta sempre `download="Stefano Catalin D'Alessandro CV.pdf"`, quindi il nome finale del file scaricato è identico per italiano, inglese e spagnolo.
- **Ancora diretta:** la sezione CV in `vita-lavorativa.html` ha `id="cv-section"`.
  Il pulsante "Vai al CV" della pagina 404 punta a `index.html#cv-section`; dopo il
  caricamento dei frammenti, `loadPageFragments()` trova l'hash e scorre direttamente
  al blocco CV invece che all'inizio della sezione lavorativa.
- **Fallback visivo:** la vecchia `.cv-fallback` e' commentata insieme al viewer; torna utile solo riattivando PDF.js.

### 9. Card Passioni
- **Dove:** `vita-personale.html` + CSS `.cards-grid`
- **Come:** Grid CSS con `repeat(auto-fit, minmax(200px, 1fr))` per adattarsi alla larghezza.
  Tre card: Videogiochi, Sport, Musica — con icone emoji e testo descrittivo.
  Al hover usano bordo viola, leggero sollevamento e ombra/glow coerente con le skill cards.

### 10. Tema scuro/chiaro con toggle
- **Dove:** `style.css` → `:root` e `:root[data-theme="light"]`; `main.js` → funzioni
  `applyTheme()`, `getStoredTheme()`, `updateThemeButtons()`.
- **Come:** Il tema scuro è il default. Il bottone `theme-toggle` permette di passare al
  tema chiaro e viceversa; la scelta viene salvata in `localStorage["theme"]`.
- **Anti-flash:** ogni pagina imposta subito `document.documentElement.dataset.theme` nel
  `<head>` prima di caricare il CSS.

### 11. Favicon SCD
- **Dove:** `assets/favicon.svg` + `<link rel="icon">` nelle quattro pagine HTML.
- **Come:** SVG statico con fondo scuro coerente col tema e testo `SCD` viola. È referenziato
  da home, vita personale, vita lavorativa e 404.

### 12. Home one-page con frammenti HTML
- **Dove:** `index.html` + `main.js` → `loadPageFragments()`.
- **Come:** La home contiene due contenitori `.page-fragment` che caricano via `fetch()`
  i blocchi `#personal-section-source` e `#work-section-source` dalle rispettive pagine.
- **Vantaggio:** `vita-personale.html` e `vita-lavorativa.html` restano file distinti e
  modificabili, ma l'utente può navigare il sito come una pagina lunga.

### 13. Animazioni di entrata
- **Dove:** `style.css` → classi `.reveal` / `.is-visible`; `main.js` → `setupRevealAnimations()`.
- **Come:** JavaScript assegna la classe `.reveal` a hero, sezioni, testi, card, timeline,
  skill cards, blocco CV e footer. `IntersectionObserver` aggiunge `.is-visible` quando
  l'elemento entra nel viewport, producendo una comparsa progressiva verso l'alto.
  Le skill card vengono rivelate come gruppo quando il loro wrapper orizzontale entra
  verticalmente nel viewport, così anche le card fuori asse sono già visibili quando
  l'utente usa le frecce orizzontali.
- **Accessibilità:** se l'utente ha attivo `prefers-reduced-motion`, gli elementi sono
  mostrati senza animazione.

### 14. Sfondo live canvas
- **Dove:** `main.js` → `setupLiveBackground()`; `style.css` → `#live-background`.
- **Come:** al `DOMContentLoaded` viene creato un `<canvas id="live-background">` fisso,
  non interattivo (`pointer-events: none`) e dietro al contenuto (`z-index: 0`, contenuti a `z-index: 1`).
  Il canvas usa un buffer offscreen e disegna scie geometriche viola tipo "pipe trail":
  piccoli tracciati entrano, cambiano direzione su una griglia angolare, restano visibili
  per un tempo breve e poi escono con dissolvenza/blur.
- **Scroll e mobile:** durante lo scroll fluido la navbar invia eventi `live-background:pause`
  e `live-background:resume`, così l'animazione non pesa mentre la pagina si muove. Su viewport
  touch usa `viewportHeightLock` per evitare salti legati alla barra browser mobile.
- **Tema:** il canvas attuale usa una palette scura/viola interna (`backgroundColor = 'hsla(250, 58%, 6%, 1)'`) e non ricalcola i colori in base a `data-theme`.
- **Accessibilità/performance:** se `prefers-reduced-motion: reduce` è attivo, lo sfondo
  non viene avviato; se la preferenza viene attivata dopo il caricamento, l'animazione viene fermata e il canvas rimosso.

---

## Architettura del progetto

### Organizzazione generale

```
BROWSER
  │
  ├─ Carica HTML statico (una delle quattro pagine)
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
  │    ├─ Costruisce il modal "Tutte le lingue"
  │    └─ Avvia scroll spy
  │
  ├─ DOMContentLoaded ──► main.js::loadPageFragments() [solo home]
  │    ├─ fetch("vita-personale.html") → #personal-section-source
  │    ├─ fetch("vita-lavorativa.html") → #work-section-source
  │    ├─ inserisce i blocchi nella home
  │    ├─ richiama refreshI18n()
  │    ├─ inizializza skill scroller, sezione Progetti e form contatti inline
  │    ├─ aggiorna link apertura/download CV
  │    ├─ inizializza animazioni reveal dopo il layout
  │    ├─ riallinea scroll spy
  │    └─ gestisce hash iniziale, incluso #cv-section
  │
  └─ DOMContentLoaded → requestAnimationFrame ──► i18n.js::initI18n()
       ├─ Determina lingua (localStorage, navigator.language o default "en")
     ├─ fetch("locales/{lang}.json")
     ├─ applyTranslations() → scrive textContent sugli [data-i18n]
     ├─ updateLangButton() → aggiorna bandiera/codice
     ├─ dispatch languagechange per CV e UI dipendenti dalla lingua
     └─ document click delegation su .lang-option → setLang()
```

### Flusso dei dati

```
localStorage["lang"]          ←── scelta utente
localStorage["lang_set_by_user"]
       │
       ▼
getStoredLang()               restituisce una delle 20 lingue supportate
       │
       ▼
fetch("locales/{lang}.json")  carica dizionario
       │
       ▼
resolve(obj, "a.b.c")         naviga il JSON annidato
       │
       ▼
el.textContent = value        applica a ogni [data-i18n]
el.placeholder = value        applica ogni [data-i18n-placeholder]
el.aria-label = value         applica ogni [data-i18n-aria-label]
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
  │  hero + page-fragment + footer                   │
  │  modal contatti + modal progetto                 │
  │  carica contenuti da pagine separate via fetch    │  Le pagine condividono:
  │                                                  │  - style.css
vita-personale.html ──────────────────────────────── │  - i18n.js
  │  #personal-section-source + footer + modal        │  - main.js
  │                                                  │  - locales/
vita-lavorativa.html ─────────────────────────────── │
  │  #work-section-source + footer                   │
  │  modal contatti + modal progetto                 │
  │
404.html ─────────────────────────────────────────── │
     pagina noindex + footer + modal contatti       ──
```

### Pattern di internazionalizzazione

Ogni testo visibile destinato alla localizzazione è marcato con `data-i18n` (tranne eccezioni come
date, simboli, emoji, fallback HTML iniziali e testo tecnico nei commenti). Le stringhe runtime sono recuperate dal JSON via `data-i18n`.
Questo garantisce che aggiungere una nuova lingua richieda soprattutto un nuovo file JSON
e l'aggiunta della lingua in `SUPPORTED` e `LANG_META` in `i18n.js`; se la lingua deve
comparire anche nel dropdown rapido, va aggiunta anche al template `.lang-menu` in `main.js`.

---

## Stato attuale

### Completato ✅
- Struttura ibrida: home one-page + pagine personale/lavorativa autonome e usate come sorgenti dei frammenti
- Foglio di stile completo con variabili CSS per tema scuro e tema chiaro
- Navbar dinamica generata via JS con link ad ancore, scroll spy e stato attivo desktop/mobile
- Sistema i18n funzionante con 20 lingue, persistenza localStorage, rilevamento `navigator.language`, distinzione tra lingua automatica e scelta utente tramite `lang_set_by_user`, e `refreshI18n()`
- Modal contatti funzionante (apertura via bottone navbar, chiusura con ✕ o click esterno)
- Form contatti statico nel modal: campi nome/email/codice verifica/messaggio, submit diretto via EmailJS dopo verifica email, stato invio accessibile e testi i18n
- Modal contatti con semantica dialog, gestione `Escape`, focus iniziale, focus trap e ripristino focus alla chiusura
- Footer e modal contatti con link a Instagram e GitHub
- Pulizia HTML/accessibilità dei modal contatti: chiusura coerente dei tag `<li>`, label nascosta per codice OTP, stati ARIA e `rel="noopener noreferrer"` sui link aperti in nuova scheda
- Menu hamburger mobile con chiusura su click esterno e click sui link
- Animazioni di entrata scroll-triggered con `IntersectionObserver`, effetto comparsa verso l'alto e rispetto di `prefers-reduced-motion`
- Sfondo live canvas a scie geometriche con buffer offscreen, pausa durante lo scroll fluido, gestione mobile tramite `viewportHeightLock` e rispetto di `prefers-reduced-motion`
- Skill cards più ampie con layout orizzontale, icona grande a destra, descrizione visibile, badge livello e scroll orizzontale fluido custom
- Frecce skill cards con `aria-label` localizzato
- Sezione Progetti sotto le competenze: caricamento automatico repo pubbliche GitHub, filtro del doppione `Login_Registration_Form`, override minimo per `Sito_Web_Portfolio`, lettura linguaggi reali da `languages_url`, cache `sessionStorage`, card responsive e modal iframe per demo live
- Timeline esperienze
- CV disponibile con link apertura/download; viewer PDF.js e fallback conservati commentati
- Card passioni in griglia responsive con hover glow coerente con le skill cards
- Selettore lingua con bandiere, dropdown animato, tre lingue rapide e pulsante "Visualizza tutto"
- Modal "Tutte le lingue" con barra di ricerca, lista generata da `SUPPORTED`/`LANG_META` e selezione lingua
- Toggle tema chiaro/scuro con persistenza localStorage e anti-flash nel `<head>`
- Pagina `404.html` personalizzata, noindex, localizzata tramite chiavi `not_found`, con azioni verso home e ancora diretta alla sezione CV (`#cv-section`)
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
- `main.js` contiene `TEST_VERIFICATION_CODE = '7946130258'`, accettato come codice valido
  oltre al codice temporaneo generato. È utile per test locali, ma va rimosso o protetto
  prima di considerare la verifica email realmente affidabile in produzione
- I CV sono PDF statici in `assets/`: italiano (`Stefano Catalin D'Alessandro CV.pdf`), inglese (`Curriculum_EN.pdf`) e spagnolo (`Curriculum_ES.pdf`). Per aggiornarli occorre sostituire i file fisicamente; per aggiungere una nuova lingua con CV tradotto bisogna aggiungere il PDF e aggiornare `CV_ASSETS` in `js/main.js`.
- I testi della sezione personale/lavorativa sono hardcoded nel JSON; non c'è CMS
- La lingua araba è tradotta, ma il sito non imposta automaticamente `dir="rtl"` né ha una
  passata CSS dedicata alla direzione RTL; il testo resta comunque sostituito via i18n
- Le bandiere del selettore lingua dipendono da `flagcdn.com`; in ambienti con rete esterna
  bloccata possono non caricarsi, senza compromettere il cambio lingua
- Le card Progetti dipendono dalle API pubbliche GitHub: se GitHub non risponde, se si supera
  un rate limit o se `languages_url` fallisce, il sito mostra il messaggio di errore o usa i fallback disponibili
- EmailJS dipende da un servizio esterno: se CDN/API EmailJS non sono raggiungibili, il form
  non può spedire messaggi o codici di verifica
- PDF.js non è attualmente caricato: i tag CDN sono commentati insieme al viewer inline del CV.
  Per riattivarlo, seguire le istruzioni nella sezione "CV: apertura/download, viewer PDF.js commentato".
- Lo sfondo live canvas usa una palette scura interna anche con tema chiaro; se si vuole una
  coerenza visiva totale col tema light, occorre aggiungere colori dipendenti da `data-theme`

### Possibili miglioramenti
- Rimuovere il codice verifica di test o limitarlo a un ambiente di sviluppo non pubblico
- Spostare verifica email e invio contatti su backend/edge function con rate limit e sessione server-side
- Aggiungere gestione completa RTL per l'arabo (`dir="rtl"`, QA layout e micro-regole CSS dove servono)
- Aggiungere fallback locali per le bandiere o accettare icone testuali quando `flagcdn.com` non è raggiungibile
- Rifinire o sostituire `assets/images/og-preview.svg` con una preview social più rappresentativa, se necessario
- Decidere se mantenere PDF.js commentato come opzione reversibile o rimuovere definitivamente CSS/commenti del viewer se non serve più
- Valutare una piccola cache/fallback statico per i Progetti se GitHub API non è disponibile

---

## Decisioni progettuali

### Nessun framework
**Scelta:** Vanilla HTML/CSS/JS senza React, Vue, Bootstrap o simili.
**Motivazione:** Il sito è un progetto didattico personale. L'autore vuole apprendere
le basi senza dipendenze esterne. Il sito è abbastanza semplice da non richiedere reattività.

### Navbar generata via JavaScript
**Scelta:** La `<nav>` non è nell'HTML ma viene creata e iniettata da `buildNavbar()`.
**Motivazione:** Evita la duplicazione del codice della navbar nelle quattro pagine HTML e
permette di omettere dinamicamente il link alla pagina corrente.
**Compromesso:** Il sito non funziona senza JavaScript abilitato (nessuna navbar = nessuna navigazione).

### Sistema i18n custom (no libreria)
**Scelta:** Sistema di traduzione scritto da zero in un file leggero dedicato (`js/i18n.js`, circa 190 righe).
**Motivazione:** Librerie come `i18next` sarebbero eccessive per il tipo di sito: anche con
20 lingue, la struttura resta fatta di file JSON piccoli, chiavi annidate e testo semplice.
Il pattern `data-i18n="chiave.annidata"` è semplice, leggibile e sufficiente.

### Un solo file CSS
**Scelta:** `style.css` copre tutte e quattro le pagine.
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

La repository del progetto è disponibile su GitHub all'indirizzo: https://github.com/StefaDale/Sito_Web_Portfolio.git

### Come effettuare modifiche

| Cosa modificare | File da toccare |
|---|---|
| Testi / traduzioni | Tutti i file `locales/*.json` (20 lingue, stessa struttura da 120 chiavi foglia) |
| Stile visivo / colori | `css/style.css` (variabili in `:root`) |
| Tema chiaro/scuro | `css/style.css` (`:root[data-theme="light"]`) + `js/main.js` |
| Struttura navbar | `js/main.js` → `buildNavbar()` |
| Logica lingua | `js/i18n.js` |
| Contenuto home | `index.html` (hero + contenitori frammento) |
| Contenuto vita personale | `vita-personale.html` dentro `#personal-section-source` |
| Contenuto vita lavorativa | `vita-lavorativa.html` dentro `#work-section-source` |
| Sezione Progetti | `vita-lavorativa.html` (`#projects-section`), `js/main.js` (`PROJECT_REPO_OVERRIDES`, `PROJECT_HIDDEN_REPOS`, `setupProjects()`), `css/style.css` (`.projects-*`, `.project-*`) |
| CV | Sostituire i PDF in `assets/` (`Stefano Catalin D'Alessandro CV.pdf`, `Curriculum_EN.pdf`, `Curriculum_ES.pdf`) oppure aggiornare `CV_ASSETS` e `CV_DOWNLOAD_FILENAME` in `js/main.js` se cambiano mapping o nome finale del download |
| Sfondo live canvas | `js/main.js` → `setupLiveBackground()` e `css/style.css` → `#live-background` |
| Pagina 404 | `404.html` + chiavi `not_found` in tutti i file `locales/*.json` |
| SEO / crawling | Meta tag nei file HTML, `robots.txt`, `sitemap.xml`, `assets/images/og-preview.svg` |
| Aggiungere immagini | Mettere i file in `assets/images/` e referenziarli nell'HTML |
| Favicon | Modificare `assets/favicon.svg` |
| Configurazione EmailJS | Modificare `EMAILJS_CONFIG` in `js/main.js` |
| Durata codice verifica email | Modificare `EMAIL_VERIFICATION_TTL_MS` in `js/main.js` |
| Codice verifica di test | Rimuovere o modificare `TEST_VERIFICATION_CODE` in `js/main.js` |

### Per aggiungere una nuova sezione
1. Aggiungere le chiavi al JSON in tutte le lingue supportate
2. Aggiungere il blocco HTML con gli attributi `data-i18n` corretti
3. Aggiungere eventuali stili in `style.css`

### Per aggiungere una nuova lingua
1. Scegliere il codice della lingua, ad esempio `de`, `pt` o un codice composto come `zh-TW`.
2. Copiare uno dei file esistenti in `locales/{codice}.json` e tradurre tutte le chiavi mantenendo identica la struttura.
3. Verificare che il nuovo JSON abbia le stesse 120 chiavi foglia dei file esistenti.
4. In `js/i18n.js`, aggiungere il codice a `SUPPORTED`.
5. In `js/i18n.js`, aggiungere una voce in `LANG_META` con `code`, `name`, `nativeName`, `flagSrc` e `flagAlt`.
6. In `js/main.js` → `buildNavbar()`, aggiungere la lingua anche nel dropdown rapido `.lang-menu` se deve comparire tra le lingue visibili subito.
7. Non serve modificare il modal "Tutte le lingue": viene generato automaticamente da `SUPPORTED` e `LANG_META`.
8. Se esiste un CV tradotto per la nuova lingua, aggiungere il PDF in `assets/` e registrarlo in `CV_ASSETS` dentro `js/main.js`; se non esiste, il sito userà automaticamente il CV inglese.
9. Se la lingua è RTL, aggiungere gestione `dir`/CSS e testare layout, modal e slider.
10. Avviare il sito via server locale e testare: dropdown rapido, pulsante "Visualizza tutto", ricerca nel modal lingue, cambio lingua, cambio PDF CV quando previsto, nome file download e persistenza in `localStorage`.

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
| **Fase 43** | Implementazione CV multilingua: italiano, inglese e spagnolo usano PDF dedicati; tutte le altre lingue ricadono sul PDF inglese; apertura, preview PDF.js e download vengono aggiornati al cambio lingua, con nome download sempre `Stefano Catalin D'Alessandro CV.pdf` |
| **Fase 44** | Riallineamento descrizioni skill card in 14 file lingua: testi separati per C#/Python, C/C++ e HTML/CSS in tutte le 16 lingue; correzione del pulsante 404 "Vai al CV" verso `index.html#cv-section` e aggiunta dell'ancora `#cv-section` alla sezione CV |
| **Fase 45** | Disattivazione reversibile del viewer inline CV: `.cv-wrapper`, script PDF.js, `renderCustomCV()` e relative chiamate commentati; restano solo apertura/download del PDF con mapping multilingua attivo |
| **Fase 46** | Aggiunta sezione Progetti automatica sotto le competenze: lettura repo pubbliche GitHub di `StefaDale`, filtro `Login_Registration_Form`, override tecnici per portfolio/Login deploy/LinkTree, descrizioni da GitHub, demo live da override/homepage/GitHub Pages, card responsive, modal iframe e stringhe i18n |
| **Fase 47** | Riallineamento completo del contesto dopo lettura del progetto: documentate 20 lingue complete, cache linguaggi GitHub in `sessionStorage`, `languages_url`, override Progetti ridotti al solo `Sito_Web_Portfolio`, sfondo live canvas a scie geometriche, codice verifica di test, struttura file completa e verifica binaria dei PDF |
| **Stato corrente** | Progetto completo per lo scope statico attuale, funzionale e online. Restano opzionali: backend proprietario/server-side per il form, rimozione/protezione del codice verifica di test, gestione RTL per arabo e rifinitura futura dell'immagine Open Graph |

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
  pattern adottato per evitare duplicazioni nelle quattro pagine
- **Fragment loading:** la home carica via `fetch()` blocchi HTML dalle due sottopagine,
  mantenendo un'esperienza one-page senza perdere file separati e modificabili
- **Scroll spy:** la sezione visibile aggiorna lo stato attivo dei bottoni navbar desktop/mobile
- **Lazy content reveal (CSS + JS):** le animazioni di entrata usano `.reveal`/`.is-visible`
  e `IntersectionObserver`; le skill card usano un layout stabile con descrizione sempre visibile

### Stato preciso dell'ultima versione analizzata
- Quattro pagine HTML complete: home one-page, due sottopagine autonome/sorgente e 404 personalizzata
- CSS: include media query mobile, tema dark/light, scroll margin per ancore, utility `.sr-only`, modal lingue, classi reveal e fallback reduced motion
- `main.js`: navbar, modal contatti accessibile, modal lingue ricercabile, frammenti, tema, scroll spy, scroll fluido, skill scroller con frecce disabilitabili, sezione Progetti automatica da GitHub API con filtro repo, linguaggi reali via `languages_url`, cache `sessionStorage` e modal iframe, sfondo live canvas a scie geometriche, link CV multilingua/fallback inglese e animazioni reveal; viewer PDF.js conservato commentato
- `i18n.js`: sistema i18n completo con event delegation, `navigator.language`, `refreshI18n()`, `SUPPORTED`, `LANG_META` ed evento `languagechange`
- JSON: struttura identica per tutte le 20 lingue supportate in `locales/`; ogni file ha 120 chiavi foglia e include `nav`, `home`, `personal`, `work`, `modal`, `language_modal`, `footer`, `not_found`, `contact_messages`
- `404.html` punta il pulsante CV a `index.html#cv-section`; `vita-lavorativa.html` espone `id="cv-section"` sulla sezione CV
- `assets/Stefano Catalin D'Alessandro CV.pdf`, `assets/Curriculum_EN.pdf`, `assets/Curriculum_ES.pdf`: PDF CV presenti in `assets/`; verificati come `%PDF-1.4`, una pagina ciascuno tramite controllo binario locale, senza estrazione completa del testo interno perché nell'ambiente non erano disponibili strumenti PDF testuali
- `assets/favicon.svg`: favicon `SCD` viola su sfondo scuro
- `assets/images/`: contiene `og-preview.svg`; nessuna foto profilo personale prevista
- `.gitignore`: presente ma vuoto; `robots.txt` e `sitemap.xml` sono presenti e puntano alla produzione Netlify

### Ultimo lavoro svolto
Codex ha riletto tutti i file di progetto fuori da `.git`: HTML, CSS, JS, JSON, SVG, `robots.txt`, `sitemap.xml`, `.gitignore`, questo documento e i tre PDF come asset binari. Il contesto è stato riallineato allo stato reale: 20 lingue supportate con 120 chiavi JSON ciascuna, sezione Progetti basata su GitHub API con linguaggi reali da `languages_url` e cache `sessionStorage`, override manuali ridotti al solo `Sito_Web_Portfolio`, sfondo live canvas a scie geometriche, PDF CV IT/EN/ES verificati come PDF 1.4 a una pagina, e limitazioni aggiornate su codice verifica di test, RTL arabo, dipendenze esterne e viewer PDF.js commentato.

### Prossimo passo consigliato
Test manuale completato con esito positivo. Deploy effettuato su Netlify all'indirizzo https://stefanocatalin.netlify.app.
Non ci sono attività obbligatorie aperte per lo scope attuale. Prossimi passi solo opzionali: rimuovere/proteggere il codice verifica di test, rifinire l'immagine Open Graph quando necessario, valutare backend contatti proprietario/verifica server-side, aggiungere gestione RTL completa per l'arabo e mantenere allineati i meta social dopo future modifiche.

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
| 16 giugno 2026 | Codex | Implementazione CV multilingua IT/EN/ES con fallback inglese per le altre lingue, evento `languagechange` da `i18n.js`, aggiornamento automatico di preview/apertura/download e nome file scaricato fisso `Stefano Catalin D'Alessandro CV.pdf`; aggiornamento del documento di contesto. |
| 16 giugno 2026 | Codex | Correzione descrizioni skill card in 14 file lingua con validazione JSON completa; aggiunta ancora `#cv-section` alla sezione CV e aggiornamento del link 404 "Vai al CV" da `#work-section` a `#cv-section`; aggiornamento del documento di contesto. |
| 16 giugno 2026 | Codex | Disattivazione reversibile del viewer inline CV: `.cv-wrapper`, script PDF.js, `renderCustomCV()` e chiamate correlate commentati; restano solo i pulsanti apertura/download con mapping CV multilingua. |
| 22 giugno 2026 | Codex | Aggiunta sezione Progetti automatica: GitHub API per repo pubbliche, filtro della repo originale `Login_Registration_Form`, override per portfolio/Login deploy/LinkTree, modal iframe per demo live, gestione linguaggi/data creazione e aggiornamento del documento di contesto. |
| 24 giugno 2026 | Codex | Riallineamento sezione Progetti: ordine per creazione, slider orizzontale con frecce una repository alla volta, descrizioni prese da GitHub, demo risolte da override/homepage/GitHub Pages, i18n Progetti estesa e validata su tutte le lingue, aggiornamento del contesto. |
| 26 giugno 2026 | Codex | Lettura completa dei file di progetto fuori da `.git`, inclusi sorgenti, traduzioni, SVG, SEO file e controllo binario dei PDF; aggiornamento del contesto su 20 lingue, struttura completa, GitHub `languages_url`, cache `sessionStorage`, override Progetti correnti, sfondo live canvas, codice verifica di test, limitazioni e roadmap opzionale. |

---

*Documento inizialmente generato da Claude Code tramite analisi statica del codice sorgente:
per quella prima analisi nessuna esecuzione del codice è stata effettuata. Successivamente
Codex ha aggiornato questo documento dopo aver modificato il progetto ed eseguito/verificato
il sito tramite browser integrato. In controlli successivi, Codex ha corretto la codifica del documento, riallineato i dati verificabili, documentato il form contatti statico, migrato l'invio a EmailJS, aggiunto la verifica email tramite codice, aggiornato la favicon SCD, migliorato l'accessibilita del modal e dei controlli, e ampliato il sistema lingue con spagnolo e modal ricercabile. Claude (claude.ai) ha poi aggiornato il documento dopo il completamento del test manuale e del deploy su Netlify, registrando l'URL di produzione e il nuovo stato del progetto, e ha modificato il viewer CV per usare Google Docs Viewer dove necessario; in seguito il viewer e' stato migrato a PDF.js per il rendering inline del CV. Codex ha infine verificato questa modifica rispetto al codice attuale, riallineato il contesto, rifinito il tema chiaro del modal contatti e riorganizzato le skill card con contenitori piu ampi e badge livello. Successivamente, Claude Opus 4.6 e Gemini Pro 3 (High) hanno ridisegnato il motore dello sfondo animato, migliorato la fisica delle particelle, introdotto in una fase precedente il glassmorphism, risolto il corretto posizionamento fisso per l'esperienza mobile e riallineato questo documento ai file del progetto. Le azioni del CV sono poi state staccate dal viewer e rese piu grandi, centrate e affiancate, con verifica su `127.0.0.1:5500`. Infine Codex ha aggiunto la pagina 404 personalizzata, localizzata in tutte le lingue supportate e verificata in locale, ha bonificato i file di traduzione correggendo accenti, simboli e caratteri CJK/KR/JP rovinati da mojibake, ha documentato la navbar trasparente con blur dopo la modifica manuale, e ha eseguito un QA finale tramite Browser plugin su `localhost:5500`, registrando il progetto come completo per lo scope statico attuale. In seguito Codex ha rimosso il saluto iniziale dalla hero, aggiunto `home.name_extra` a tutte le lingue e applicato lo stile viola glow/ombra a `Catalin D'Alessandro`, verificando la home in locale. Successivamente Codex ha aggiunto la gestione dei CV multilingua in `main.js`, l'evento `languagechange` in `i18n.js`, il fallback inglese per lingue senza CV tradotto e il nome download fisso `Stefano Catalin D'Alessandro CV.pdf`, aggiornando questo documento di contesto. Poi Codex ha riallineato le descrizioni skill card in tutte le lingue, validato i JSON, aggiunto `#cv-section` alla sezione CV e corretto il link 404 verso l'ancora diretta del curriculum, aggiornando nuovamente questo documento. In seguito Codex ha disattivato in modo reversibile il viewer inline del CV, commentando `.cv-wrapper`, gli script PDF.js, `renderCustomCV()` e le chiamate correlate, lasciando visibili solo apertura e download del PDF. Infine Codex ha aggiunto e poi riallineato la sezione Progetti automatica basata su GitHub API: ordine per creazione, slider orizzontale, descrizioni lette da GitHub, demo risolte da override/homepage/GitHub Pages, override limitati ai dati tecnici e stringhe i18n complete in tutte le lingue supportate. Il 26 giugno 2026 Codex ha riletto i file del progetto fuori da `.git`, validato la struttura dei 20 JSON, controllato gli asset SVG e i PDF come file binari, e ha aggiornato questo documento con struttura reale, nuove limitazioni, roadmap opzionale e dettagli correnti su Progetti, i18n, sfondo live e verifica email. Alcune inferenze (es. cronologia iniziale) restano basate sulla struttura logica del progetto e potrebbero non riflettere l'ordine reale di sviluppo.*
