import { Button, Modal, Stack } from 'react-bootstrap'

type DeleteAllModalProps = {
   show: boolean
   handleClose: () => void
   deleteAllNotes: () => void
}

const DeleteAllModal = ({ show, handleClose, deleteAllNotes }: DeleteAllModalProps) => {
   const handleDeleteAllNotes = () => {
      deleteAllNotes()
      handleClose()
   }

   return (
      <Modal
         show={show}
         onHide={handleClose}
      >
         <Modal.Header closeButton>
            <Modal.Title>Delete All</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <span className='fs-6'>Do you really want to delete all of yours notes?</span>
         </Modal.Body>
         <Modal.Footer>
            <Stack
               gap={2}
               direction='horizontal'
            >
               <Button
                  variant='danger'
                  onClick={handleDeleteAllNotes}
               >
                  Delete
               </Button>
               <Button
                  variant='outline-secondary'
                  onClick={handleClose}
               >
                  Cancel
               </Button>
            </Stack>
         </Modal.Footer>
      </Modal>
   )
}

export default DeleteAllModal
