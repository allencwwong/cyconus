import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Categories from '../components/Categories';
import ProductList from './ProductList';
import EditProduct from './EditProduct';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/products/cms/v1/categories">
          <Categories />
        </Route>
        <Route path="/products/cms/v1/edit/:category/:id">
          <EditProduct />
        </Route>
        <Route exact path="/products/cms/v1">
          <ProductList />
        </Route>
        <Route exact path="/products/cms/v1/changelog">
          <ul>
              <h2>02/05/22</h2>
              <li>updated ui for editing/confirmation</li>
              <li>updated logic for storing data</li>
              <li>hidden additional options for now</li>
          </ul>
        </Route>
        <Route path="/">
          <ProductList />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;


