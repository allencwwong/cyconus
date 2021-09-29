import Modal from "react-bootstrap-modal";
import BsCarousel from './Carousel'
import './Modal.scss'

const BsModal = ({ closeModal, isShown, modalData }) => {
  if(modalData){
      const imgUrls = [modalData.img,modalData.img2,modalData.img3,modalData.img4,modalData.img5]
      return (
        <Modal show={isShown} onHide={closeModal} aria-labelledby="ModalHeader">
          <Modal.Header closeButton>
            <Modal.Title id="ModalHeader">
              {modalData ? `${modalData.brand}` : "Loading..."}
            </Modal.Title>
          </Modal.Header>
          {modalData ? (
            <Modal.Body>
                <div className="row">
                    <div className="col-12 col-lg-7">
                        <div className="row">
                            <div className="col-12 modal-row">
                                <span className="label">product id:</span>
                                <span>{modalData.pid}</span>
                            </div>
                            <div className="col-12 modal-row">
                                <span className="label">brand:</span> 
                                <span>{modalData.brand}</span>
                            </div>
                            <div className="col-12 modal-row">
                                <span className="label">type:</span> 
                                <span>{modalData.type}</span>
                            </div>
                            <div className="col-12 modal-row">
                                <div className="row">
                                    <div className="col-4">
                                        <span className="label">condition:</span> 
                                        <span>{modalData.condition}</span>
                                    </div>
                                    <div className="col-4">
                                        <span className="label">color:</span> 
                                        <span>{modalData.color}</span>
                                    </div>
                                    <div className="col-4">
                                        <span className="label">size:</span> 
                                        <span>{modalData.size}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 modal-row">
                                <span className="label">Description</span> 
                                <p className="modal-desc">{modalData.description}</p>
                            </div>
                            <div className="col-12 modal-row">
                                <div className="row">
                                    <div className="col-6">
                                        {
                                            modalData.price_name1 ? (<span className={`${modalData.price_name1 ? 'label' : 'bold'}`}>{modalData.price_name1}</span> ) : null
                                        }
                                        {
                                            modalData.price1 ? (<span className={`${modalData.price_name1 ? 'label' : 'bold'}`}>${modalData.price1}</span>) :null
                                        }
                                    </div>
                                    <div className="col-6">
                                        {
                                            modalData.price_name2 ? (<span className={`${modalData.price_name2 ? 'label' : 'bold'}`}>{modalData.price_name2}</span> ) : null
                                        }
                                        {
                                            modalData.price2 ? (<span className={`${modalData.price_name2 ? 'label' : 'bold'}`}>${modalData.price2}</span>) :null
                                        }
                                    </div>
                                </div>
                            </div>
                            { modalData.note ? (
                                <div className="col-12 modal-row">
                                    Note: {modalData.note}
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div className="col-12 col-lg-5">
                        <BsCarousel imgUrls={imgUrls} />
                    </div>
                </div>
            </Modal.Body>
          ) : null}
        </Modal>
      );
  }
  return (
    <Modal show={isShown} onHide={closeModal} aria-labelledby="ModalHeader">
        <Modal.Header closeButton>
        <Modal.Title id="ModalHeader">
            {modalData ? `${modalData.brand}` : "Loading..."}
        </Modal.Title>
        </Modal.Header>
    </Modal>
    )
};

export default BsModal;
