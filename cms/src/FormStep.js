import {formInputs} from './formInputs';

const FormStep = (props) => {
  const { stepNum, setStepNum, setInitialValues, handleSubmit, handleChange, handleBlur, values, isSubmitting } = props;
  const data = Object.entries(values)
  const handleEdit = () => {
    setStepNum(0)
  }

  const handleSave = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(values), 'handleSave')
    setInitialValues(values)
    setStepNum(1)
  }

  if(stepNum === 0) {
    return (
      <form onSubmit={handleSave} className="form">
              {formInputs.map((item, idx)=> {
                return (
                  <div key={item+idx} className="inputType">
                    <label>{item}</label>
                    <input type="text" id={item} name={item} onChange={handleChange} onBlur={handleBlur} value={values[item]}/>
                  </div>
                )
              })}
              <button>Save</button>
      </form>
    )
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <h2>Confirmation</h2>
        { data.map((item, idx) => {
          return (
            <p key={item + idx}>{item[0] + ": " + item[1]}</p>
          )
        })}
        <button onClick={handleEdit} >Edit</button>
        <button type="submit" disabled={isSubmitting} >Submit</button>
    </form>
    )
  }

}

export default FormStep;