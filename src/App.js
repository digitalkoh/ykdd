import { HashRouter as Router, Route, Switch } from "react-router-dom";
// HashRouter is used on static server =(... ugly URL
// import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import ProjectsScreen from './Components/Screens/Projects';

import './css/App.css';

function App() {

  return (
    <Router>
        <div className="App">
            <Header />

            <main>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/projects" component={ProjectsScreen} />
                </Switch>
            </main>

            <Footer />
        </div>
    </Router>
  );

}

export default App;
