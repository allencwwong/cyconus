import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Categories from '../components/Categories';
import ProductList from './ProductList';
import EditProduct from './EditProduct';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/categories">
          <Categories />
        </Route>
        <Route path="/edit/:category/:id">
          <EditProduct />
        </Route>
        <Route path="/">
          <ProductList />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;


