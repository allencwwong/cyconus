import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import { Formik } from 'formik';
import {formInputs} from './formInputs';
import FormStep from './FormStep';
import './MultiStepForm.css';

const MultiStepForm = (props) => {
  const { handleClickBack, selectedCategory, formInput, submitType } = props
  const history = useHistory();
  let emptyInitVals = {}
  formInputs.forEach(item => {
    if(item === 'options' || item === 'files') {
      emptyInitVals[item] = []
    } else {
      emptyInitVals[item] = ""
    }
  })

  //to do: back button function

  const [initialValues, setInitialValues] = useState(formInput || emptyInitVals)
  const [stepNum, setStepNum] = useState(0)
  const handleSubmit = (values, setSubmitting) => {
    setSubmitting(false)
    let formData = new FormData()
    for(let key in values) {
      console.log(values)
      if(key === 'img1') {
        console.log(values[key].files.name)
        console.log(values.key.files)
        formData.append('images[]', values[key]['files'], values[key]['files']['name'])
      } else if(key !== 'files') {
        formData.append(key, values[key])
      }
    }
    let url = submitType === "update" ? `https://www.cyconus.com/products/api/update/?category=${selectedCategory}&id=${formInput.id}&api_key=Rental123` : `https://www.cyconus.com/products/api/new/?category=${selectedCategory.toLowerCase()}&api_key=Rental123`

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
            <FormStep stepNum={stepNum} setStepNum={setStepNum} setInitialValues={setInitialValues} handleSubmit={handleSubmit} handleBlur={handleBlur} handleChange={handleChange} values={values} isSubmitting={isSubmitting} setFieldValue={setFieldValue}/>
          )}
        </Formik>
    </section>
  )
}

export default MultiStepForm;