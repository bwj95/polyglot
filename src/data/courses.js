// Course content for Polyglot.
// Structure: courses[nativeLang].targets[targetLang].lessons[].cards[]
// - Spanish everywhere is LATIN AMERICAN / MEXICAN Spanish
//   (ustedes not vosotros; carro, celular, computadora, jugo, chido...).
// - `native`  = word in the learner's own language (the UI language)
// - `target`  = word being learned
// - `pron`    = light pronunciation hint in the learner's own spelling intuition
//
// Adding content: append a lesson object, or add cards to an existing one.
// The quiz builds itself from the cards, so no extra wiring needed.

export const LANGS = {
  es: { flag: '🇲🇽', label: 'Español', native: 'Español (Latinoamérica)' },
  en: { flag: '🇺🇸', label: 'English', native: 'English' },
  fr: { flag: '🇫🇷', label: 'Français', native: 'Français' },
};

// UI strings per interface language (the learner's native tongue).
export const UI = {
  es: {
    tagline: 'Aprende a tu ritmo. Frases reales, sin relleno.',
    iSpeak: 'Yo hablo',
    iWantToLearn: 'Quiero aprender',
    lessons: 'Lecciones',
    cards: 'tarjetas',
    startLesson: 'Empezar',
    flashcards: 'Tarjetas',
    quiz: 'Práctica',
    flip: 'Voltear',
    prev: 'Anterior',
    next: 'Siguiente',
    back: 'Volver',
    done: '¡Terminado!',
    lessonComplete: 'Lección completada',
    score: 'Aciertos',
    review: 'Repasar',
    pickAnswer: '¿Cómo se dice…?',
    correct: '¡Correcto!',
    wrong: 'Casi. La respuesta era',
    tryAgain: 'Otra vez',
    chooseTrack: 'Elige qué quieres aprender',
    changeLang: 'Cambiar idioma',
  },
  en: {
    tagline: 'Learn at your pace. Real phrases, no filler.',
    iSpeak: 'I speak',
    iWantToLearn: 'I want to learn',
    lessons: 'Lessons',
    cards: 'cards',
    startLesson: 'Start',
    flashcards: 'Flashcards',
    quiz: 'Practice',
    flip: 'Flip',
    prev: 'Back',
    next: 'Next',
    back: 'Back',
    done: 'Done!',
    lessonComplete: 'Lesson complete',
    score: 'Score',
    review: 'Review',
    pickAnswer: 'How do you say…?',
    correct: 'Correct!',
    wrong: 'Close. The answer was',
    tryAgain: 'Again',
    chooseTrack: 'Choose what to learn',
    changeLang: 'Change language',
  },
};

