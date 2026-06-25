import { useEffect, useState } from 'react';
import './App.css';

interface DailyChallenge {
  date: string;
  prompt: string;
  certificationTrack: string;
  difficulty: string;
  maxGuesses: number;
  hints: string[];
}

function App() {
  const [challenge, setChallenge] = useState<DailyChallenge | null>(null);
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChallenge = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/daily-challenge');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: DailyChallenge = await response.json();
        setChallenge(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch daily challenge');
      } finally {
        setLoading(false);
      }
    };

    void fetchChallenge();
  }, []);

  const submitGuess = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedGuess = guess.trim();

    if (!trimmedGuess || !challenge || guesses.length >= challenge.maxGuesses) {
      return;
    }

    setGuesses((current) => [...current, trimmedGuess]);
    setGuess('');
  };

  const remainingGuesses = challenge ? challenge.maxGuesses - guesses.length : 0;
  const revealedHints = challenge?.hints.slice(0, guesses.length) ?? [];

  return (
    <main className="app-shell">
      <section className="challenge-panel" aria-labelledby="app-title">
        <div className="brand-row">
          <p className="eyebrow">Daily certification study game</p>
          <span className="status-pill">Aspire local</span>
        </div>

        <h1 id="app-title">Certordle</h1>
        <p className="lede">
          Read the scenario, make a certification-fluent guess, and use hints only when the answer refuses to shake loose.
        </p>

        {loading && <p className="notice">Loading today&apos;s challenge...</p>}
        {error && <p className="notice error" role="alert">{error}</p>}

        {challenge && (
          <>
            <div className="meta-grid" aria-label="Challenge details">
              <div>
                <span>Track</span>
                <strong>{challenge.certificationTrack}</strong>
              </div>
              <div>
                <span>Difficulty</span>
                <strong>{challenge.difficulty}</strong>
              </div>
              <div>
                <span>Guesses</span>
                <strong>{remainingGuesses}/{challenge.maxGuesses}</strong>
              </div>
            </div>

            <article className="prompt-card">
              <span>Scenario</span>
              <p>{challenge.prompt}</p>
            </article>

            <form className="guess-form" onSubmit={submitGuess}>
              <label htmlFor="guess">Your guess</label>
              <div className="guess-row">
                <input
                  id="guess"
                  value={guess}
                  onChange={(event) => setGuess(event.target.value)}
                  placeholder="Example: Amazon SQS"
                  disabled={remainingGuesses === 0}
                />
                <button type="submit" disabled={!guess.trim() || remainingGuesses === 0}>
                  Guess
                </button>
              </div>
            </form>

            <section className="support-grid" aria-label="Guess history and hints">
              <div>
                <h2>Attempts</h2>
                {guesses.length === 0 ? (
                  <p className="muted">No guesses yet.</p>
                ) : (
                  <ol className="guess-list">
                    {guesses.map((item, index) => (
                      <li key={`${item}-${index}`}>{item}</li>
                    ))}
                  </ol>
                )}
              </div>

              <div>
                <h2>Hints</h2>
                {revealedHints.length === 0 ? (
                  <p className="muted">A hint appears after each guess.</p>
                ) : (
                  <ol className="hint-list" aria-live="polite">
                    {revealedHints.map((hint, index) => (
                      <li key={hint}>
                        <span>Hint {index + 1}</span>
                        {hint}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </section>
          </>
        )}
      </section>
    </main>
  );
}

export default App;
