import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([])
  const history = useHistory();

  const handleAddProduct = () => {
    history.push("/categories")
  }

  useEffect(() => {
    fetch('https://www.cyconus.com/products/api/chairs.php')
      .then(res => res.json())
      .then(dataAPI => {
        setData(dataAPI)
        let first25Products = dataAPI.slice(0, 24)
        console.log(first25Products[0].price1)
        setFilteredData(first25Products)
      })
  }, [])

  return (
    <div className="container">
      <h2>Product List</h2>
      <button onClick={handleAddProduct}>Add New Product</button>
      <div className="product-container">
        <div className="product-item-head">
          <p>pID</p>
          <p>Image</p>
          <p>Name</p>
          <p>Price 1</p>
          <p>Price 2</p>
        </div>
        { filteredData.map(product => {
          return (
            <div className="product-item" >
              <p>{product.pid}</p>
              <img src={product.img} alt="product view" className="product-avatar" />
              <p>{product.brand}</p>
              <p>{`$${product.price1}`}</p>
              <p>{product.price2 ? `$${product.price2}` : "-"}</p>
              <div className="btn-wrapper">
                <button>Edit</button>
              </div>
              <div className="btn-wrapper">
                <button>Delete</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProductList;