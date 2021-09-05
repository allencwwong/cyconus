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
        <button onClick={handleClickCategory} >Seating</button>
        <button onClick={handleClickCategory} >Filing</button>
        <button onClick={handleClickCategory} >Cubicles</button>
        <button onClick={handleClickCategory} >Desks and Credenzas</button>
        <button onClick={handleClickCategory} >Conference Rooms</button>
        <button onClick={handleClickCategory} >Reception</button>
      </div>
    )
  }
}

export default Categories