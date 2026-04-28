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

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const endpoint = `${apiBaseUrl}/activities/`;

  useEffect(() => {
    console.log('Fetching Activities from', endpoint);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('Activities API response:', data);
        setActivities(normalizeResponse(data));
      })
      .catch((fetchError) => {
        console.error('Activities fetch error:', fetchError);
        setError(fetchError);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  return (
    <div className="component-page">
      <h2>Activities</h2>
      {loading && <p>Loading activities...</p>}
      {error && <p className="text-danger">Error loading activities.</p>}
      {!loading && !error && (
        <ul>
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <li key={activity.id || activity.pk || index}>
                <strong>{activity.name || activity.title || `Activity ${index + 1}`}</strong>
                {activity.description && <p>{activity.description}</p>}
              </li>
            ))
          ) : (
            <li>No activities found.</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default Activities;
