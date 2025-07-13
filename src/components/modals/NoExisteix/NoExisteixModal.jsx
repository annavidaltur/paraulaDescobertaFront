import { Modal } from 'react-bootstrap';

const NoExisteixModal = ({isOpen, onClose}) => {
    if (!isOpen) return null;

    return(

    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Body className="text-center">No existeix la paraula</Modal.Body>
    </Modal>
    
    
    // <CustomModal
    //     isOpen={isOpen}
    //     onClose={onClose}
    //     title=""
    //     body={
    //         <span>La paraula no està en la llista</span>
    //     }
    // />
)
}

export default NoExisteixModal;