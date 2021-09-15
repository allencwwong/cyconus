import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Categories from '../components/Categories';
import ProductList from './ProductList';
import EditProduct from './EditProduct';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/products/cms/v1/categories">
          <Categories />
        </Route>
        <Route path="/products/cms/v1/edit/:category/:id">
          <EditProduct />
        </Route>
        <Route path="/products/cms/v1">
          <ProductList />
        </Route>
        <Route path="/">
          <ProductList />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;


