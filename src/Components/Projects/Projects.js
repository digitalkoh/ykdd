import { Route, Switch } from "react-router-dom";

import ProjectPuzzleEinstein from './Puzzle_Einstein/Puzzle_Einstein';
import StarApiOne from './StarApiOne/StarApiOne';
import Parallexer from './Parallexer/Parallexer';
import FamPuzzle from './Puzzle_Einstein/FamPuzzle';
import Header from '../Header/Header';

function ProjectsScreen() {

  return (
    <div id='projects' style={{position: 'relative', display: "flex", flexDirection: "column", alignItems: "center"}}>
        <Switch>
            <Route path="/project/p1" component={ProjectPuzzleEinstein} />
            <Route path="/project/p2" component={StarApiOne} />
            <Route path="/project/p3" component={Parallexer} />
            <Route path="/project/family" component={FamPuzzle} />
        </Switch>

        <Header />

    </div>
  );

}

export default ProjectsScreen;