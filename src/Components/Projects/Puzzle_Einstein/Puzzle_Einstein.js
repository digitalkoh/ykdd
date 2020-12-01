import './css/style.css'
import { Board } from "./Board.js";

const containerStyle={
    display: 'flex', 
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative', 
    width: '80vw', 
    height: '75vh', 
    border: 'solid 1px #ccc'
}

function Mankind_Timeline() {

  return (
      <div className="container" style={containerStyle}>
        <Board />
      </div>
  );

}

export default Mankind_Timeline;