import { useState } from 'react';
import MultiStepForm from './MultiStepForm';
import './Catergories.css';

const Categories = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("")
  const handleClickCategory = (e) => {
    setSelectedCategory(e.target.innerHTML)
    setShowForm(true)
  }

  if(showForm) {
    return <MultiStepForm setShowForm={setShowForm} selectedCategory={selectedCategory}/>
  } else {
    return (
      <div className="cate-container">
        <div onClick={handleClickCategory} >Chairs</div>
        <div onClick={handleClickCategory} >Cubicles</div>
      </div>
    )
  }
}

export default Categories