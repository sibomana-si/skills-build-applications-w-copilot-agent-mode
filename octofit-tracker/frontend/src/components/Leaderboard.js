import React, { useEffect, useState } from 'react';

const apiBaseUrl = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

const normalizeResponse = (json) => {
  if (!json) return [];
  if (Array.isArray(json)) return json;
  if (Array.isArray(json.results)) return json.results;
  return [json];
};

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const endpoint = `${apiBaseUrl}/leaderboard/`;

  useEffect(() => {
    console.log('Fetching Leaderboard from', endpoint);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('Leaderboard API response:', data);
        setEntries(normalizeResponse(data));
      })
      .catch((fetchError) => {
        console.error('Leaderboard fetch error:', fetchError);
        setError(fetchError);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  return (
    <div className="component-page">
      <h2>Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="text-danger">Error loading leaderboard.</p>}
      {!loading && !error && (
        <ol>
          {entries.length > 0 ? (
            entries.map((entry, index) => (
              <li key={entry.id || entry.pk || index}>
                <strong>{entry.user || entry.username || `Player ${index + 1}`}</strong>
                <span> — {entry.score ?? entry.points ?? 'No score'}</span>
              </li>
            ))
          ) : (
            <li>No leaderboard entries found.</li>
          )}
        </ol>
      )}
    </div>
  );
}

export default Leaderboard;
