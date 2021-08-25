function Confirmation(props) {
  let data = props.location.state && props.location.state.state
  let dataArr = Object.entries(data)

  function handleEditClick(){
    props.history.push('/')
  }

  function handleSaveClick() {
    console.log('saved to database')
  }

  return (
    <div>
      <h2>Confirmation</h2>
      { dataArr.map(item => {
        return (
          <p>{item[0] + ": " + item[1]}</p>
        )
      })}
      <button onClick={handleEditClick} >Edit</button>
      <button onClick={handleSaveClick} >Save</button>
    </div>
  )
}

export default Confirmation;