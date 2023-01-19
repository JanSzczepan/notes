import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Form, Row, Stack } from 'react-bootstrap'
import ReactSelect from 'react-select'
import { Note, Tag } from '../App'
import NoteCard from '../components/NoteCard/NoteCard'
import EditTagsModal from '../components/EditTagsModal'
import DeleteAllModal from '../components/DeleteAllModal'

type NoteListProps = {
   availableTags: Tag[]
   notes: Note[]
   updateTags: (tags: Tag[]) => void
   deleteAllNotes: () => void
}

const NoteList = ({ availableTags, notes, updateTags, deleteAllNotes }: NoteListProps) => {
   const [title, setTitle] = useState('')
   const [selectedTags, setSelectedTags] = useState<Tag[]>([])

   const [isEditTagsModalOpen, setIsEditTagsModalOpen] = useState(false)
   const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false)

   const filteredNotes = useMemo(() => {
      return notes.filter((note) => {
         return (title === '' || note.title.toLowerCase().includes(title.toLowerCase())) && (selectedTags.length === 0 || selectedTags.every((selectedTag) => note.tags.some((tag) => tag.id === selectedTag.id)))
      })
   }, [notes, title, selectedTags])

   return (
      <>
         <Row className='align-items-center mb-4'>
            <Col>
               <h1>Notes</h1>
            </Col>
            <Col xs='auto'>
               <Stack
                  gap={2}
                  direction='horizontal'
               >
                  <Link to='/new'>
                     <Button variant='primary'>Create</Button>
                  </Link>
                  <Button
                     variant='outline-secondary'
                     onClick={() => setIsEditTagsModalOpen(true)}
                  >
                     Edit Tags
                  </Button>
                  <Button
                     variant='outline-danger'
                     onClick={() => setIsDeleteAllModalOpen(true)}
                  >
                     Delete All
                  </Button>
               </Stack>
            </Col>
         </Row>
         <Form className='mb-4'>
            <Row>
               <Col>
                  <Form.Group controlId='title'>
                     <Form.Label>Title</Form.Label>
                     <Form.Control
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type='text'
                     ></Form.Control>
                  </Form.Group>
               </Col>
               <Col>
                  <Form.Group controlId='tags'>
                     <Form.Label>Tags</Form.Label>
                     <ReactSelect
                        value={selectedTags.map((tag) => ({ value: tag.id, label: tag.label }))}
                        options={availableTags.map((tag) => ({ value: tag.id, label: tag.label }))}
                        onChange={(tags) => setSelectedTags(tags.map((tag) => ({ id: tag.value, label: tag.label })))}
                        isMulti
                     />
                  </Form.Group>
               </Col>
            </Row>
         </Form>
         <Row
            xs={1}
            sm={2}
            lg={3}
            xl={4}
            className='g-3'
         >
            {filteredNotes.map(({ id, title, tags }) => (
               <Col key={id}>
                  <NoteCard
                     id={id}
                     title={title}
                     tags={tags}
                  />
               </Col>
            ))}
         </Row>
         <EditTagsModal
            availableTags={availableTags}
            show={isEditTagsModalOpen}
            handleClose={() => setIsEditTagsModalOpen(false)}
            updateTags={updateTags}
         />
         <DeleteAllModal
            show={isDeleteAllModalOpen}
            handleClose={() => setIsDeleteAllModalOpen(false)}
            deleteAllNotes={deleteAllNotes}
         />
      </>
   )
}

export default NoteList
