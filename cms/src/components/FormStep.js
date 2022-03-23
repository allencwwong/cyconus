import React from 'react';
import { Form, FieldArray, Field } from 'formik';
import {formInputs} from './formInputs';
import Options from './Options';
import './FormStep.css';

const FormStep = (props) => {
  const { stepNum, setStepNum, setInitialValues, handleSubmit, handleChange, handleBlur, values, isSubmitting, formErrors, formInputData } = props;
  const data = Object.entries(values)

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
        { formInputData?.row_order ? (
              <div class="inputType span-sixth"><label>Row Order</label>
                <input type="text" value={formInputData['row_order']} disabled />
              </div>
        ) : null}
        {formInputs.map((item, idx)=> {
          if(item !== 'options') {
            if(item === 'description') {
              return (
                <div key={item+idx} className="inputType span-full">
                  <label>{item}</label>
                  <textarea type="text" id={item} name={item} onChange={handleChange} onBlur={handleBlur} value={values[item]} rows="5"/>
                </div>
              )
            } else if(item === 'item_condition') {
              return (
                <div key={item+idx} className="inputType span-third">
                  <label>{item}</label>
                  <Field as="select" name="item_condition">
                    {item['item_condition']?.toLowerCase() === 'used' ? (
                      <><option value="used">Used</option><option value="new">New</option></>
                    ) : (
                      <><option value="new">New</option><option value="used">Used</option></>
                    )}
                    
                  </Field>
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

              // TODO: better way to setup form grid
              const spanHalf = [2,4,5,6,7,8,9,10,11,12,13,14]
              const spanThird = []
              const spanSixth = [0,1,3]

              let span = ''
              if(spanHalf.includes(idx)){
                span = 'span-half'
              } else if(spanThird.includes(idx)){
                span = 'span-third'
              } else if (spanSixth.includes(idx)){
                span = 'span-sixth'
              }
              else{
                span = 'span-full'
              }

              return (
                <>
                  <div key={item+idx} className={`inputType ${span}`}>
                    <label>{item}</label>
                    <input {...inputAttr}/>
                  </div>
                  {formErrors[item] ? (<p className="form-warning">{formErrors[item]}</p>): null}
                </>
              )
            }
          } else {
            return null
            // return (
            //   <FieldArray name="options" render={arrayHelpers => (
            //     <>
            //       {values[item].map((option, idx) => {
            //         return (<Options key={option['option_name']+idx} values={option} idx={idx} /> )
            //       })}
            //       <button key={idx} className="add-option" onClick={(e) => {handleAddOption(e, arrayHelpers)}}>Add Option Field</button>
            //     </>
            //   )} />
            // )
          }
        })}
        <div className="submit-controller">
          <div className='submit-button-group'>
            <button className="save">Save</button>
          </div>
        </div>
      </Form>
    )
  } else {
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
        <div className="submit-controller">
          <div className='submit-button-group'>
            <button onClick={handleEdit}>Back to Edit</button>
            <button type="submit" disabled={isSubmitting} >Submit</button>
          </div>
        </div>
    </Form>
    )
  }

}

export default FormStep;