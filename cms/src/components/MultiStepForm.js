import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {formInputs} from './formInputs';
import PageLoader from './PageLoader';
import FormStep from './FormStep';
import ImageUploader from './ImageUploader';
import './MultiStepForm.css';

const MultiStepForm = ({handleClickBack, selectedCategory, formInputData, submitType, lastRid}) => {
  lastRid = parseInt(lastRid)
  console.log(lastRid)
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
      console.log(key,':',!values[key])
        if(key === 'insert_before_rid' && !values[key]){
          formData.append(key, lastRid+1)
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
    insert_before_rid: Yup.number()
      .typeError('Must be a valid Number')
      .min(1, 'Min value is 1')
      .max(lastRid, `Max value is ${lastRid}`)
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

  
  if(isPageLoaderShown){
    return <PageLoader />
  }

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
              <>
                <FormStep stepNum={stepNum} setStepNum={setStepNum} setInitialValues={setInitialValues} handleSubmit={handleSubmit} handleBlur={handleBlur} handleChange={handleChange} values={values} isSubmitting={isSubmitting} setFieldValue={setFieldValue} rowOrder={fetchedRowOrder} formErrors={errors} formInputData={formInputData} />
              </>
            )}
        </Formik>
        <ImageUploader formInputData={formInputData} setUploadedImages={setUploadedImages} uploadedImages={uploadedImages} />
      </section>
    )
}

export default MultiStepForm;