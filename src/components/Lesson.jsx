import { useMemo, useState } from 'react';

// Fisher–Yates shuffle, returns a new array.
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Lesson({ lesson, t, targetLabel, onBack }) {
  const [mode, setMode] = useState('cards'); // 'cards' | 'quiz'

  return (
    <div>
      <button className="link-back" onClick={onBack}>
        ← {t.back}
      </button>
      <header className="course-head">
        <span className="course-flag">{lesson.icon}</span>
        <div>
          <h1>{lesson.title}</h1>
          <p className="course-note">{targetLabel}</p>
        </div>
      </header>

      <div className="mode-toggle">
        <button
          className={mode === 'cards' ? 'mode--on' : ''}
          onClick={() => setMode('cards')}
        >
          {t.flashcards}
        </button>
        <button
          className={mode === 'quiz' ? 'mode--on' : ''}
          onClick={() => setMode('quiz')}
        >
          {t.quiz}
        </button>
      </div>

      {mode === 'cards' ? (
        <Flashcards cards={lesson.cards} t={t} />
      ) : (
        <Quiz cards={lesson.cards} t={t} />
      )}
    </div>
  );
}

function Flashcards({ cards, t }) {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = cards[i];

  function go(delta) {
    setFlipped(false);
    setI((prev) => (prev + delta + cards.length) % cards.length);
  }

  return (
    <div className="stack">
      <ProgressBar value={i + 1} max={cards.length} />
      <button
        className={`flashcard ${flipped ? 'is-flipped' : ''}`}
        onClick={() => setFlipped((f) => !f)}
        aria-label={t.flip}
      >
        <div className="flashcard-inner">
          <div className="face face-front">
            <span className="face-tag">{i + 1} / {cards.length}</span>
            <span className="face-word">{card.native}</span>
            <span className="face-hint">{t.flip} ↺</span>
          </div>
          <div className="face face-back">
            <span className="face-word">{card.target}</span>
            {card.pron && <span className="face-pron">[{card.pron}]</span>}
          </div>
        </div>
      </button>
      <div className="card-nav">
        <button className="btn" onClick={() => go(-1)}>
          ← {t.prev}
        </button>
        <button className="btn btn--primary" onClick={() => go(1)}>
          {t.next} →
        </button>
      </div>
    </div>
  );
}

function Quiz({ cards, t }) {
  // Build a fresh, shuffled run of questions with 4 options each.
  const questions = useMemo(() => {
    return shuffle(cards).map((card) => {
      const distractors = shuffle(cards.filter((c) => c.target !== card.target))
        .slice(0, 3)
        .map((c) => c.target);
      return { prompt: card.native, answer: card.target, options: shuffle([card.target, ...distractors]) };
    });
  }, [cards]);

  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[qi];

  function choose(opt) {
    if (picked) return;
    setPicked(opt);
    if (opt === q.answer) setScore((s) => s + 1);
  }

  function next() {
    if (qi + 1 >= questions.length) {
      setFinished(true);
    } else {
      setQi((n) => n + 1);
      setPicked(null);
    }
  }

  function restart() {
    setQi(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="result">
        <div className="result-ring" style={{ '--pct': pct }}>
          <span>{pct}%</span>
        </div>
        <h2>{t.lessonComplete}</h2>
        <p className="result-score">
          {t.score}: {score} / {questions.length}
        </p>
        <button className="btn btn--primary" onClick={restart}>
          {t.review}
        </button>
      </div>
    );
  }

  return (
    <div className="stack">
      <ProgressBar value={qi + 1} max={questions.length} />
      <div className="quiz-prompt">
        <span className="quiz-ask">{t.pickAnswer}</span>
        <span className="quiz-word">{q.prompt}</span>
      </div>
      <div className="options">
        {q.options.map((opt) => {
          let cls = 'option';
          if (picked) {
            if (opt === q.answer) cls += ' option--correct';
            else if (opt === picked) cls += ' option--wrong';
            else cls += ' option--dim';
          }
          return (
            <button key={opt} className={cls} onClick={() => choose(opt)} disabled={!!picked}>
              {opt}
            </button>
          );
        })}
      </div>
      {picked && (
        <div className={`feedback ${picked === q.answer ? 'ok' : 'no'}`}>
          <span>
            {picked === q.answer ? t.correct : `${t.wrong} “${q.answer}”`}
          </span>
          <button className="btn btn--primary" onClick={next}>
            {qi + 1 >= questions.length ? t.done : `${t.next} →`}
          </button>
        </div>
      )}
    </div>
  );
}

function ProgressBar({ value, max }) {
  return (
    <div className="progress">
      <div className="progress-fill" style={{ width: `${(value / max) * 100}%` }} />
    </div>
  );
}
