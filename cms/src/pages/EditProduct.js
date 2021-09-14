import {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import MultiStepForm from '../components/MultiStepForm';

const EditProduct = () => {
  const [formInputData, setFormInputData] = useState(null);
  let {category, id} = useParams()
  const history = useHistory()

  const handleClickBack = () => {
    history.push('/')
  }

  useEffect(() => {
    fetch(`https://www.cyconus.com/products/api/product/?category=${category}&id=${id}`)
      .then(res => res.json())
      .then(data => {
        for(let key in data) {
          if(!data[key]) data[key] = ""
        }
        console.log(data)
        data['options'] = []
        setFormInputData(data)
      })
  }, [])

  if(formInputData) {
    return (
      <MultiStepForm selectedCategory={category} formInputData={formInputData} handleClickBack={handleClickBack} submitType="update" />
    )
  } else {
    return(
      <p>loading....</p>
    )
  }
}

export default EditProduct;