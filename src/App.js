import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';

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
                </Switch>
            </main>

            <Footer />
        </div>
    </Router>
  );

}

export default App;
