import { useHistory } from "react-router";
import './DeleteModal.css';

const DeleteModal = (props) => {
  const history = useHistory();
  const {deleteItem, setShowDeleteModal,fetchData} = props;
  const handleConfirmClick = () => {
    fetch(`https://www.cyconus.com/products/api/remove/?category=${deleteItem.category}&id=${deleteItem.id}&api_key=Rental123`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        alert(`deleted item#${deleteItem.id} from ${deleteItem.category}`)
        setShowDeleteModal(false)
        fetchData()
      })
  }

  const handleCancelClick = () => {
    setShowDeleteModal(false)
  }

  return (
    <div>
      <div className="overlay"></div>
      <div className="delete-modal-container">
          <p>Confirm removal of product: {}</p>
          <button onClick={handleConfirmClick}>Confirm</button>
          <button onClick={handleCancelClick}>Cancel</button>
      </div>
    </div>
  )
}

export default DeleteModal;