
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import LandingPage from './components/LandingPage/LandingPage';
import Detail from './components/Detail/Detail';
import CreateAct from './components/CreateAct/CreateAct';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/activity" element={<CreateAct />} />
          <Route path="/home/:countryId" element={<Detail />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
