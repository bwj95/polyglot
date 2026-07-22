import { useState, useMemo } from 'react';
import { COURSES, LANGS, UI } from './data/courses.js';
import Lesson from './components/Lesson.jsx';

// The two interface languages a learner can pick as "I speak".
const NATIVE_CHOICES = ['en', 'es'];

// Helper to copy text to clipboard.
function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  } else {
    const el = document.createElement('textarea');
    el.value = text;
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(el);
      return Promise.resolve();
    } catch (err) {
      document.body.removeChild(el);
      return Promise.reject(err);
    }
  }
}

// Helper to speak a phrase using the Web Speech Synthesis API.
function speak(text, langCode) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  
  if (langCode === 'es') {
    utterance.lang = 'es-MX'; // Mexican Spanish (as specified in constraints)
  } else if (langCode === 'fr') {
    utterance.lang = 'fr-FR';
  } else if (langCode === 'en') {
    utterance.lang = 'en-US';
  }
  
  // Try to find a voice that matches
  const voices = window.speechSynthesis.getVoices();
  const matchingVoice = voices.find(voice => 
    voice.lang.toLowerCase().replace('_', '-') === utterance.lang.toLowerCase()
  );
  if (matchingVoice) {
    utterance.voice = matchingVoice;
  }
  
  window.speechSynthesis.speak(utterance);
}

