import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopPage from './components/pages/TopPage';
import KeyboardTestPage from './components/pages/KeyboardTestPage';
import "./App.css";
import SignUpPage from './components/pages/SignUpPage';
import SignInPage from './components/pages/SignInPage';
import Layout from './components/layouts/Layout';
import TrainPage from './components/pages/TrainPage';
import { DependencyProvider } from './contexts/Dependency';
import TestRequestManager from './components/pages/TestRequestManager';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<TopPage/>}></Route>
          <Route path="/keyboard-test" element={<KeyboardTestPage/>}></Route>
          <Route path="/train" element={<Layout mainComponent={<TrainPage sizing={{height: "1000px"}}/>} />}></Route>
          <Route path="/sign-up" element={<Layout mainComponent={<SignUpPage sizing={{height: "1000px"}}/>} />}></Route>
          <Route path="/sign-in" element={<Layout mainComponent={<SignInPage sizing={{height: "1000px"}}/>} />}></Route>
          <Route path="/test/request"element={<AppWithDependency mainComponent={<TestRequestManager/>}/>}></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

function AppWithDependency({mainComponent}: {mainComponent: JSX.Element}) {
  return (
    <DependencyProvider>
      <Layout mainComponent={mainComponent}/>
    </DependencyProvider>
  );
}

export default App;
