import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import MultiStepForm from '../components/MultiStepForm';

const EditProduct = () => {
  const [formData, setFormData] = useState(null);
  let {category, id} = useParams()

  useEffect(() => {
    fetch(`https://www.cyconus.com/products/api/product/?category=${category}&id=${id}`)
      .then(res => res.json())
      .then(data => setFormData(data))
  }, [])

  console.log(formData)

  return (
    <MultiStepForm selectedCategory={category} formData={formData}/>
  )
}

export default EditProduct;