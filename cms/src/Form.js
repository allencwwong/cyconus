import { Formik } from 'formik';
import {formInputs} from './formInputs';
import './Form.css';

function Form(props) {
  let initVals = {}
  formInputs.forEach(item => {
    initVals[item] = ""
  })

  return (
    <Formik
        initialValues={initVals}
        onSubmit={(values, {setSubmitting}) => {
          // alert(JSON.stringify(values, null, 2))
          props.history.push('./confirmation', { state: values })
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
          <form onSubmit={handleSubmit} className="form">
            {formInputs.map((item, idx) => {
              return (
                <div key={item + idx} className="inputType">
                  <label>{item}</label>
                  <input type="text" id={item} name={item} onChange={handleChange} onBlur={handleBlur} value={values[item]}/>
                </div>
              )
            })}
            <button type="submit" disabled={isSubmitting}>Submit</button>
          </form>
        )}
      </Formik>
  )
}

export default Form;