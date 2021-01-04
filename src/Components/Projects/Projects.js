import { Route, Switch } from "react-router-dom";

import ProjectPuzzleEinstein from './Puzzle_Einstein/Puzzle_Einstein';
import StarApiOne from './StarApiOne/StarApiOne';
import OpenLibrarySearch from './OpenLibrarySearch/OpenLibrarySearch';
import Parallexer from './Parallexer/Parallexer';
import FamPuzzle from './Puzzle_Einstein/FamPuzzle';
import Header from '../Header/Header';

function ProjectsScreen() {

  return (
    <div id='projects' style={{position: 'relative', display: "flex", flexDirection: "column", alignItems: "center"}}>
        <Switch>
            <Route path="/project/image-puzzle" component={ProjectPuzzleEinstein} />
            <Route path="/project/nasa-rover-photos" component={StarApiOne} />
            <Route path="/project/open-library-search" component={OpenLibrarySearch} />
            <Route path="/project/p3" component={Parallexer} />
            <Route path="/project/family" component={FamPuzzle} />
        </Switch>

        <Header />

    </div>
  );

}

export default ProjectsScreen;