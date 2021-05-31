import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Jobs } from './views/Jobs'
import {Companies } from './views/Companies';
import {Cities} from './views/Cities';
import {Countries} from './views/Countries';
import { NavBar } from './views/NavBar';

function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <Switch>
        <Route path="/" exact component={Jobs} ></Route>
        <Route path="/companies" exact component={Companies} ></Route>
        <Route path="/cities" exact component={Cities} ></Route>
        <Route path="/countries" exact component={Countries} ></Route>

      </Switch>
    </Router>

  );

}

export default App;
