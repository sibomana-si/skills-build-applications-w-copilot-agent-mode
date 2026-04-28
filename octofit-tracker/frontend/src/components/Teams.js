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

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const endpoint = `${apiBaseUrl}/teams/`;

  useEffect(() => {
    console.log('Fetching Teams from', endpoint);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('Teams API response:', data);
        setTeams(normalizeResponse(data));
      })
      .catch((fetchError) => {
        console.error('Teams fetch error:', fetchError);
        setError(fetchError);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  return (
    <div className="component-page">
      <h2>Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <p className="text-danger">Error loading teams.</p>}
      {!loading && !error && (
        <ul>
          {teams.length > 0 ? (
            teams.map((team, index) => (
              <li key={team.id || team.pk || index}>
                <strong>{team.name || `Team ${index + 1}`}</strong>
                {team.description && <p>{team.description}</p>}
              </li>
            ))
          ) : (
            <li>No teams found.</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default Teams;
