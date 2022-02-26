
import './App.css';
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import About from './Components/About'
import NoteState from './context/notes/NoteState';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Alert from './Components/Alert';
import Login from './Components/Login';
import SignUp from './Components/SignUp';

function App() {
  return (
    <div >
      <NoteState>


        <Router>
          <Navbar />
          <Alert/>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/About">
              <About />
            </Route>
            <Route exact path="/Login">
              <Login/>
            </Route>
            <Route exact path="/SignUp">
              <SignUp/>
            </Route>

          </Switch>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
