import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {formInputs} from './formInputs';
import PageLoader from './PageLoader';
import FormStep from './FormStep';
import ImageUploader from './ImageUploader';
import './MultiStepForm.css';

const MultiStepForm = (props) => {
  const { handleClickBack, selectedCategory, formInputData, submitType } = props
  const history = useHistory();
  // create emptyInitVals for initial state (below)
  let emptyInitVals = {}
  formInputs.forEach(item => {
    if(item === 'options' || item === 'files') {
      emptyInitVals[item] = []
    } else {
      emptyInitVals[item] = ""
    }
  })
  const [initialValues, setInitialValues] = useState(formInputData || emptyInitVals)
  const [stepNum, setStepNum] = useState(0)
  const [uploadedImages,setUploadedImages] = useState([])
  const [isPageLoaderShown, setIsPageLoaderShown] = useState(false)
  const [fetchedRowOrder , setFetchedRowOrder] = useState(null)

  //to do: back button function

  useEffect(()=>{
    fetch('https://cyconus.com/products/api/productlist/getroworder/?category=chairs')
      .then(res => res.json())
      .then(rowOrder => {
        setFetchedRowOrder(rowOrder)
      })
  },[])

  
  if(isPageLoaderShown){
    return <PageLoader />
  }
  
  if(fetchedRowOrder){
    const pids = fetchedRowOrder.map(row=>{
      return row.pid
    })

    const handleSubmit = (values, setSubmitting) => {
      setSubmitting(false)
      setIsPageLoaderShown(true)
      let formData = new FormData()
      if(uploadedImages.length > 0) {
        uploadedImages.forEach((file,idx) => {
          if(file){
            formData.append('isUpdate',  'true')
            formData.append('imagesIdx[]',  idx)
            formData.append('images[]', file, file.name )
          }
        })
      }
  
      for(let key in values) {
        if(key === 'insert_before_id'){
          const rowOrderIdx = pids.indexOf(values[key])
          const row_order = fetchedRowOrder[rowOrderIdx]['row_order']
          formData.append(key, row_order)
        }else{
          formData.append(key, values[key])
        }
      }
  
      // set url to be updating or create new api
      let url = submitType === "update" ? `https://www.cyconus.com/products/api/update/?category=${selectedCategory}&id=${formInputData.id}&api_key=Rental123` : `https://www.cyconus.com/products/api/new/?category=${selectedCategory.toLowerCase()}&api_key=Rental123`
  
      fetch(url, {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          setIsPageLoaderShown(false)
          alert('submit success')
          history.push('/products/cms/v1')
        })
        .catch((error, data) => {
          console.error('Error:', error);
        });
  
    }

    const ProductSchema = Yup.object().shape({
      insert_before_id: Yup.string()
        .oneOf(pids)
        .typeError('Must be one of the pid')
        .nullable(true),
      qty: Yup.number()
        .typeError('Must only contain numbers')
        .nullable(true),
      price1: Yup.number()
        .typeError('Must only contain numbers')
        .nullable(true),
      price2: Yup.number()
        .typeError('Must only contain numbers')
        .nullable(true)
    })

    return (
      <section className="form-container">
        <h2>{`Add Product - ${selectedCategory}`}</h2>
        <button onClick={() => handleClickBack('catrgories')} className="back-btn">Back</button>
        <Formik
            initialValues={initialValues}
            validationSchema={ProductSchema}
            onSubmit={(values, {setSubmitting}) => handleSubmit(values, setSubmitting)}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              handleBlur,
              isSubmitting,
              setFieldValue,
              errors,
            }) => (
              <FormStep stepNum={stepNum} setStepNum={setStepNum} setInitialValues={setInitialValues} handleSubmit={handleSubmit} handleBlur={handleBlur} handleChange={handleChange} values={values} isSubmitting={isSubmitting} setFieldValue={setFieldValue} rowOrder={fetchedRowOrder} formErrors={errors} />
            )}
        </Formik>
        <ImageUploader formInputData={formInputData} setUploadedImages={setUploadedImages} uploadedImages={uploadedImages} />
      </section>
    )
  }
  return null
}

export default MultiStepForm;