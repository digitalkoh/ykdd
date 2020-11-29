import { Route, Switch } from "react-router-dom";

import ProjectPuzzleEinstein from '../Projects/Puzzle_Einstein/Puzzle_Einstein';
import ProjectMankindTimeline from '../Projects/Mankind_Timeline/Mankind_Timeline';
import DragTest from '../Projects/DragTest/DragTest';

function ProjectsScreen() {

  return (
    <div style={{display: "flex", justifyContent: "center"}}>
        <Switch>
            <Route path="/projects/p1" component={ProjectPuzzleEinstein} />
            <Route path="/projects/p2" component={ProjectMankindTimeline} />
            <Route path="/projects/p3" component={DragTest} />
        </Switch>
    </div>
  );

}

export default ProjectsScreen;
