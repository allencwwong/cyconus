import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import DeleteModal from '../components/DeleteModal';
import './ProductList.css';

const ProductList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([])
  const [viewCategory, setViewCategory] = useState('chairs')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteItem, setDeleteItem] = useState({})
  const history = useHistory();

  const handleAddProduct = () => {
    history.push("/products/cms/v1/categories")
  }

  const handleEditProduct = (id, category) => {
    history.push(`/products/cms/v1/edit/${category}/${id}`)
  }

  const handleDeleteProduct = (id, category) => {
    setDeleteItem({id: id, category: category})
    setShowDeleteModal(true)
  }

  const fetchData = () =>{
    fetch(`https://www.cyconus.com/products/api/productlist/?category=${viewCategory}`)
      .then(res => res.json())
      .then(dataAPI => {
        setData(dataAPI.reverse())
        let first25Products = dataAPI.slice(0, 25)
        setFilteredData(first25Products)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(()=>{

  },[filteredData])
  return (
    <div className="container">
      <header>
        <div className="header-top">
          <h2>Product List</h2>
          <button onClick={handleAddProduct}>Add New Product</button>
          <SearchBar data={data} setFilteredData={setFilteredData} />
        </div>
        <nav className="btn-group-plain">
          <li>
            <button className="active">All Products</button>
          </li>
          <li>
            <button>Seating</button>
          </li>
          <li>
            <button>Filing</button>
          </li>
          <li>
            <button>Cubicles</button>
          </li>
          <li>
            <button>Desks and Cred</button>
          </li>
          <li>
            <button>Conference</button>
          </li>
          <li>
            <button>Reception</button>
          </li>
        </nav>
        <div className="product-item-head-container">
          <div className="product-item-head">
            <p>pID</p>
            <p>Image</p>
            <p>Brand</p>
            <p>Model</p>
            <p>Color</p>
            <p>Size</p>
            <p>Price 1</p>
            <p>Price 2</p>
            <Pagination data={data} setFilteredData={setFilteredData}/>
          </div>
        </div>
      </header>
      <div className="product-container">
        { filteredData.map(product => {
          return (
            <div className="product-item" key={product.id}>
              <p>{product.pid}</p>
              {/* <img src={product?.img || 'https://cyconus.com/products/uploader/uploads/no-img.jpg'} alt="product view" className="product-avatar" /> */}
              <p>Image</p>
              <p>{product.brand}</p>
              <p>{product.model}</p>
              <p>{product.color}</p>
              <p>{product.size}</p>
              <p>{parseInt(product.price1) ? `$${product.price1}` : "-"}</p>
              <p>{parseInt(product.price2) ? `$${product.price2}` : "-"}</p>
              <div className="btn-wrapper">
                <button onClick={() => {handleEditProduct(product.id, product.category)}}>Edit</button>
              </div>
              <div className="btn-wrapper">
                <button onClick={() => {handleDeleteProduct(product.id, product.category)}} >Delete</button>
              </div>
            </div>
          )
        })}
      </div>
      { showDeleteModal ? <DeleteModal setShowDeleteModal={setShowDeleteModal} deleteItem={deleteItem} fetchData={fetchData} /> : null}
    </div>
  )
}

export default ProductList;