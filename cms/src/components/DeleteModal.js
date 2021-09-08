const DeleteModal = (props) => {
  const {deleteItem, setShowDeleteModal} = props;
  const handleConfirmClick = () => {
    fetch(`https://www.cyconus.com/products/api/remove/?category=${deleteItem.category}&id=${deleteItem.id}&api_key=Rental123`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(res => console.log(res))
  }

  const handleCancelClick = () => {
    setShowDeleteModal(false)
  }

  return (
    <div className="delete-modal-container">
        <p>Confirm removal of product: {}</p>
        <button onClick={handleConfirmClick}>Confirm</button>
        <button onClick={handleCancelClick}>Cancel</button>
    </div>
  )
}

export default DeleteModal;