export const COURSES = {
  // ---------------------------------------------------------------------------
  // SPANISH SPEAKERS  (interface in Spanish)
  // ---------------------------------------------------------------------------
  es: {
    en: {
      lessons: [
        {
          id: 'saludos',
          title: 'Saludos y básicos',
          icon: '👋',
          cards: [
            { native: 'Hola', target: 'Hello', pron: 'jé-lou' },
            { native: 'Buenos días', target: 'Good morning', pron: 'gud mór-ning' },
            { native: 'Buenas noches', target: 'Good evening', pron: 'gud ív-ning' },
            { native: '¿Cómo estás?', target: 'How are you?', pron: 'jáu ar yú' },
            { native: 'Bien, gracias', target: "I'm good, thanks", pron: 'áim gud zenks' },
            { native: 'Por favor', target: 'Please', pron: 'plís' },
            { native: 'Gracias', target: 'Thank you', pron: 'zénk yú' },
            { native: 'De nada', target: "You're welcome", pron: 'yur wél-com' },
          ],
        },
        {
          id: 'numeros',
          title: 'Números 1–10',
          icon: '🔢',
          cards: [
            { native: 'uno', target: 'one', pron: 'uán' },
            { native: 'dos', target: 'two', pron: 'tú' },
            { native: 'tres', target: 'three', pron: 'zrí' },
            { native: 'cuatro', target: 'four', pron: 'for' },
            { native: 'cinco', target: 'five', pron: 'fáiv' },
            { native: 'seis', target: 'six', pron: 'siks' },
            { native: 'siete', target: 'seven', pron: 'sé-ven' },
            { native: 'ocho', target: 'eight', pron: 'éit' },
            { native: 'nueve', target: 'nine', pron: 'náin' },
            { native: 'diez', target: 'ten', pron: 'ten' },
          ],
        },
        {
          id: 'frases',
          title: 'Frases para sobrevivir',
          icon: '💬',
          cards: [
            { native: '¿Hablas español?', target: 'Do you speak Spanish?', pron: 'du yú spík spá-nish' },
            { native: 'No entiendo', target: "I don't understand", pron: 'ái dont an-der-stánd' },
            { native: '¿Puedes repetir?', target: 'Can you repeat that?', pron: 'can yú ri-pít dat' },
            { native: '¿Dónde está el baño?', target: 'Where is the bathroom?', pron: 'wér is de báz-rum' },
            { native: '¿Cuánto cuesta?', target: 'How much is it?', pron: 'jáu moch is it' },
            { native: 'Estoy perdido', target: "I'm lost", pron: 'áim lost' },
            { native: 'Ayuda, por favor', target: 'Help, please', pron: 'jelp plís' },
          ],
        },
        {
          id: 'comida',
          title: 'En el restaurante',
          icon: '🍽️',
          cards: [
            { native: 'agua', target: 'water', pron: 'wá-ter' },
            { native: 'la cuenta', target: 'the check', pron: 'de chek' },
            { native: 'Tengo hambre', target: "I'm hungry", pron: 'áim ján-gri' },
            { native: 'Está delicioso', target: "It's delicious", pron: 'its di-lí-shus' },
            { native: 'Quisiera…', target: 'I would like…', pron: 'ái wud láik' },
            { native: 'sin picante', target: 'not spicy', pron: 'not spái-si' },
            { native: 'para llevar', target: 'to go / takeout', pron: 'tu góu' },
          ],
        },
      ],
    },
    fr: {
      lessons: [
        {
          id: 'saludos',
          title: 'Saludos y básicos',
          icon: '👋',
          cards: [
            { native: 'Hola', target: 'Bonjour', pron: 'bon-yúr' },
            { native: 'Buenas noches', target: 'Bonsoir', pron: 'bon-suár' },
            { native: '¿Cómo estás?', target: 'Comment ça va ?', pron: 'ko-mán sa vá' },
            { native: 'Bien, gracias', target: 'Ça va bien, merci', pron: 'sa va bián mer-sí' },
            { native: 'Por favor', target: "S'il vous plaît", pron: 'sil vu plé' },
            { native: 'Gracias', target: 'Merci', pron: 'mer-sí' },
            { native: 'De nada', target: 'De rien', pron: 'de rián' },
            { native: 'Adiós', target: 'Au revoir', pron: 'o re-vuár' },
          ],
        },
        {
          id: 'numeros',
          title: 'Números 1–10',
          icon: '🔢',
          cards: [
            { native: 'uno', target: 'un', pron: 'an' },
            { native: 'dos', target: 'deux', pron: 'dé' },
            { native: 'tres', target: 'trois', pron: 'truá' },
            { native: 'cuatro', target: 'quatre', pron: 'kátr' },
            { native: 'cinco', target: 'cinq', pron: 'sank' },
            { native: 'seis', target: 'six', pron: 'sis' },
            { native: 'siete', target: 'sept', pron: 'set' },
            { native: 'ocho', target: 'huit', pron: 'uít' },
            { native: 'nueve', target: 'neuf', pron: 'nef' },
            { native: 'diez', target: 'dix', pron: 'dis' },
          ],
        },
        {
          id: 'frases',
          title: 'Frases para sobrevivir',
          icon: '💬',
          cards: [
            { native: '¿Hablas español?', target: 'Parlez-vous espagnol ?', pron: 'par-lé vu es-pa-ñól' },
            { native: 'No entiendo', target: 'Je ne comprends pas', pron: 'ye ne kom-prán pá' },
            { native: '¿Puedes repetir?', target: 'Pouvez-vous répéter ?', pron: 'pu-vé vu re-pe-té' },
            { native: '¿Dónde está el baño?', target: 'Où sont les toilettes ?', pron: 'u son le tua-lét' },
            { native: '¿Cuánto cuesta?', target: "C'est combien ?", pron: 'se kom-bián' },
            { native: 'Estoy perdido', target: 'Je suis perdu', pron: 'ye suí per-dú' },
            { native: 'Ayuda, por favor', target: "À l'aide, s'il vous plaît", pron: 'a led sil vu plé' },
          ],
        },
        {
          id: 'comida',
          title: 'En el restaurante',
          icon: '🍽️',
          cards: [
            { native: 'agua', target: "de l'eau", pron: 'de ló' },
            { native: 'la cuenta', target: "l'addition", pron: 'la-di-sión' },
            { native: 'Tengo hambre', target: "J'ai faim", pron: 'ye fan' },
            { native: 'Está delicioso', target: "C'est délicieux", pron: 'se de-li-siő' },
            { native: 'Quisiera…', target: 'Je voudrais…', pron: 'ye vu-dré' },
            { native: 'la carta', target: 'le menu', pron: 'le me-nú' },
            { native: 'para llevar', target: 'à emporter', pron: 'a am-por-té' },
          ],
        },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // ENGLISH SPEAKERS  (interface in English)
  // ---------------------------------------------------------------------------
  en: {
    es: {
      // Latin American / Mexican Spanish throughout.
      note: 'Latin American (Mexican) Spanish',
      lessons: [
        {
          id: 'greetings',
          title: 'Greetings & basics',
          icon: '👋',
          cards: [
            { native: 'Hello', target: 'Hola', pron: 'ÓH-lah' },
            { native: 'Good morning', target: 'Buenos días', pron: 'BUEH-nos DEE-as' },
            { native: 'Good evening', target: 'Buenas noches', pron: 'BUEH-nas NO-ches' },
            { native: 'How are you?', target: '¿Cómo estás?', pron: 'KO-mo es-TAS' },
            { native: "What's up? (casual)", target: '¿Qué onda?', pron: 'ke ÓN-da' },
            { native: 'Good, thanks', target: 'Bien, gracias', pron: 'bien GRA-syas' },
            { native: 'Please', target: 'Por favor', pron: 'por fah-VOR' },
            { native: 'Thank you', target: 'Gracias', pron: 'GRA-syas' },
            { native: "You're welcome", target: 'De nada', pron: 'de NA-da' },
          ],
        },
        {
          id: 'numbers',
          title: 'Numbers 1–10',
          icon: '🔢',
          cards: [
            { native: 'one', target: 'uno', pron: 'OO-no' },
            { native: 'two', target: 'dos', pron: 'dos' },
            { native: 'three', target: 'tres', pron: 'tres' },
            { native: 'four', target: 'cuatro', pron: 'KUA-tro' },
            { native: 'five', target: 'cinco', pron: 'SEEN-ko' },
            { native: 'six', target: 'seis', pron: 'seys' },
            { native: 'seven', target: 'siete', pron: 'SYE-te' },
            { native: 'eight', target: 'ocho', pron: 'O-cho' },
            { native: 'nine', target: 'nueve', pron: 'NUE-ve' },
            { native: 'ten', target: 'diez', pron: 'dyes' },
          ],
        },
        {
          id: 'survival',
          title: 'Survival phrases',
          icon: '💬',
          cards: [
            { native: 'Do you speak English?', target: '¿Hablas inglés?', pron: 'AH-blas een-GLES' },
            { native: "I don't understand", target: 'No entiendo', pron: 'no en-TYEN-do' },
            { native: 'Can you repeat that?', target: '¿Puedes repetir?', pron: 'PUE-des re-pe-TEER' },
            { native: 'Where is the bathroom?', target: '¿Dónde está el baño?', pron: 'DON-de es-TA el BA-ño' },
            { native: 'How much is it?', target: '¿Cuánto cuesta?', pron: 'KUAN-to KUES-ta' },
            { native: "I'm lost", target: 'Estoy perdido', pron: 'es-TOY per-DEE-do' },
            { native: 'Cool! / Awesome! (MX)', target: '¡Qué padre!', pron: 'ke PA-dre' },
          ],
        },
        {
          id: 'restaurant',
          title: 'At the restaurant',
          icon: '🍽️',
          cards: [
            { native: 'water', target: 'agua', pron: 'AH-gua' },
            { native: 'juice', target: 'jugo', pron: 'HOO-go' },
            { native: 'the check', target: 'la cuenta', pron: 'la KUEN-ta' },
            { native: "I'm hungry", target: 'Tengo hambre', pron: 'TEN-go AM-bre' },
            { native: "It's delicious", target: 'Está delicioso', pron: 'es-TA de-li-SYO-so' },
            { native: 'I would like…', target: 'Quisiera…', pron: 'ki-SYE-ra' },
            { native: 'to go / takeout', target: 'para llevar', pron: 'PA-ra ye-VAR' },
          ],
        },
      ],
    },
    fr: {
      lessons: [
        {
          id: 'greetings',
          title: 'Greetings & basics',
          icon: '👋',
          cards: [
            { native: 'Hello', target: 'Bonjour', pron: 'bohn-ZHOOR' },
            { native: 'Good evening', target: 'Bonsoir', pron: 'bohn-SWAHR' },
            { native: 'How are you?', target: 'Comment ça va ?', pron: 'ko-MAHN sa VA' },
            { native: 'Good, thanks', target: 'Ça va bien, merci', pron: 'sa va BYAN mair-SEE' },
            { native: 'Please', target: "S'il vous plaît", pron: 'seel voo PLEH' },
            { native: 'Thank you', target: 'Merci', pron: 'mair-SEE' },
            { native: "You're welcome", target: 'De rien', pron: 'duh RYAN' },
            { native: 'Goodbye', target: 'Au revoir', pron: 'oh ruh-VWAHR' },
          ],
        },
        {
          id: 'numbers',
          title: 'Numbers 1–10',
          icon: '🔢',
          cards: [
            { native: 'one', target: 'un', pron: 'uhn' },
            { native: 'two', target: 'deux', pron: 'duh' },
            { native: 'three', target: 'trois', pron: 'twah' },
            { native: 'four', target: 'quatre', pron: 'KATR' },
            { native: 'five', target: 'cinq', pron: 'sank' },
            { native: 'six', target: 'six', pron: 'sees' },
            { native: 'seven', target: 'sept', pron: 'set' },
            { native: 'eight', target: 'huit', pron: 'weet' },
            { native: 'nine', target: 'neuf', pron: 'nuhf' },
            { native: 'ten', target: 'dix', pron: 'dees' },
          ],
        },
        {
          id: 'survival',
          title: 'Survival phrases',
          icon: '💬',
          cards: [
            { native: 'Do you speak English?', target: 'Parlez-vous anglais ?', pron: 'par-LEH voo ahn-GLEH' },
            { native: "I don't understand", target: 'Je ne comprends pas', pron: 'zhuh nuh kom-PRAHN pah' },
            { native: 'Can you repeat that?', target: 'Pouvez-vous répéter ?', pron: 'poo-VEH voo reh-peh-TEH' },
            { native: 'Where is the bathroom?', target: 'Où sont les toilettes ?', pron: 'oo sohn leh twah-LET' },
            { native: 'How much is it?', target: "C'est combien ?", pron: 'seh kom-BYAN' },
            { native: "I'm lost", target: 'Je suis perdu', pron: 'zhuh swee pair-DÜ' },
            { native: 'Help, please', target: "À l'aide, s'il vous plaît", pron: 'ah LED seel voo PLEH' },
          ],
        },
        {
          id: 'restaurant',
          title: 'At the restaurant',
          icon: '🍽️',
          cards: [
            { native: 'water', target: "de l'eau", pron: 'duh LOH' },
            { native: 'the check', target: "l'addition", pron: 'la-dee-SYON' },
            { native: "I'm hungry", target: "J'ai faim", pron: 'zhay FAN' },
            { native: "It's delicious", target: "C'est délicieux", pron: 'seh deh-lee-SYUH' },
            { native: 'I would like…', target: 'Je voudrais…', pron: 'zhuh voo-DREH' },
            { native: 'the menu', target: 'le menu', pron: 'luh muh-NÜ' },
            { native: 'to go / takeout', target: 'à emporter', pron: 'ah ahm-por-TEH' },
          ],
        },
      ],
    },
  },
};
