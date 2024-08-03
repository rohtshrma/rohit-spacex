import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Rockets from './pages/Rockets';

function App() {
  const appContainerStyle = {
    display: 'flex',
    height: '100vh', // Ensure full height of the viewport
  };

  const contentContainerStyle = {
    flex: 1, // Take up the remaining space after the sidebar
    // overflowY: 'auto', // Allow scrolling if content exceeds viewport height
    padding: '20px',
  };

  return (
    <Router>
      <div style={appContainerStyle}>
        <Sidebar />
        <div style={contentContainerStyle}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/rockets" element={<Rockets />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
