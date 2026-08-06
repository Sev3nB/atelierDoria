(() => {
  const mapTitle = () => document.documentElement.lang === "en"
    ? "Map of Atelier Doria, Corso Roma 32, Brindisi"
    : "Mappa di Atelier Doria, Corso Roma 32 Brindisi";

  document.querySelectorAll("[data-map-consent]").forEach((container) => {
    const src = container.dataset.mapSrc;
    const load = () => {
      if (!src) return;
      const iframe = document.createElement("iframe");
      iframe.className = "map";
      iframe.src = src;
      iframe.title = mapTitle();
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      iframe.allowFullscreen = true;
      container.replaceChildren(iframe);
      sessionStorage.setItem("atelier-map-consent", "accepted");
    };
    if (sessionStorage.getItem("atelier-map-consent") === "accepted") load();
    else container.querySelector("[data-load-map]")?.addEventListener("click", load);
  });

  const extraTranslations = {
    "Contatti": "Contact",
    "Dati legali": "Legal details",
    "Sede legale · Corso Roma 32, 72100 Brindisi (BR)": "Registered office · Corso Roma 32, 72100 Brindisi (BR)",
    "La tradizione, con uno sguardo contemporaneo.": "Tradition through a contemporary lens.",
    "Interni, cucina a vista, chef, vini e piatti: ogni immagine racconta una parte dell’esperienza.": "Interiors, open kitchen, chef, wines and dishes: every image tells part of the experience.",
    "Esplora la galleria": "Explore the gallery",
    "Menu pubblicato il 5 agosto 2026. Le proposte possono cambiare secondo mercato e stagione.": "Menu published on 5 August 2026. Dishes may change with the market and the season.",
    "Il menu · estate 2026": "The menu · summer 2026",
    "Tradizione pugliese, mare Adriatico e cucina contemporanea.": "Puglian tradition, the Adriatic Sea and contemporary cuisine.",
    "Aggiornato il 5 agosto 2026": "Updated on 5 August 2026",
    "Menu degustazione": "Tasting menu",
    "Due percorsi per attraversare la cucina dell’Atelier.": "Two tasting journeys through Atelier’s cuisine.",
    "portate": "courses",
    "Dalla cucina": "From the kitchen",
    "Piatti, materia,": "Dishes, ingredients,",
    "gesti.": "gestures.",
    "La storia di Atelier Doria": "The story of Atelier Doria",
    "Archivio fotografico": "Photo archive",
    "Interni, cucina,": "Interiors, kitchen,",
    "chef, vini e piatti.": "chef, wines and dishes.",
    "Il ritmo della cucina a vista.": "The rhythm of the open kitchen.",
    "Cantina · ricerca e territorio": "Wine cellar · exploration and place",
    "Valutazione attuale": "Current rating",
    "recensioni · luglio 2026": "reviews · July 2026",
    "La sala · il punto d’incontro": "The dining room · a place to meet",
    "stelle": "stars",
    "La tua tavola": "Your table",
    "Prenota": "Book",
    "Non inserire dati sanitari non necessari.": "Do not enter unnecessary health information.",
    "Dichiaro di aver letto la Privacy Policy. *": "I confirm that I have read the Privacy Policy. *",
    "Se inserisco allergie, intolleranze o altri dati relativi alla salute nelle note, acconsento esplicitamente al loro trattamento per gestire la prenotazione.": "If I include allergies, intolerances or other health-related information in the notes, I explicitly consent to its processing for the booking.",
    "La tavola · convivialità": "The table · conviviality",
    "Chiama": "Call",
    "Un archivio reale di cucina, materia, persone e luoghi.": "A real archive of cuisine, ingredients, people and places.",
    "immagini": "images",
    "Piatti": "Dishes",
    "Materia": "Ingredients",
    "Cucina": "Kitchen",
    "Chef": "Chef",
    "Interni": "Interiors",
    "Esterno": "Exterior",
    "Tavola": "Table",
    "Cantina": "Wine cellar",
    "Contrasti · frutta e materia": "Contrasts · fruit and ingredients",
    "Puglia · cime di rapa e alici": "Puglia · turnip greens and anchovies",
    "Memoria · polpette e pomodoro": "Memory · meatballs and tomato",
    "Terra · cotture precise": "Land · precise cooking",
    "Stagione · verde e mare": "Season · greens and sea",
    "Casa · crostata": "Home · tart",
    "Tradizione · ragù": "Tradition · ragù",
    "Adriatico · pasta e pescato": "Adriatic · pasta and fresh catch",
    "Dolci · crema e pinoli": "Desserts · custard and pine nuts",
    "Classici · tiramisù": "Classics · tiramisu",
    "Mare · gamberi": "Sea · prawns",
    "Dolci · frutti di bosco": "Desserts · berries",
    "Materia · alici": "Ingredients · anchovies",
    "Gesto · mantecatura": "Technique · finishing the pasta",
    "Adriatico · ricci di mare": "Adriatic · sea urchins",
    "Osteria · pomodoro": "Osteria · tomato",
    "Essenziale · crudo di mare": "Essential · raw seafood",
    "Ricerca · tartufo": "Exploration · truffle",
    "Territorio · fichi e formaggio": "Local flavours · figs and cheese",
    "Materia · gamberi rossi": "Ingredients · red prawns",
    "Cucina · il gesto": "Kitchen · the gesture",
    "Cucina · il ritmo": "Kitchen · the rhythm",
    "Interni · cucina a vista": "Interiors · open kitchen",
    "Interni · la sala": "Interiors · the dining room",
    "Interni · i dettagli": "Interiors · details",
    "Convivialità · a tavola": "Conviviality · at the table",
    "Cantina · selezione": "Wine cellar · selection",
    "Cantina · piccoli produttori": "Wine cellar · small producers",
    "Cantina · ricerca": "Wine cellar · exploration",
    "Messaggio inviato correttamente.": "Message sent successfully.",
    "Hai effettuato troppi tentativi. Attendi 15 minuti prima di riprovare.": "Too many attempts. Wait 15 minutes before trying again.",
    "La sessione è scaduta. Ricarica la pagina e riprova.": "Your session has expired. Reload the page and try again.",
    "Compila correttamente tutti i campi obbligatori e conferma di aver letto la Privacy Policy.": "Complete all required fields correctly and confirm that you have read the Privacy Policy.",
    "Uno o più campi superano la lunghezza consentita.": "One or more fields exceed the permitted length.",
    "Non è stato possibile inviare il messaggio. Riprova più tardi o contatta direttamente il ristorante.": "The message could not be sent. Try again later or contact the restaurant directly.",
    "Email *": "Email *",
    "Mappa esterna": "External map",
    "Google Maps è bloccato per impostazione predefinita. Caricandolo, Google potrà trattare dati tecnici e usare propri cookie secondo la Cookie Policy.": "Google Maps is blocked by default. If you load it, Google may process technical data and use its own cookies as described in the Cookie Policy.",
    "Carica Google Maps": "Load Google Maps",
    "La sala · occasioni da condividere": "The dining room · occasions to share",
    "Trasparenza": "Transparency",
    "Ultimo aggiornamento:": "Last updated:",
    "6 agosto 2026.": "6 August 2026.",
    "Bozza soggetta a verifica legale prima della pubblicazione definitiva.": "Draft subject to legal review before final publication.",
    "Informativa ai sensi degli articoli 13 e 14 del Regolamento (UE) 2016/679.": "Notice pursuant to Articles 13 and 14 of Regulation (EU) 2016/679.",
    "1. Titolare del trattamento": "1. Data controller",
    "2. Dati trattati": "2. Data processed",
    "3. Finalità e basi giuridiche": "3. Purposes and legal bases",
    "4. Conferimento dei dati": "4. Provision of data",
    "5. Modalità, destinatari e trasferimenti": "5. Processing methods, recipients and transfers",
    "6. Conservazione": "6. Retention",
    "7. Diritti dell’interessato": "7. Data subject rights",
    "8. Processi decisionali automatizzati": "8. Automated decision-making",
    "9. Aggiornamenti": "9. Updates",
    "Il titolare del trattamento è Appia Food S.R.L.S., P. IVA 02717510743, con sede legale in Corso Roma 32, 72100 Brindisi (BR), e-mail atelierdoria@libero.it.": "The data controller is Appia Food S.R.L.S., VAT no. 02717510743, with registered office at Corso Roma 32, 72100 Brindisi (BR), email atelierdoria@libero.it.",
    "Il sito può trattare dati di navigazione e informazioni fornite volontariamente: nome e cognome, indirizzo e-mail, numero di telefono, data e ora richieste, numero di persone, contenuto dei messaggi e delle note. Le note di prenotazione possono contenere dati relativi ad allergie, intolleranze o altre esigenze alimentari, che possono costituire categorie particolari di dati personali.": "The site may process browsing data and information provided voluntarily: full name, email address, telephone number, requested date and time, number of guests, and message or note content. Booking notes may contain information about allergies, intolerances or other dietary needs, which may constitute special categories of personal data.",
    "I dati non sono utilizzati per marketing o profilazione tramite questo sito.": "Data is not used for marketing or profiling through this site.",
    "I campi indicati come obbligatori sono necessari per gestire la richiesta. Il mancato conferimento impedisce l’invio. L’inserimento di note, allergie o intolleranze è facoltativo. Non inserire dati sanitari non necessari.": "Fields marked as required are necessary to manage the request. Without them, the request cannot be sent. Notes, allergies and intolerances are optional. Do not enter unnecessary health information.",
    "Il sito non svolge processi decisionali automatizzati né profilazione.": "The site does not perform automated decision-making or profiling.",
    "Questa informativa può essere aggiornata in caso di modifiche ai trattamenti o ai servizi. La versione vigente è identificata dalla data riportata in alto.": "This notice may be updated when processing activities or services change. The current version is identified by the date shown above.",
    "Informazioni sui dati memorizzati nel browser e sui contenuti di terze parti.": "Information about data stored in the browser and third-party content.",
    "1. Cosa sono cookie e strumenti simili": "1. What cookies and similar technologies are",
    "2. Strumenti usati dal sito": "2. Tools used by the site",
    "3. Google Fonts, Google Maps e servizi esterni": "3. Google Fonts, Google Maps and external services",
    "4. Gestione delle preferenze": "4. Managing preferences",
    "5. Informazioni ulteriori": "5. Further information",
    "I cookie sono piccoli file di testo salvati dal browser. Tecnologie come localStorage e sessionStorage possono conservare informazioni sul dispositivo con modalità analoghe.": "Cookies are small text files saved by the browser. Technologies such as localStorage and sessionStorage can store information on the device in similar ways.",
    "Strumento": "Tool",
    "Fornitore": "Provider",
    "Finalità": "Purpose",
    "Durata": "Duration",
    "Preferenza lingua": "Language preference",
    "Ricordare la lingua scelta; elemento tecnico": "Remember the selected language; technical storage",
    "Secondo la configurazione del browser": "According to browser settings",
    "Preferenza mappa": "Map preference",
    "Ricordare per la sessione l’attivazione volontaria della mappa": "Remember the voluntary activation of the map for the session",
    "Fine della sessione": "End of session",
    "Fornire i caratteri tipografici; richiesta tecnica automatica": "Provide typefaces; automatic technical request",
    "Definita da Google": "Defined by Google",
    "Visualizzare la mappa, soltanto dopo un’azione esplicita": "Display the map only after an explicit action",
    "Il sito non installa direttamente cookie pubblicitari, di profilazione o analytics. I dati tecnici di accesso possono essere registrati dal fornitore di hosting per sicurezza e funzionamento.": "The site does not directly install advertising, profiling or analytics cookies. Technical access data may be logged by the hosting provider for security and operation.",
    "La scelta relativa alla mappa dura per la sessione del browser. Chiudendo tutte le schede del sito o cancellando i dati del sito, la preferenza viene rimossa. È inoltre possibile bloccare o cancellare cookie e dati locali dalle impostazioni del browser.": "The map preference lasts for the browser session. Closing all site tabs or deleting site data removes the preference. Cookies and local data can also be blocked or deleted in browser settings.",
    "Per il trattamento dei dati personali e l’esercizio dei diritti consulta la Privacy Policy. Per informazioni sui cookie di Google consulta la documentazione del relativo fornitore.": "For personal data processing and the exercise of your rights, see the Privacy Policy. For information about Google cookies, see the provider’s documentation.",
    "Pagina non trovata": "Page not found",
    "Errore 404": "Error 404",
    "Errore 500": "Error 500"
  };

  const originalText = new WeakMap();
  const originalAttrs = new WeakMap();

  const translated = (value) => {
    const clean = value.trim();
    const direct = extraTranslations[clean];
    if (direct) return value.replace(clean, direct);
    return value
      .replace(/^(\d+) portate$/, "$1 courses")
      .replace(/^(\d+) immagini$/, "$1 images")
      .replace(/^(\d+) stelle$/, "$1 stars");
  };

  const applyExtraTranslations = () => {
    const english = document.documentElement.lang === "en";
    document.querySelectorAll("body *:not(script):not(style)").forEach((element) => {
      if (element.matches("[data-i18n-it][data-i18n-en]")) return;
      element.childNodes.forEach((node) => {
        if (node.nodeType !== Node.TEXT_NODE || !node.textContent.trim()) return;
        if (!originalText.has(node)) originalText.set(node, node.textContent);
        const original = originalText.get(node);
        node.textContent = english ? translated(original) : original;
      });
      ["alt", "aria-label", "title", "placeholder"].forEach((attribute) => {
        if (!element.hasAttribute(attribute)) return;
        if (!originalAttrs.has(element)) originalAttrs.set(element, {});
        const stored = originalAttrs.get(element);
        if (!(attribute in stored)) stored[attribute] = element.getAttribute(attribute);
        element.setAttribute(attribute, english ? translated(stored[attribute]) : stored[attribute]);
      });
    });
    document.querySelectorAll(".contact-map iframe").forEach((iframe) => {
      iframe.title = mapTitle();
    });
  };

  applyExtraTranslations();
  document.querySelectorAll(".language-toggle").forEach((button) => {
    button.addEventListener("click", () => queueMicrotask(applyExtraTranslations));
  });
})();