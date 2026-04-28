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

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const endpoint = `${apiBaseUrl}/workouts/`;

  useEffect(() => {
    console.log('Fetching Workouts from', endpoint);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('Workouts API response:', data);
        setWorkouts(normalizeResponse(data));
      })
      .catch((fetchError) => {
        console.error('Workouts fetch error:', fetchError);
        setError(fetchError);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  return (
    <div className="component-page">
      <h2>Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <p className="text-danger">Error loading workouts.</p>}
      {!loading && !error && (
        <ul>
          {workouts.length > 0 ? (
            workouts.map((workout, index) => (
              <li key={workout.id || workout.pk || index}>
                <strong>{workout.name || workout.title || `Workout ${index + 1}`}</strong>
                {workout.duration && <p>Duration: {workout.duration}</p>}
              </li>
            ))
          ) : (
            <li>No workouts found.</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default Workouts;
