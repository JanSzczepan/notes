import { FormEvent, useRef, useState } from 'react'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import CreatableReactSelect from 'react-select/creatable'
import { v4 as uuidv4 } from 'uuid'
import { NoteData, Tag } from '../App'

type NoteFormProps = {
   onSubmit: (data: NoteData) => void
   addTag: (tag: Tag) => void
   availableTags: Tag[]
}

const NoteForm = ({ onSubmit, addTag, availableTags }: NoteFormProps) => {
   const titleRef = useRef<HTMLInputElement>(null)
   const markdownRef = useRef<HTMLTextAreaElement>(null)

   const [selectedTags, setSelectedTags] = useState<Tag[]>([])

   const handleSubmit = (e: FormEvent) => {
      e.preventDefault()

      onSubmit({
         title: titleRef.current!.value,
         markdown: markdownRef.current!.value,
         tags: selectedTags,
      })
   }

   return (
      <Form onSubmit={handleSubmit}>
         <Stack gap={4}>
            <Row dir='hori'>
               <Col>
                  <Form.Group controlId='titel'>
                     <Form.Label>Title</Form.Label>
                     <Form.Control
                        ref={titleRef}
                        required
                     />
                  </Form.Group>
               </Col>
               <Col>
                  <Form.Group controlId='tags'>
                     <Form.Label>Tags</Form.Label>
                     <CreatableReactSelect
                        onCreateOption={(label) => {
                           const newTag = { id: uuidv4(), label }
                           addTag(newTag)
                           setSelectedTags((prevTags) => [...prevTags, newTag])
                        }}
                        value={selectedTags.map((tag) => ({ value: tag.id, label: tag.label }))}
                        options={availableTags.map((tag) => ({ value: tag.id, label: tag.label }))}
                        onChange={(tags) => setSelectedTags(tags.map((tag) => ({ id: tag.value, label: tag.label })))}
                        isMulti
                     />
                  </Form.Group>
               </Col>
            </Row>
            <Form.Group controlId='titel'>
               <Form.Label>Body</Form.Label>
               <Form.Control
                  ref={markdownRef}
                  as='textarea'
                  rows={15}
                  required
               />
            </Form.Group>
            <Stack
               className='justify-content-end'
               direction='horizontal'
               gap={2}
            >
               <Button
                  type='submit'
                  variant='primary'
               >
                  Save
               </Button>
               <Button
                  type='button'
                  variant='outline-secondary'
               >
                  Cancel
               </Button>
            </Stack>
         </Stack>
      </Form>
   )
}

export default NoteForm
