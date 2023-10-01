import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopPage from './components/pages/TopPage';
import KeyboardTestPage from './components/pages/KeyboardTestPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<TopPage/>}></Route>
          <Route path="/keyboard-test" element={<KeyboardTestPage/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
