import { BrowserRouter, Route, Link } from "react-router-dom";
import Form from './Form';
import Confirmation from './Confirmation';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Form} />
        <Route exact path="/confirmation" component={Confirmation} />
      </BrowserRouter>
    </div>
  );
}

export default App;
