(() => {
  const translations = {
    "Dati legali":"Legal details","Sede legale · Corso Roma 32":"Registered office · Corso Roma 32","Vai al contenuto":"Skip to content","Apri menu":"Open menu","Navigazione principale":"Main navigation","Chi siamo":"About us","Galleria":"Gallery","Recensioni":"Reviews","Contatti":"Contact","Prenota":"Book","Prenota un tavolo":"Book a table","Osteria Contemporanea":"Contemporary Osteria","Seguici":"Follow us",
    "Radici":"Roots","Presente":"Present","La tradizione":"Tradition","non sta ferma.":"never stands still.","La Puglia di Danilo Doria: sapori onesti, cucina a vista e piatti che ricordano da dove veniamo.":"Danilo Doria’s Puglia: honest flavours, an open kitchen and dishes that remember where we come from.","Scopri il menu":"Discover the menu","su 10 · TheFork":"out of 10 · TheFork","22 recensioni":"22 reviews","Centro storico":"Historic centre","Cucina a vista":"Open kitchen","Materia locale":"Local ingredients","Tradizione del Sud":"Southern tradition","Gesto contemporaneo":"Contemporary touch",
    "Un ritorno che":"A homecoming that","diventa cucina":"becomes cuisine","Dopo l’esperienza a Londra, Danilo torna in Puglia. Non per ripetere la tradizione, ma per rimetterla al centro: fave e cicoria, cozze, lampascioni e pasta diventano un racconto attuale, leggibile, generoso.":"After his experience in London, Danilo returns to Puglia. Not to repeat tradition, but to place it back at the centre: fava beans and chicory, mussels, lampascioni and pasta become a current, clear and generous story.","Entra nella storia":"Read our story","Il menu · estate 2026":"The menu · summer 2026","Piatti con una memoria.":"Dishes with a memory.","E qualcosa da raccontare.":"And something to tell.","Menu pubblicato il":"Menu published on","Le proposte possono cambiare secondo mercato e stagione.":"Dishes may change with the market and the season.","Guarda tutto il menu":"View the full menu",
    "Non solo cena":"More than dinner","Dentro la cucina,":"Inside the kitchen,","al centro della sala.":"at the heart of the dining room.","Il pass, i gesti e il ritmo del servizio diventano parte della serata.":"The pass, the gestures and the rhythm of service become part of the evening.","Mare e campagna":"Sea and countryside","Il porto di Brindisi incontra masserie, orti e ricette familiari.":"Brindisi’s harbour meets farmhouses, gardens and family recipes.","Tavola intima":"An intimate table","Un ambiente curato, raccolto e informale nel centro della città.":"A thoughtful, intimate and informal setting in the city centre.","Il mare Adriatico, portato a tavola.":"The Adriatic Sea, brought to the table.","Valutazione attuale":"Current rating","/10 su TheFork · 22 recensioni":"/10 on TheFork · 22 reviews","Dati verificati a luglio 2026":"Data verified in July 2026","Dicono di noi":"What guests say","Tutte le recensioni":"All reviews","Nel cuore di Brindisi":"In the heart of Brindisi","Ci vediamo":"See you","a Corso Roma.":"on Corso Roma.","Prenota ora":"Book now","Indicazioni stradali":"Directions",
    "Il menu":"The menu","Tradizione pugliese, mare Adriatico e cucina contemporanea. Prezzo medio indicativo 25 €.":"Puglian tradition, the Adriatic Sea and contemporary cuisine. Indicative average price: €25.","Categorie del menu":"Menu categories","Materia, stagione, memoria.":"Ingredients, season, memory.","La carta segue il mercato e il ritmo della cucina. Chiedi sempre le proposte disponibili al tavolo.":"The menu follows the market and the rhythm of the kitchen. Always ask which dishes are available.","firma":"signature","Trasparenza:":"Transparency:","menu e prezzi ripresi dalla scheda TheFork del ristorante, ultimo aggiornamento dichiarato 12 giugno 2026. Disponibilità e composizione possono variare.":"menu and prices sourced from the restaurant’s TheFork listing, last declared update 12 June 2026. Availability and composition may vary.","Verifica il menu alla fonte":"Check the source menu","Comunica allergie e intolleranze prima dell’ordine. Il personale può fornire il registro allergeni e indicare eventuali variazioni.":"Tell us about allergies and intolerances before ordering. Staff can provide the allergen register and explain any changes.",
    "Antipasti":"Starters","Primi piatti":"First courses","Secondi piatti":"Main courses","Dolci di nostra produzione":"House-made desserts","Radici pugliesi, materia viva e contrasti misurati.":"Puglian roots, vibrant ingredients and measured contrasts.","Pasta, mare e campagna si incontrano senza perdere riconoscibilità.":"Pasta, sea and countryside meet without losing their identity.","Brace, pescato e carni del territorio.":"Charcoal cooking, local catch and regional meats.","Finali essenziali, preparati in casa.":"Essential endings, made in-house.",
    "L’antipasto dell’osteria":"The osteria starter","Percorso in cinque portate.":"A five-course journey.","Cozze alla brindisina":"Brindisi-style mussels","Un classico della città nella lettura dell’Atelier.":"A city classic, interpreted by Atelier.","Melanzana affumicata":"Smoked aubergine","Pomodoro, mandorla e ricotta forte.":"Tomato, almond and strong ricotta.","Polpette al sugo della nonna":"Grandmother’s meatballs in tomato sauce","Memoria domestica, cottura lenta.":"Homestyle memories, slow cooked.","Frisa":"Frisa bread","Burrata di Pezzaviva, gambero rosso e capocollo di Martina Franca.":"Pezzaviva burrata, red prawn and Martina Franca capocollo.","Fave e cicoria":"Fava beans and chicory","Pane alle erbe e alici.":"Herb bread and anchovies.",
    "Paccheri all’osteria":"Osteria paccheri","Salsiccia nostrana marinata, guanciale e fonduta di pecorino.":"Marinated local sausage, guanciale and pecorino fondue.","Risotto patate e cozze":"Potato and mussel risotto","Disponibile per minimo due persone.":"Available for a minimum of two people.","Raviolo di burrata":"Burrata raviolo","Pomodoro infornato, melanzana fumè e basilico.":"Roasted tomato, smoked aubergine and basil.","Tagliolino cacio e pepe":"Cacio e pepe tagliolino","Gambero rosso e lime.":"Red prawn and lime.","Spaghettone aglio e olio alla mugnaia":"Miller-style garlic and oil spaghettone","Con triglia.":"With red mullet.","Tubetti, seppia e piselli":"Tubetti pasta, cuttlefish and peas","Un incontro diretto tra orto e Adriatico.":"A direct meeting of garden and Adriatic Sea.",
    "Maialino":"Suckling pig","Fave e verdure di campo.":"Fava beans and wild greens.","Agnello":"Lamb","Lampascioni e pecorino.":"Lampascioni and pecorino.","Bombette pugliesi":"Puglian bombette","Patate al rosmarino, peperoni arrosto, canestrato e miele d’Otranto.":"Rosemary potatoes, roasted peppers, canestrato cheese and Otranto honey.","Merluzzo":"Cod","Colatura di provola, melanzana e pomodoro vanigliato.":"Provola sauce, aubergine and vanilla tomato.","Gallinella":"Red gurnard","Ciambotta pugliese.":"Puglian ciambotta.","Grigliata del porto alla brace":"Charcoal-grilled harbour selection","Selezione di mare secondo disponibilità.":"Seafood selection according to availability.","Fritto fresco di mare":"Fresh seafood fry","Pescato e frittura espressa.":"Fresh catch, fried to order.",
    "Piccola pasticceria":"Petit fours","Assortimento dell’Atelier.":"Atelier selection.","Tiramisù":"Tiramisu","Il classico della casa.":"The house classic.","Preparazione artigianale.":"Handcrafted in-house.","Mandorla":"Almond","Omaggio alla Puglia.":"A tribute to Puglia.","Babà":"Rum baba","Lievitato e bagna aromatica.":"Leavened pastry with aromatic syrup.","Cioccolato":"Chocolate","Cremoso e gelato alla vaniglia.":"Chocolate crémeux and vanilla ice cream.",
    "Vieni a trovarci":"Come and visit","Nel centro di Brindisi, tra la sala e la cucina a vista.":"In central Brindisi, between the dining room and the open kitchen.","Passa, chiama":"Drop by, call","o scrivici.":"or write to us.","Pranzo e cena":"Lunch and dinner","Disponibilità aggiornata in fase di prenotazione":"Availability confirmed when booking","Asporto":"Takeaway","Verificare telefonicamente":"Please check by phone","Messaggi":"Messages","Scrivici":"Write to us","Messaggio ricevuto.":"Message received.","Nome *":"Name *","Messaggio *":"Message *","Invia richiesta":"Send request","Apri Corso Roma 32 su Google Maps":"Open Corso Roma 32 in Google Maps","Apri le indicazioni":"Get directions",
    "La storia":"Our story","Partire. Imparare. Tornare.":"Leave. Learn. Return.","Una cucina che sa da dove viene":"A cuisine that knows where it comes from","Danilo Doria porta nel suo Atelier l’esperienza maturata a Londra e il desiderio di ritrovare la Puglia. Il risultato è una cucina che non copia la tradizione: la ascolta, ne conserva l’anima e le dà una forma nuova.":"Danilo Doria brings to his Atelier the experience gained in London and the desire to rediscover Puglia. The result is a cuisine that does not copy tradition: it listens to it, preserves its soul and gives it a new form.","La cucina a vista rende ogni gesto parte dell’esperienza. Ingredienti locali, stagionalità e accoglienza definiscono una tavola intima, gioviale, curata.":"The open kitchen makes every gesture part of the experience. Local ingredients, seasonality and hospitality define an intimate, convivial and thoughtful table.","La filosofia":"The philosophy","Riconoscere un sapore.":"Recognise a flavour.","Scoprirlo di nuovo.":"Discover it again.",
    "La tua tavola":"Your table","Tre passaggi: compila, apri WhatsApp, attendi la conferma del ristorante.":"Three steps: fill in the form, open WhatsApp and wait for the restaurant’s confirmation.","Scegli":"Choose","Invia":"Send","Ricevi conferma":"Get confirmation","Nome e cognome *":"Full name *","Telefono":"Phone","Data *":"Date *","Ora *":"Time *","Persone *":"Guests *","Note o allergie":"Notes or allergies","Segnala qui allergie, intolleranze o esigenze particolari":"Tell us about allergies, intolerances or special requirements","Invia richiesta su WhatsApp":"Send request via WhatsApp","Informazioni":"Information","Prima di prenotare":"Before booking","La richiesta non equivale a una conferma. Attendi la risposta del ristorante.":"A request is not a confirmation. Please wait for the restaurant’s reply.","Disponibilità":"Availability","Per gruppi numerosi o cene private, indica il numero di ospiti e il tipo di occasione nelle note.":"For large groups or private dinners, include the number of guests and type of occasion in the notes.",
    "Occasioni speciali":"Special occasions","Eventi e cene private":"Events and private dinners","Menu su misura, degustazioni e tavole raccolte nel cuore di Brindisi.":"Bespoke menus, tastings and intimate tables in the heart of Brindisi.","Costruiamo insieme la tua esperienza":"Let’s create your experience together","Raccontaci data, numero di ospiti e idea dell’evento.":"Tell us the date, number of guests and your idea for the event.","Contattaci":"Contact us","Dentro l’Atelier":"Inside the Atelier","Atmosfera · immagine editoriale":"Atmosphere · editorial image","Mare · immagine editoriale":"Sea · editorial image","Esperienze verificate":"Verified experiences","Le vostre parole":"Your words","Le recensioni sono estratti sintetici collegati alla piattaforma originale.":"Reviews are concise excerpts linked to the original platform.","Leggi su TheFork":"Read on TheFork","Pagina non trovata":"Page not found","Questa pagina non è in menu.":"This page is not on the menu.","Torna alla home":"Return home","La cucina si è fermata un momento.":"The kitchen has paused for a moment.","Torna all’inizio":"Back to top",
    "Cura millimetrica nei dettagli, materie prime freschissime e gentilezza del personale: un posto da provare e riprovare.":"Meticulous attention to detail, exceptionally fresh ingredients and kind staff: a place worth returning to again and again.",
    "Locale raffinato e bella atmosfera. Frisa, tagliolino cacio e pepe e grigliata di pesce: tutto perfetto.":"A refined restaurant with a lovely atmosphere. Frisa, cacio e pepe tagliolino and grilled fish: everything was perfect.",
    "Location contemporanea e raffinata, cucina a vista e un percorso curato dall’antipasto al dolce.":"A contemporary, refined setting with an open kitchen and a carefully crafted experience from starter to dessert.",
    "Pietanze gustose e ricercate, tra mare e terra. La cucina a vista rende gli ospiti partecipi del lavoro dello chef.":"Flavourful, sophisticated dishes spanning sea and land. The open kitchen lets guests share in the chef’s work.",
    "luglio 2026":"July 2026","novembre 2025":"November 2025","gennaio 2025":"January 2025",
    "La storia di Atelier Doria":"The story of Atelier Doria",
    "Dove la convivialità":"Where conviviality",
    "torna ad essere protagonista":"takes centre stage again",
    "La nostra storia":"Our story",
    "Atelier Doria nasce dal desiderio di custodire e raccontare una cucina fatta di memoria, territorio e autenticità.":"Atelier Doria was born from the desire to preserve and tell the story of a cuisine shaped by memory, place and authenticity.",
    "È un luogo che affonda le proprie radici nei ricordi più semplici: il profumo del pane appena sfornato, il pranzo della domenica, le ricette tramandate dai nonni, la tavola come punto d’incontro e di condivisione.":"It is a place rooted in the simplest memories: the aroma of freshly baked bread, Sunday lunch, recipes passed down by grandparents, and the table as a place to meet and share.",
    "Abbiamo scelto di valorizzare i sapori di una volta, le eccellenze del nostro territorio e il lavoro di chi, ogni giorno, produce con passione e rispetto per la terra.":"We choose to celebrate the flavours of the past, the excellence of our land and the work of those who produce every day with passion and respect for the soil.",
    "La nostra idea di cucina non vuole inseguire le mode, ma interpretare la tradizione con uno sguardo contemporaneo. Ogni piatto nasce dall’equilibrio tra memoria e ricerca, tra tecnica e semplicità, mantenendo sempre riconoscibili i sapori che fanno parte della nostra identità.":"Our cuisine does not chase trends; it interprets tradition through a contemporary lens. Every dish balances memory and exploration, technique and simplicity, while keeping the flavours of our identity recognisable.",
    "Per noi l’ospitalità è parte integrante dell’esperienza. Vogliamo che ogni ospite si senta accolto come a casa, in un ambiente dove il tempo rallenta e il piacere della convivialità torna a essere protagonista.":"Hospitality is an essential part of the experience. We want every guest to feel at home, in a place where time slows down and the pleasure of conviviality takes centre stage again.",
    "Atelier Doria è il nostro modo di raccontare la Puglia: attraverso ingredienti autentici, gesti sinceri e una cucina che guarda al futuro senza dimenticare le proprie radici.":"Atelier Doria is our way of telling the story of Puglia: through authentic ingredients, sincere gestures and a cuisine that looks to the future without forgetting its roots.",
    "Atelier Doria in immagini":"Atelier Doria in pictures",
    "Interni · la sala":"Interiors · the dining room",
    "Piatti · la materia":"Dishes · the ingredients",
    "La nostra cucina":"Our cuisine",
    "Tradizione,":"Tradition,",
    "con uno sguardo contemporaneo":"through a contemporary lens",
    "Invece di inseguire le mode, attingiamo alla ricca tradizione pugliese per creare le nostre ricette.":"Rather than chasing trends, we draw on Puglia’s rich tradition to create our recipes.",
    "Una cucina che guarda al presente senza perdere il legame con le proprie origini. Essenziale nelle forme, precisa nei sapori, pensata per emozionare attraverso la semplicità.":"A cuisine that looks to the present without losing touch with its origins. Essential in form, precise in flavour, designed to move through simplicity.",
    "I nostri prodotti":"Our produce",
    "Ogni ingrediente":"Every ingredient",
    "racconta una scelta":"reflects a choice",
    "Selezioniamo prodotti di stagione, raccolti nel momento migliore, verdure del contadino, pescato del giorno, carni provenienti da allevamenti allo stato brado e materie prime che esprimono il carattere del nostro territorio.":"We select seasonal produce harvested at its best, vegetables from local growers, the catch of the day, meat from free-range farms and ingredients that express the character of our land.",
    "Dall’olio extravergine di oliva biologico prodotto nelle nostre terre ai formaggi delle masserie locali, fino alla pasta Felicetti e al riso Riserva San Massimo, ogni elemento viene scelto per una ragione precisa: offrire qualità, identità e rispetto per ciò che portiamo in tavola.":"From organic extra-virgin olive oil produced on our land to cheeses from local masserie, Felicetti pasta and Riserva San Massimo rice, every element is chosen for a precise reason: to offer quality, identity and respect for what we serve.",
    "Chef Patron":"Chef Patron",
    "Chef · ritratto da sostituire con lo scatto ufficiale":"Chef · replace with the official portrait",
    "“Atelier” non è stato scelto a caso. Richiama il luogo in cui le idee prendono forma, dove ogni dettaglio viene curato con pazienza e ogni piatto nasce da un lavoro artigianale fatto di studio, ricerca e rispetto della materia prima.":"“Atelier” was not chosen by chance. It evokes a place where ideas take shape, where every detail is patiently refined and every dish grows from craftsmanship, study, research and respect for the ingredients.",
    "La nostra cantina":"Our wine cellar",
    "Piccoli produttori,":"Small producers,",
    "grandi vini":"great wines",
    "La Puglia è terra di grandi vini e di antiche tradizioni vitivinicole. Da questa consapevolezza nasce una cantina che rende omaggio al nostro territorio, affiancando alle etichette dei piccoli produttori pugliesi una selezione di grandi vini italiani e internazionali.":"Puglia is a land of great wines and ancient winemaking traditions. This awareness shapes a cellar that pays tribute to our territory, pairing labels from small Puglian producers with a selection of great Italian and international wines.",
    "Scopri gli ambienti e la cantina":"Discover the spaces and cellar",
    "Vini":"Wines",
    "Territorio":"Territory",
    "Archivio fotografico":"Photo archive",
    "Interni, esterni, cucina,":"Interiors, exteriors, kitchen,",
    "chef, vini e piatti.":"chef, wines and dishes.",
    "Vai alla galleria":"View the gallery",
    "Dentro Atelier Doria":"Inside Atelier Doria",
    "Una cucina da vivere,":"A cuisine to experience,",
    "prima ancora di assaggiarla.":"before you even taste it.",
    "Interni, esterni, cucina a vista, chef, vini e piatti: ogni immagine racconta una parte dell’esperienza.":"Interiors, exteriors, the open kitchen, chef, wines and dishes: every image tells part of the experience.",
    "Esplora la galleria":"Explore the gallery"
  };

  const titleTranslations = {
    "Atelier Doria | Osteria contemporanea a Brindisi":"Atelier Doria | Contemporary Osteria in Brindisi",
    "Menu 2026 | Atelier Doria Brindisi":"2026 Menu | Atelier Doria Brindisi",
    "Contatti | Atelier Doria Brindisi":"Contact | Atelier Doria Brindisi",
    "Chi siamo | Atelier Doria":"About us | Atelier Doria",
    "La storia | Atelier Doria":"Our story | Atelier Doria",
    "Prenotazioni | Atelier Doria":"Bookings | Atelier Doria",
    "Eventi e cene private | Atelier Doria":"Events and private dinners | Atelier Doria",
    "Galleria | Atelier Doria":"Gallery | Atelier Doria",
    "Recensioni | Atelier Doria Brindisi":"Reviews | Atelier Doria Brindisi",
    "Pagina non trovata | Atelier Doria":"Page not found | Atelier Doria",
    "Errore | Atelier Doria":"Error | Atelier Doria"
  };
  const originalText = new WeakMap();
  const originalAttrs = new WeakMap();
  const translateText = (value) => {
    const clean = value.trim();
    if (translations[clean]) return value.replace(clean, translations[clean]);
    return value
      .replace(/^Aggiornato il /, "Updated on ")
      .replace(/ recensioni · luglio 2026$/, " reviews · July 2026")
      .replace(/^Chiama /, "Call ");
  };
  const applyLanguage = (language) => {
    document.documentElement.lang = language;
    document.querySelectorAll("[data-i18n-it][data-i18n-en]").forEach((element) => {
      element.textContent = element.dataset[`i18n${language === "en" ? "En" : "It"}`];
    });
    document.querySelectorAll("body *:not(script):not(style)").forEach((element) => {
      if (element.matches("[data-i18n-it][data-i18n-en]")) return;
      element.childNodes.forEach((node) => {
        if (node.nodeType !== Node.TEXT_NODE || !node.textContent.trim()) return;
        if (!originalText.has(node)) originalText.set(node, node.textContent);
        node.textContent = language === "en" ? translateText(originalText.get(node)) : originalText.get(node);
      });
      ["aria-label", "title", "placeholder"].forEach((attribute) => {
        if (!element.hasAttribute(attribute)) return;
        if (!originalAttrs.has(element)) originalAttrs.set(element, {});
        const stored = originalAttrs.get(element);
        if (!(attribute in stored)) stored[attribute] = element.getAttribute(attribute);
        element.setAttribute(attribute, language === "en" ? translateText(stored[attribute]) : stored[attribute]);
      });
    });
    const originalTitle = document.documentElement.dataset.originalTitle || document.title;
    document.documentElement.dataset.originalTitle = originalTitle;
    document.title = language === "en" ? (titleTranslations[originalTitle] || originalTitle) : originalTitle;
    document.querySelectorAll(".language-flag").forEach((el) => el.textContent = language === "en" ? "🇮🇹" : "🇬🇧");
    document.querySelectorAll(".language-label").forEach((el) => el.textContent = language === "en" ? "Italiano" : "English");
    document.querySelectorAll(".language-toggle").forEach((button) => {
      button.setAttribute("aria-label", language === "en" ? "Passa all’italiano" : "Switch to English");
      button.setAttribute("title", language === "en" ? "Passa all’italiano" : "Switch to English");
    });
    localStorage.setItem("atelier-language", language);
  };
  const preferred = localStorage.getItem("atelier-language") || "it";
  applyLanguage(preferred);
  document.querySelectorAll(".language-toggle").forEach((button) => button.addEventListener("click", () => {
    applyLanguage(document.documentElement.lang === "it" ? "en" : "it");
  }));
  window.atelierLanguage = () => document.documentElement.lang;
})();
