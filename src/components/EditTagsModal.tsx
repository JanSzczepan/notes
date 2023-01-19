import { FormEvent, useEffect, useState } from 'react'
import { Button, Form, Modal, Stack } from 'react-bootstrap'
import { Tag } from '../App'
import TagComponent from './Tag'

type EditTagsModalProps = {
   availableTags: Tag[]
   show: boolean
   handleClose: () => void
   updateTags: (tags: Tag[]) => void
}

const EditTagsModal = ({ availableTags, updateTags, show, handleClose }: EditTagsModalProps) => {
   const [filteredAvailableTags, setFilteredAvailableTags] = useState<Tag[]>(availableTags)

   useEffect(() => {
      setFilteredAvailableTags(availableTags)
   }, [show])

   const onUpdateTag = (id: string, label: string) => {
      setFilteredAvailableTags((prevTags) => prevTags.map((tag) => (tag.id === id ? { ...tag, label } : tag)))
   }

   const onDeleteTag = (id: string) => {
      setFilteredAvailableTags((prevTags) => prevTags.filter((tag) => tag.id !== id))
   }

   const handleSubmit = (e: FormEvent) => {
      e.preventDefault()

      updateTags(filteredAvailableTags)
      handleClose()
   }

   return (
      <Modal
         show={show}
         onHide={handleClose}
      >
         <Modal.Header closeButton>
            <Modal.Title>Edit Tags</Modal.Title>
         </Modal.Header>
         <Form onSubmit={handleSubmit}>
            <Modal.Body>
               <Stack gap={2}>
                  {filteredAvailableTags.map((tag) => (
                     <TagComponent
                        tag={tag}
                        onUpdateTag={onUpdateTag}
                        onDeleteTag={onDeleteTag}
                        key={tag.id}
                     />
                  ))}
               </Stack>
            </Modal.Body>
            <Modal.Footer>
               <Stack
                  gap={2}
                  direction='horizontal'
               >
                  <Button
                     variant='primary'
                     type='submit'
                  >
                     Save
                  </Button>
                  <Button
                     variant='outline-secondary'
                     onClick={handleClose}
                     type='button'
                  >
                     Cancel
                  </Button>
               </Stack>
            </Modal.Footer>
         </Form>
      </Modal>
   )
}

export default EditTagsModal
