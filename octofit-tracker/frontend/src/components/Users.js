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

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const endpoint = `${apiBaseUrl}/users/`;

  useEffect(() => {
    console.log('Fetching Users from', endpoint);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log('Users API response:', data);
        setUsers(normalizeResponse(data));
      })
      .catch((fetchError) => {
        console.error('Users fetch error:', fetchError);
        setError(fetchError);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  return (
    <div className="component-page">
      <h2>Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <p className="text-danger">Error loading users.</p>}
      {!loading && !error && (
        <ul>
          {users.length > 0 ? (
            users.map((user, index) => (
              <li key={user.id || user.pk || index}>
                <strong>{user.username || user.email || `User ${index + 1}`}</strong>
                {user.full_name && <p>{user.full_name}</p>}
              </li>
            ))
          ) : (
            <li>No users found.</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default Users;
