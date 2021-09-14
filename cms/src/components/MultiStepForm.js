import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import { Formik } from 'formik';
import {formInputs} from './formInputs';
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

  //to do: back button function

  const handleSubmit = (values, setSubmitting) => {
    setSubmitting(false)
    console.log('sub')
    let formData = new FormData()
    console.log(uploadedImages)
    if(uploadedImages.length > 0) {
      console.log(uploadedImages)
      uploadedImages.forEach((file,idx) => {
        if(file){
          formData.append('imagesIdx[]',  idx)
          formData.append('images[]', file, file.name )
        }
      })
    }

    for(let key in values) {
      formData.append(key, values[key])
    }
    let url = submitType === "update" ? `https://www.cyconus.com/products/api/update/?category=${selectedCategory}&id=${formInputData.id}&api_key=Rental123` : `https://www.cyconus.com/products/api/new/?category=${selectedCategory.toLowerCase()}&api_key=Rental123`

    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        history.push('/')
      })
      .catch((error, data) => {
        console.error('Error:', error);
      });

  }
  return (
    <section className="form-container">
      <h2>{`Add Product - ${selectedCategory}`}</h2>
      <button onClick={() => handleClickBack()} className="back-btn">Back</button>
      <Formik
          initialValues={initialValues}
          onSubmit={(values, {setSubmitting}) => handleSubmit(values, setSubmitting)}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            handleBlur,
            isSubmitting,
            setFieldValue
          }) => (
            <FormStep stepNum={stepNum} setStepNum={setStepNum} setInitialValues={setInitialValues} handleSubmit={handleSubmit} handleBlur={handleBlur} handleChange={handleChange} values={values} isSubmitting={isSubmitting} setFieldValue={setFieldValue} />
          )}
      </Formik>
      <ImageUploader formInputData={formInputData} setUploadedImages={setUploadedImages} uploadedImages={uploadedImages} />
    </section>
  )
}

export default MultiStepForm;