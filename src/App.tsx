import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopPage from './components/pages/TopPage';
import KeyboardTestPage from './components/pages/KeyboardTestPage';
import TrainingPage from './components/pages/TrainingPage';
import "./App.css";
import SignInPage from './components/pages/SignInPage';
import Layout from './components/layouts/Layout';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<TopPage/>}></Route>
          <Route path="/keyboard-test" element={<KeyboardTestPage/>}></Route>
          <Route path="/training" element={<TrainingPage />}></Route>
          <Route path="/sign-in" element={<Layout mainComponent={<SignInPage sizing={{height: "1000px"}}/>} />}></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
