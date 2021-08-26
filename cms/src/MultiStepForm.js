import React, { useState } from 'react';
import { Formik } from 'formik';
import {formInputs} from './formInputs';
import FormStep from './FormStep';
import './MultiStepForm.css';

const MultiStepForm = () => {
  let emptyInitVals = {}
  formInputs.forEach(item => {
    emptyInitVals[item] = ""
  })
  const [initialValues, setInitialValues] = useState(emptyInitVals)
  const [stepNum, setStepNum] = useState(0)

  return (
    <Formik
        initialValues={initialValues}
        onSubmit={(values, {setSubmitting}) => {
          // alert(JSON.stringify(values, null, 2))
          setInitialValues(values)
          setStepNum(1)
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
          <FormStep stepNum={stepNum} setStepNum={setStepNum} handleSubmit={handleSubmit} handleBlur={handleBlur} handleChange={handleChange} values={values} isSubmitting={isSubmitting}/>
        )}
      </Formik>
  )
}

export default MultiStepForm;