import {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import MultiStepForm from '../components/MultiStepForm';

const EditProduct = () => {
  const [formInputData, setFormInputData] = useState(null);
  const [lastRid, setLastRid] = useState(null);
  let {category, id} = useParams()
  const history = useHistory()

  const handleClickBack = () => {
    history.push('/products/cms/v1')
  }

  useEffect(() => {

    const run = async () =>{

      try{
        let [productRes, ridRes] = await Promise.all([
          fetch(`https://www.cyconus.com/products/api/product/?category=${category}&id=${id}`),
          fetch(`https://cyconus.com/products/api/productlist/getroworder/?category=${category}`)
        ])

        const productData = await productRes.json()
        const rid = await ridRes.json()
        const lastRid = parseInt(rid[rid.length-1])
        console.log(lastRid)

        for(let key in productData) {
          if(!productData[key]) productData[key] = ""
        }
        productData['options'] = []
        setFormInputData(productData)


        setLastRid(rid[rid.length-1])

      }
      catch(err){
        console.error(err)
      }
    }

    run()

  }, [])

  if(formInputData) {
    console.log(formInputData)
    return (
      <MultiStepForm selectedCategory={category} formInputData={formInputData} handleClickBack={handleClickBack} lastRid={lastRid} submitType="update" />
    )
  } else {
    return(
      <p>loading....</p>
    )
  }
}

export default EditProduct;