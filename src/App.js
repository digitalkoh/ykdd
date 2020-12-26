import { HashRouter as Router, Route, Switch } from "react-router-dom";
// HashRouter is used on static server =(... ugly URL
// import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Footer from './Components/Footer/Footer';
import Home from './Components/Projects/Home/Home';
import ProjectsScreen from './Components/Projects/Projects';

import './css/App.css';

function App() {

  return (
    <Router>
        <div className="App">

            <main>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/project" component={ProjectsScreen} />
                </Switch>
            </main>

            <Footer />
        </div>
    </Router>
  );

}

export default App;
