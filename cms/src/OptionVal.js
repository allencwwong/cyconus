import { Field } from 'formik';

const Options = (props) => {
  const {values, idx} = props
  const name = Object.keys(values)
  return (
    <>
      <div className="inputType">
        <label>{name[0] + idx}</label>
        {/* <Field type="text" id='option_name' name='option_name' onChange={handleChange} onBlur={handleBlur} value={values['option_name']}/> */}
        <Field name={name[0] + idx} value={values['options_name']} >
          {({field}) => (
            <input type="text" {...field} />
          )}
        </Field>
      </div>
      <div className="inputType">
        <label>{name[1] + idx}</label>
        {/* <Field type="text" id={'option_value'} name={'option_value'} onChange={handleChange} onBlur={handleBlur} value={values['option_value']}/> */}
        <Field name={name[1] + idx} value={values['options_value']}>
          {({field}) => (
            <input type="text" {...field} />
          )}
        </Field>
      </div>
    </>
  )
}

export default Options;