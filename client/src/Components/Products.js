import { useEffect, useState } from 'react'
import Product from './Product'
import Loader from './Loader'
import ProductsHeader from './ProductsHeader'
import BsModal from './Modal'
import './Products.scss'
import 'react-bootstrap-modal/lib/css/rbm-complete.css'

const Products = () =>{
    const [productsData,setProductsData] = useState(null)
    const [isShown, setIsShown] = useState(false)
    const [modalData, setModalData] = useState(null)

    const handleClickProduct = async (pid) => {
        setIsShown(true)
        const res = await fetch(`https://www.cyconus.com/products/api/product/?category=chairs&id=${pid}`)
        const productData = await res.json()
        setModalData(productData)
    }

    const handleCloseModal = () =>{
        setIsShown(false)
    }

    useEffect(()=>{
        const fetchData = async () =>{
            const res = await fetch(`https://cyconus.com/products/api/productlist/?category=chairs`)
            if (!res.ok) {
                const message = `An error has occured: ${res.status}`;
                throw new Error(message);
              }
            const productsData = await res.json()
            return productsData
        }
        fetchData().then(productApiData =>{
            setProductsData(productApiData)
        })
    },[])

    return(
        <>
        <BsModal isShown={isShown} closeModal={handleCloseModal} modalData={modalData}/>
        <ProductsHeader />
        <section className="container product-list">
            { productsData ? productsData.map((product,idx)=>(<Product key={`${product.pid}-${idx}`} {...product} handleClickProduct={handleClickProduct} />)) : <Loader /> }
        </section>
        </>
    )
}

export default Products