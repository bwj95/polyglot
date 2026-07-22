import { useState } from 'react';
import { COURSES, LANGS, UI } from './data/courses.js';
import Lesson from './components/Lesson.jsx';

// The two interface languages a learner can pick as "I speak".
const NATIVE_CHOICES = ['en', 'es'];

export default function App() {
  const [native, setNative] = useState(null); // 'en' | 'es'
  const [target, setTarget] = useState(null); // 'es' | 'fr' | 'en'
  const [lessonIdx, setLessonIdx] = useState(null);

  const t = native ? UI[native] : UI.en;

  function reset() {
    setNative(null);
    setTarget(null);
    setLessonIdx(null);
  }

  // ---- Lesson view -----------------------------------------------------------
  if (native && target && lessonIdx !== null) {
    const lesson = COURSES[native][target].lessons[lessonIdx];
    return (
      <Shell t={t} onHome={reset}>
        <Lesson
          key={lesson.id}
          lesson={lesson}
          t={t}
          targetLabel={LANGS[target].label}
          onBack={() => setLessonIdx(null)}
        />
      </Shell>
    );
  }

  // ---- Course (lesson list) view --------------------------------------------
  if (native && target) {
    const course = COURSES[native][target];
    return (
      <Shell t={t} onHome={reset}>
        <button className="link-back" onClick={() => setTarget(null)}>
          ← {t.chooseTrack}
        </button>
        <header className="course-head">
          <span className="course-flag">{LANGS[target].flag}</span>
          <div>
            <h1>{LANGS[target].label}</h1>
            {course.note && <p className="course-note">{course.note}</p>}
          </div>
        </header>
        <div className="lesson-grid">
          {course.lessons.map((lesson, i) => (
            <button key={lesson.id} className="lesson-card" onClick={() => setLessonIdx(i)}>
              <span className="lesson-icon">{lesson.icon}</span>
              <span className="lesson-title">{lesson.title}</span>
              <span className="lesson-meta">
                {lesson.cards.length} {t.cards}
              </span>
            </button>
          ))}
        </div>
      </Shell>
    );
  }

  // ---- Landing view ----------------------------------------------------------
  return (
    <Shell t={t} onHome={reset}>
      <section className="hero">
        <h1 className="wordmark">
          Poly<span>glot</span>
        </h1>
        <p className="tagline">{t.tagline}</p>
      </section>

      <section className="picker">
        <p className="picker-label">{t.iSpeak}</p>
        <div className="chip-row">
          {NATIVE_CHOICES.map((lang) => (
            <button
              key={lang}
              className={`chip ${native === lang ? 'chip--on' : ''}`}
              onClick={() => {
                setNative(lang);
                setTarget(null);
              }}
            >
              <span className="chip-flag">{LANGS[lang].flag}</span>
              {LANGS[lang].native}
            </button>
          ))}
        </div>

        {native && (
          <div className="targets">
            <p className="picker-label">{UI[native].iWantToLearn}</p>
            <div className="track-row">
              {Object.keys(COURSES[native]).map((lang) => (
                <button key={lang} className="track" onClick={() => setTarget(lang)}>
                  <span className="track-flag">{LANGS[lang].flag}</span>
                  <span className="track-name">{LANGS[lang].label}</span>
                  <span className="track-count">
                    {COURSES[native][lang].lessons.length} {UI[native].lessons.toLowerCase()}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </Shell>
  );
}

function Shell({ t, onHome, children }) {
  return (
    <div className="app">
      <div className="glow glow-a" />
      <div className="glow glow-b" />
      <nav className="topbar">
        <button className="brand" onClick={onHome}>
          🗣️ Polyglot
        </button>
      </nav>
      <main className="content">{children}</main>
      <footer className="foot">Made for real conversations · {t.tagline}</footer>
    </div>
  );
}
