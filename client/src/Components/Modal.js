import Modal from 'react-bootstrap-modal'

const BsModal = ({closeModal,isShown,modalData})=>{
    console.log(isShown)
    return(
        <Modal
            show={isShown}
            onHide={closeModal}
            aria-labelledby="ModalHeader"
        >
        <Modal.Header closeButton>
        <Modal.Title id='ModalHeader'>{modalData ? modalData.pid : 'Loading...' }</Modal.Title>
        </Modal.Header>
        {
            modalData ? 
            (
                <Modal.Body>
                    <p>Some Content here</p>
                </Modal.Body>
            ) : null
        }
        <Modal.Footer>
        <Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>
        </Modal.Footer>
    </Modal>
    )
}

export default BsModal