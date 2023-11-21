import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DependencyProvider } from './contexts/Dependency';
import Layout from './components/layouts/Layout';
import TopPage from './components/pages/TopPage';
import KeyboardTestPage from './components/pages/KeyboardTestPage';
import SignUpPage from './components/pages/SignUpPage';
import SignInPage from './components/pages/SignInPage';
import TrainPage from './components/pages/TrainPage';
import TestRequestManager from './components/pages/TestRequestManager';

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AppWithDependency mainComponent={<TopPage />}/>}></Route>
          <Route path="/keyboard-test" element={<AppWithDependency mainComponent={<KeyboardTestPage />}/>}></Route>
          <Route path="/sign-up" element={<AppWithDependency mainComponent={<SignUpPage sizing={{ height: "1000px" }} />}/>}></Route>
          <Route path="/sign-in" element={<AppWithDependency mainComponent={<SignInPage sizing={{ height: "1000px" }} />}/>}></Route>
          <Route path="/train" element={<AppWithDependency mainComponent={<TrainPage sizing={{ height: "1000px" }} />}/>}></Route>
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
