import './Product.scss'

const Product = ({id,pid, brand, model, img, type, qty, price_name1,price1,price_name2,price2,handleClickProduct}) =>{
            if(qty === 'SO' || parseInt(qty) > 0){
                return (
                    <div className="product-item">
                        <div className="product-item-header">
                            <h2>{brand}</h2>
                            {
                                qty === 'SO' ? (<div className="product-item-qty"><p className="label bold">Special</p><p className="label bold">order</p></div>) 
                                : (<div className="product-item-qty"><p className="label">Qty</p><p className="title">{qty}</p></div>)
                            }
                        </div>
                        <img src={img} alt={`${brand}-${model}-${pid}`} />
                        <ul className="product-item-list">
                            <li>
                                <p className="label inline-block">Product Id</p>
                                <h3 className="title inline-block pl20">{pid}</h3>
                            </li>
                            <li>
                                <p className="label">Brand</p>
                                <h3 className="title">{model}</h3>
                            </li>
                            <li>
                                <p className="label">Pricing</p>
                                <div className="product-item-price">
                                    <div>
                                        {price_name1 ? (<h3 className="sub-title">{price_name1}</h3>) : null}
                                        {price1 ? (<p className={`sub-title ${price_name1 ? '' : 'bold'}`}>${price1}</p> ): null }
                                    </div>
                                    <div>
                                        {price_name2 ? (<h3 className="sub-title">{price_name2}</h3>) : null}
                                        {price2 ? (<p className={`sub-title ${price_name2 ? '' : 'bold'}`}>${price2}</p>) : null}
                                    </div>
                                </div>
                            </li>
                        </ul>
                        {
                            type && (<ul className="product-item-type">
                                {type.split(',').map(item=>(<li>{item}</li>))}
                            </ul>)
                        }
                        <div className="product-item-list footer">
                            <div className="product-item-container" >
                                <button onClick={()=>handleClickProduct(id)}>View detail</button>
                            </div>
                        </div>
                    </div>
                )
            }
            return null
}

export default Product