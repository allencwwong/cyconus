import React from 'react';
import { Form, FieldArray } from 'formik';
import {formInputs} from './formInputs';
import Options from './Options';
import './FormStep.css';

const FormStep = (props) => {
  const { stepNum, setStepNum, setInitialValues, handleSubmit, handleChange, handleBlur, values, isSubmitting, setImgsFileData, imgsFileData } = props;
  const data = Object.entries(values)
  const imgs = ['img1', 'img2', 'img3']

  const handleEdit = (e) => {
    e.preventDefault();
    setStepNum(0)
  }

  const handleSave = (e) => {
    e.preventDefault();
    setInitialValues(values)
    setStepNum(1)
  }

  const handleAddOption = (e, arrayHelpers) => {
    e.preventDefault()
    arrayHelpers.push({option_name: '', option_value: ''})
  }

  if(stepNum === 0) {
    return (
      <Form onSubmit={handleSave} className="form">
        {formInputs.map((item, idx)=> {
          if(item !== 'options') {
            if(item === 'description') {
              return (
                <div key={item+idx} className="inputType">
                  <label>{item}</label>
                  <textarea type="text" id={item} name={item} onChange={handleChange} onBlur={handleBlur} value={values[item]} rows="5"/>
                </div>
              )
            } else {
              let inputAttr = {
                type: 'text',
                id: item,
                name: item,
                onChange: handleChange,
                onBlur: handleBlur,
                value: values[item]
              }

              return (
                <div key={item+idx} className="inputType">
                  <label>{item}</label>
                  <input {...inputAttr}/>
                </div>
              )
            }
          } else {
            return (
              <FieldArray name="options" render={arrayHelpers => (
                <>
                  {values[item].map((option, idx) => {
                    return (<Options key={option['option_name']+idx} values={option} idx={idx} /> )
                  })}
                  <button key={idx} className="add-option" onClick={(e) => {handleAddOption(e, arrayHelpers)}}>Add Option Field</button>
                </>
              )} />
            )
          }
        })}
        <button className="save">Save</button>
      </Form>
    )
  } else {
    console.log(data)
    return (
      <Form onSubmit={handleSubmit} className="confirm">
        <h2>Confirmation</h2>
          { data.map((item, idx) => {
            if(item[0] !== 'options' && item[0] !== 'files') {
              return (
                <div key={item + idx} className="confirm-grid-container">
                  <p className="confirm-grid-item1">{item[0] + ": "}</p>
                  <p className="confirm-grid-item2">{item[1]}</p>
                </div>
              )
            } else {
              return (<p key={item + idx}></p>)
            }
          })}
        <button onClick={handleEdit}>Edit</button>
        <button type="submit" disabled={isSubmitting} >Submit</button>
    </Form>
    )
  }

}

export default FormStep;