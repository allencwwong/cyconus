import {formInputs} from './formInputs';

const FormStep = (props) => {
  const { stepNum, setStepNum, handleSubmit, handleChange, handleBlur, values, isSubmitting } = props;
  const data = Object.entries(values)

  const handleEdit = () => {
    setStepNum(0)
  }

  const handleSave = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(values))
  }

  const handleConfirmSave = (e) => {
    e.preventDefault()
    console.log("confirmed!")
  }

  if(stepNum === 0) {
    return (
      <form onSubmit={handleSubmit} className="form">
              {formInputs.map((item, idx)=> {
                return (
                  <div key={item+idx} className="inputType">
                    <label>{item}</label>
                    <input type="text" id={item} name={item} onChange={handleChange} onBlur={handleBlur} value={values[item]}/>
                  </div>
                )
              })}
              <button type="submit" disabled={isSubmitting}>Submit</button>
      </form>
    )
  } else {
    return (
      <form onSubmit={handleConfirmSave}>
        <h2>Confirmation</h2>
        { data.map((item, idx) => {
          return (
            <p key={item + idx}>{item[0] + ": " + item[1]}</p>
          )
        })}
        <button onClick={handleEdit} >Edit</button>
        <button onClick={handleSave} >Save</button>
    </form>
    )
  }

}

export default FormStep;