export default function App() {
  const [native, setNative] = useState(null); // 'en' | 'es'
  const [target, setTarget] = useState(null); // 'es' | 'fr' | 'en'
  const [view, setView] = useState('directory'); // 'directory' | 'practice'
  const [activeCategory, setActiveCategory] = useState('all'); // category ID
  const [searchQuery, setSearchQuery] = useState('');
  const [showPhonetics, setShowPhonetics] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // Local storage for starred phrases
  const [starredIds, setStarredIds] = useState(() => {
    try {
      const saved = localStorage.getItem('polyglot_starred_phrases');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleStar = (id) => {
    setStarredIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try {
        localStorage.setItem('polyglot_starred_phrases', JSON.stringify(next));
      } catch (e) {
        console.error('Error writing starred phrases to localstorage', e);
      }
      return next;
    });
  };

  const t = native ? UI[native] : UI.en;

  function reset() {
    setNative(null);
    setTarget(null);
    setView('directory');
    setActiveCategory('all');
    setSearchQuery('');
  }

  // Generate list of all phrases for search and display
  const allPhrases = useMemo(() => {
    if (!native || !target || !COURSES[native] || !COURSES[native][target]) return [];
    
    const lessons = COURSES[native][target].lessons;
    return lessons.flatMap(lesson => 
      lesson.cards.map(card => ({
        ...card,
        categoryId: lesson.id,
        categoryTitle: lesson.title,
        icon: lesson.icon
      }))
    );
  }, [native, target]);

  // Filter phrases based on current filters
  const filteredPhrases = useMemo(() => {
    return allPhrases.filter(phrase => {
      const matchesCategory = activeCategory === 'all' 
        ? true 
        : activeCategory === 'starred'
          ? starredIds.includes(phrase.id)
          : phrase.categoryId === activeCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        phrase.native.toLowerCase().includes(q) ||
        phrase.target.toLowerCase().includes(q)
      );
    });
  }, [allPhrases, activeCategory, searchQuery, starredIds]);

  // ---- Practice view trigger ------------------------------------------------
  const handleStartPractice = (category) => {
    setActiveCategory(category);
    setView('practice');
  };

  if (native && target && view === 'practice') {
    const course = COURSES[native][target];
    const categoryLessons = course.lessons;

    // Build the virtual lesson for Practice mode
    let practiceCards = [];
    let practiceTitle = '';
    let practiceIcon = '📚';

    if (activeCategory === 'all') {
      practiceCards = allPhrases;
      practiceTitle = t.categoryAll;
      practiceIcon = '📚';
    } else if (activeCategory === 'starred') {
      practiceCards = allPhrases.filter(p => starredIds.includes(p.id));
      practiceTitle = t.categoryStarred;
      practiceIcon = '⭐';
    } else {
      const matchLesson = categoryLessons.find(l => l.id === activeCategory);
      practiceCards = matchLesson ? matchLesson.cards : [];
      practiceTitle = matchLesson ? matchLesson.title : '';
      practiceIcon = matchLesson ? matchLesson.icon : '💬';
    }

    const practiceLesson = {
      id: activeCategory,
      title: practiceTitle,
      icon: practiceIcon,
      cards: practiceCards
    };

    return (
      <Shell t={t} onHome={reset} currentTrack={{ native, target }}>
        <Lesson
          key={activeCategory}
          lesson={practiceLesson}
          t={t}
          targetLabel={LANGS[target].label}
          target={target}
          onBack={() => setView('directory')}
        />
      </Shell>
    );
  }

  // ---- Course (Directory) view ----------------------------------------------
  if (native && target) {
    const course = COURSES[native][target];
    const categories = [
      { id: 'all', title: t.categoryAll, icon: '📚' },
      ...course.lessons.map(l => ({ id: l.id, title: l.title, icon: l.icon })),
      { id: 'starred', title: `${t.categoryStarred} (${starredIds.length})`, icon: '⭐' }
    ];

    return (
      <Shell t={t} onHome={reset} currentTrack={{ native, target }}>
        <div className="directory-header">
          <div className="directory-back-row">
            <button className="link-back" onClick={() => setTarget(null)}>
              ← {t.chooseTrack}
            </button>
            
            <div className="global-toggles">
              <button 
                className={`toggle-phonetics-btn ${showPhonetics ? 'active' : ''}`}
                onClick={() => setShowPhonetics(!showPhonetics)}
              >
                👁️ {showPhonetics ? t.hidePhonetics : t.showPhonetics}
              </button>
            </div>
          </div>
          
          <div className="course-profile">
            <span className="course-flags">
              <span className="native-flag-bubble">{LANGS[native].flag}</span>
              <span className="arrow-between">➔</span>
              <span className="target-flag-bubble">{LANGS[target].flag}</span>
            </span>
            <div className="course-text">
              <h1>{LANGS[target].label}</h1>
              {course.note ? (
                <p className="course-note">{course.note}</p>
              ) : (
                <p className="course-note">{t.tagline}</p>
              )}
            </div>
          </div>
        </div>

        {/* View Selection (Directory vs Practice Lab) */}
        <div className="view-selector">
          <button 
            className={`view-tab ${view === 'directory' ? 'active' : ''}`}
            onClick={() => setView('directory')}
          >
            📖 {t.directoryMode}
          </button>
          <button 
            className="view-tab"
            onClick={() => {
              // Set default practice category based on active filter, or 'all' if empty
              const count = activeCategory === 'starred' 
                ? starredIds.length 
                : activeCategory === 'all'
                  ? allPhrases.length
                  : (course.lessons.find(l => l.id === activeCategory)?.cards.length || 0);
              
              if (count > 0) {
                setView('practice');
              } else {
                handleStartPractice('all');
              }
            }}
          >
            ⚡ {t.practiceMode}
          </button>
        </div>

        <div className="directory-layout">
          {/* Categories Sidebar / Collapsible List */}
          <aside className="sidebar">
            <button 
              className="category-list-trigger"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span>{categories.find(c => c.id === activeCategory)?.icon || '📂'}</span>
              <strong>{categories.find(c => c.id === activeCategory)?.title.split(' (')[0]}</strong>
              <span className="trigger-arrow">{menuOpen ? '▲' : '▼'}</span>
            </button>

            <div className={`category-list-container ${menuOpen ? 'open' : ''}`}>
              <h3 className="category-list-header">{t.categoryListHeader}</h3>
              <ul className="category-list">
                {categories.map(cat => {
                  const count = cat.id === 'all' 
                    ? allPhrases.length
                    : cat.id === 'starred'
                      ? starredIds.length
                      : (course.lessons.find(l => l.id === cat.id)?.cards.length || 0);

                  return (
                    <li key={cat.id}>
                      <button
                        className={`category-list-item ${activeCategory === cat.id ? 'active' : ''}`}
                        onClick={() => {
                          setActiveCategory(cat.id);
                          setMenuOpen(false);
                        }}
                      >
                        <span className="category-item-icon">{cat.icon}</span>
                        <span className="category-item-title">{cat.title}</span>
                        <span className="category-item-count">{count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Main Panel */}
          <div className="main-panel">
            {/* Search Bar */}
            <div className="search-container">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="search-clear" onClick={() => setSearchQuery('')}>
                  ×
                </button>
              )}
            </div>

            {/* Quick Practice shortcut */}
            {filteredPhrases.length > 0 && (
              <div className="quick-practice-banner">
                <p>
                  {t.practiceMode}: <strong>{categories.find(c => c.id === activeCategory)?.title.split(' (')[0]}</strong> ({filteredPhrases.length} {t.cards})
                </p>
                <button 
                  className="btn btn--primary btn--compact"
                  onClick={() => setView('practice')}
                >
                  ⚡ {t.startLesson}
                </button>
              </div>
            )}

            {/* Phrase Directory Cards Grid */}
            <div className="phrase-grid">
              {filteredPhrases.map(phrase => (
                <PhraseCard
                  key={phrase.id}
                  card={phrase}
                  targetLang={target}
                  isStarred={starredIds.includes(phrase.id)}
                  onToggleStar={toggleStar}
                  showPhonetics={showPhonetics}
                  t={t}
                />
              ))}

              {filteredPhrases.length === 0 && (
                <div className="empty-state">
                  {activeCategory === 'starred' ? (
                    <>
                      <span className="empty-icon">⭐</span>
                      <h3>{t.categoryStarred}</h3>
                      <p>{t.noStarredPhrases}</p>
                    </>
                  ) : (
                    <>
                      <span className="empty-icon">🔎</span>
                      <h3>{t.noPhrasesFound}</h3>
                      <p>{t.noPhrasesFound}</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
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

// Inner Component for individual phrase card to manage independent copied animations
function PhraseCard({ card, targetLang, isStarred, onToggleStar, showPhonetics, t }) {
  const [copied, setCopied] = useState(false);

  function handleCopy(e) {
    e.stopPropagation();
    copyToClipboard(card.target)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  }

  function handleSpeak(e) {
    e.stopPropagation();
    speak(card.target, targetLang);
  }

  return (
    <div className="phrase-card">
      <div className="phrase-card-header">
        <span className="phrase-category-badge">
          {card.icon} {card.categoryTitle}
        </span>
        <button 
          className={`star-btn ${isStarred ? 'is-active' : ''}`}
          onClick={() => onToggleStar(card.id)}
          aria-label="Star phrase"
        >
          {isStarred ? '★' : '☆'}
        </button>
      </div>
      <div className="phrase-card-body" onClick={handleSpeak} title="Click to listen">
        <p className="native-text">{card.native}</p>
        <p className="target-text">
          {card.target}
        </p>
        {showPhonetics && card.pron && (
          <p className="phonetic-text">
            <span className="phonetic-label">{t.pronunciation}:</span> [{card.pron}]
          </p>
        )}
      </div>
      <div className="phrase-card-actions">
        <button className="card-action-btn speak-btn" onClick={handleSpeak} title={t.listen}>
          🔊 {t.listen}
        </button>
        <button className={`card-action-btn copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy}>
          {copied ? '✓ ' + t.copied : '📋 ' + t.copyBtn}
        </button>
      </div>
    </div>
  );
}

function Shell({ t, onHome, currentTrack, children }) {
  return (
    <div className="app">
      <div className="glow glow-a" />
      <div className="glow glow-b" />
      <nav className="topbar">
        <button className="brand" onClick={onHome}>
          🗣️ Polyglot
        </button>
        {currentTrack && (
          <div className="topbar-track-indicator" onClick={onHome} title={t.changeLang}>
            <span>{LANGS[currentTrack.native].flag}</span>
            <span>➔</span>
            <span>{LANGS[currentTrack.target].flag}</span>
          </div>
        )}
      </nav>
      <main className="content">{children}</main>
      <footer className="foot">Made for professional conversations · {t.tagline}</footer>
    </div>
  );
}
