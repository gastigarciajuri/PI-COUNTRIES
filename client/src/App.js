import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import  Home  from  './components/Home/Home.jsx'
import LandingPage from './components/LandingPage/LandingPage';
import Detail from './components/Detail/Detail';
import CreateAct from './components/CreateAct/CreateAct'; 

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/activity' component={CreateAct}/>
        <Route exact path='/home/:countryId' component={Detail}/>
    </div>
    </BrowserRouter>
  );
}

export default App;
