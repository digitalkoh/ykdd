// HashRouter is used on static server =(... ugly URL
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Components/Projects/Home/Home';
import './css/App.css';

// Projects
import ProjectPuzzleEinstein from './Components/Projects/Puzzle_Einstein/Puzzle_Einstein';
import StarApiOne from './Components/Projects/StarApiOne/StarApiOne';
import OpenLibrarySearch from './Components/Projects/OpenLibrarySearch/OpenLibrarySearch';
import DailyCure from './Components/Projects/DailyCure/DailyCure';
import Parallexer from './Components/Projects/Parallexer/Parallexer';
import FamPuzzle from './Components/Projects/Puzzle_Einstein/FamPuzzle';

function App() {
  return (
    <Router>
        <div className="App">
            <main>
                <Switch>
                    <Route exact path="/">
                        <Home header={<Header />} />
                    </Route>
                    <Route path="/project">
                        <div id='projects' style={{position: 'relative', display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <Route path="/project/image-puzzle" component={ProjectPuzzleEinstein} />
                            <Route path="/project/nasa-rover-photos" component={StarApiOne} />
                            <Route path="/project/open-library-search" component={OpenLibrarySearch} />
                            <Route path="/project/daily-cure" component={DailyCure} />
                            <Route path="/project/p3" component={Parallexer} />
                            <Route path="/project/family" component={FamPuzzle} />
                            <Header />
                        </div>
                    </Route>
                </Switch>
            </main>
            <Footer />
        </div>
    </Router>
  )
}

export default App;
