import { Route, Switch } from "react-router-dom";

import ProjectPuzzleEinstein from './Puzzle_Einstein/Puzzle_Einstein';
import StarApiOne from './StarApiOne/StarApiOne';
import ProjectMankindTimeline from './Mankind_Timeline/Mankind_Timeline';
import DragTest from './DragTest/DragTest';
import FamPuzzle from './Puzzle_Einstein/FamPuzzle';

function ProjectsScreen() {

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <Switch>
            <Route path="/project/p1" component={ProjectPuzzleEinstein} />
            <Route path="/project/p2" component={StarApiOne} />
            <Route path="/project/p3" component={ProjectMankindTimeline} />
            <Route path="/project/p4" component={DragTest} />
            <Route path="/project/family" component={FamPuzzle} />
        </Switch>
    </div>
  );

}

export default ProjectsScreen;