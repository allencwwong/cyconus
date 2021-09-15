import { useState } from 'react';
import { useHistory } from "react-router-dom";

import MultiStepForm from './MultiStepForm';
import './Categories.css';

const Categories = () => {
  let history = useHistory()
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("")
  const handleClickCategory = (e) => {
    setSelectedCategory(e.target.innerHTML)
    setShowForm(true)
    history.push({
      pathname: '/products/cms/v1/categories',
      search: `?category=${e.target.innerHTML.toLowerCase()}`
    })
  }

  const handleClickBack = (toPage) =>{
    if(toPage === 'catrgories'){
      setShowForm(false)
      history.push('/products/cms/v1/categories')
    }else{
      history.push('/products/cms/v1')
    }
  }

  if(showForm) {
    return <MultiStepForm setShowForm={setShowForm} handleClickBack={handleClickBack} selectedCategory={selectedCategory}  submitType="create"/>
  } else {
    return (
      <div className="cate-container">
        <button onClick={handleClickCategory} >Chairs</button>
        <button onClick={ handleClickBack } className="back-btn">Back</button>
        {/* <button onClick={handleClickCategory} >Filing</button>
        <button onClick={handleClickCategory} >Cubicles</button>
        <button onClick={handleClickCategory} >Desks and Credenzas</button>
        <button onClick={handleClickCategory} >Conference Rooms</button>
        <button onClick={handleClickCategory} >Reception</button> */}
      </div>
    )
  }
}

export default Categories