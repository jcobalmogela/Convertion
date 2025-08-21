import logo from './logo.svg';
import './App.css';
import Dash from "./Dash"
import Nav from './Components/Navigation';


function App() {
  return (
    <div className="App">
        <Nav></Nav>
       <div className="App-box">
        <Dash></Dash>
       </div>
     
    </div>
  );
}

export default App;
