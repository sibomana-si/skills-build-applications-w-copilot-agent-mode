import './App.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="App container py-4">
      <header className="mb-4">
        <h1>OctoFit Tracker</h1>
        <p>Browse activities, teams, users, workouts, and the leaderboard.</p>
      </header>

      <nav className="mb-4">
        <ul className="nav nav-pills flex-wrap gap-2">
          <li className="nav-item">
            <NavLink className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'} to="/activities">
              Activities
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'} to="/workouts">
              Workouts
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'} to="/teams">
              Teams
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'} to="/users">
              Users
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={({ isActive }) => isActive ? 'active nav-link' : 'nav-link'} to="/leaderboard">
              Leaderboard
            </NavLink>
          </li>
        </ul>
      </nav>

      <main>
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route
            path="/"
            element={
              <div>
                <h2>Welcome to OctoFit Tracker</h2>
                <p>Select a section from the navigation menu to load data from the backend REST API.</p>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
