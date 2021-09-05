import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Categories from '../components/Catergories';
import ProductList from '../pages/ProductList';
// import MultiStepForm from '../components/MultiStepForm'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/catergories">
          <Categories />
        </Route>
        <Route path="/">
          <ProductList />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;


