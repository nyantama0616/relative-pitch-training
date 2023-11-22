import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DependencyProvider } from './contexts/Dependency';
import Layout from './components/layouts/Layout';
import TopPage from './components/pages/TopPage';
import KeyboardTestPage from './components/pages/KeyboardTestPage';
import SignUpPage from './components/pages/SignUpPage';
import SignInPage from './components/pages/SignInPage';
import TrainPage, { Scene } from './components/pages/TrainPage';
import TestRequestManager from './components/pages/TestRequestManager';

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AppWithDependency mainComponent={<TopPage />}/>}></Route>
          <Route path="/keyboard-test" element={<AppWithDependency mainComponent={<KeyboardTestPage />}/>}></Route>
          <Route path="/sign-up" element={<AppWithDependency mainComponent={<SignUpPage sx={{ height: "1000px" }} />}/>}></Route>
          <Route path="/sign-in" element={<AppWithDependency mainComponent={<SignInPage sx={{ height: "1000px" }} />}/>}></Route>
          <Route path="/train/start" element={<AppWithDependency mainComponent={<TrainPage scene={Scene.Start} sx={{ height: "1000px" }} />}/>}></Route>
          <Route path="/train/main" element={<AppWithDependency mainComponent={<TrainPage scene={Scene.Main} sx={{ height: "1000px" }} />}/>}></Route>
          <Route path="/train/result" element={<AppWithDependency mainComponent={<TrainPage scene={Scene.Result} sx={{ height: "1000px" }} />}/>}></Route>
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
