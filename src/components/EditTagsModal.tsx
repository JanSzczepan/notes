import { FormEvent, useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Modal, Row, Stack } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'
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

   const addTagRef = useRef<HTMLInputElement>(null)

   useEffect(() => {
      setFilteredAvailableTags(availableTags)
   }, [show])

   const onUpdateTag = (id: string, label: string) => {
      setFilteredAvailableTags((prevTags) => prevTags.map((tag) => (tag.id === id ? { ...tag, label } : tag)))
   }

   const onDeleteTag = (id: string) => {
      setFilteredAvailableTags((prevTags) => prevTags.filter((tag) => tag.id !== id))
   }

   const onAddNewTag = (label: string) => {
      setFilteredAvailableTags((prevTags) => [...prevTags, { id: uuidv4(), label }])
   }

   const handleAddNewTag = () => {
      const value = addTagRef.current!.value

      if (value.trim() && filteredAvailableTags.findIndex((tag) => tag.label === value) === -1) {
         onAddNewTag(value)
         addTagRef.current!.value = ''
      }
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
                  <Row>
                     <Col>
                        <Form.Control
                           ref={addTagRef}
                           type='text'
                           placeholder='Add a new tag...'
                        />
                     </Col>
                     <Col xs='auto'>
                        <Button
                           variant='success'
                           onClick={handleAddNewTag}
                           style={{ minWidth: '40px' }}
                        >
                           &#x2713;
                        </Button>
                     </Col>
                  </Row>
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
