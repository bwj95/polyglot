# Polyglot 🗣️

A quick, stylish language-learning site. React 19 + Vite 8, no other runtime deps.

## Tracks

Interface adapts to the language you speak.

| I speak | I can learn |
|---------|-------------|
| **English** | Spanish *(Latin American / Mexican)*, French |
| **Español** | English, French |

Spanish content is deliberately **Mexican / Latin American** — `ustedes` over `vosotros`,
and vocab like *carro, celular, jugo, ¿qué onda?, ¡qué padre!*.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # serve the built dist/
```

## How it's built

- `src/data/courses.js` — **all the content**. One object, keyed `native → target → lessons → cards`.
  Each card is `{ native, target, pron }`. Add a lesson or a card and it just shows up.
- `src/App.jsx` — three views: pick language → lesson list → lesson. No router, plain state.
- `src/components/Lesson.jsx` — flip flashcards + an auto-generated multiple-choice quiz
  (distractors are pulled from the other cards in the same lesson).
- `src/styles.css` — the whole look. Dark, glassy, gradient accents.

## Add a language or lesson

Everything lives in `courses.js`:

- **New lesson:** append `{ id, title, icon, cards: [...] }` under the right `native → target`.
- **New target language:** add its key under a native language, plus a `LANGS` entry and (if new)
  a `UI` string block for that interface language.

No component changes needed — the quiz and lists build themselves from the data.
