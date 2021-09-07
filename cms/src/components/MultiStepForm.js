import React, { useState } from 'react';
import { Formik } from 'formik';
import {formInputs} from './formInputs';
import FormStep from './FormStep';
import './MultiStepForm.css';

const MultiStepForm = (props) => {
  const { handleClickBack, selectedCategory } = props

  let emptyInitVals = {}
  formInputs.forEach(item => {
    if(item === 'options') {
      emptyInitVals[item] = []
    } else {
      emptyInitVals[item] = ""
    }
  })

  const [initialValues, setInitialValues] = useState(emptyInitVals)
  const [stepNum, setStepNum] = useState(0)

  return (
    <section className="form-container">
      <h2>{`Add Product - ${selectedCategory}`}</h2>
      <button onClick={() => handleClickBack()} className="back-btn">Back</button>
      <Formik
          initialValues={initialValues}
          onSubmit={(values, {setSubmitting}) => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            handleBlur,
            isSubmitting
          }) => (
            <FormStep stepNum={stepNum} setStepNum={setStepNum} setInitialValues={setInitialValues} handleSubmit={handleSubmit} handleBlur={handleBlur} handleChange={handleChange} values={values} isSubmitting={isSubmitting}/>
          )}
        </Formik>
    </section>
  )
}

export default MultiStepForm;