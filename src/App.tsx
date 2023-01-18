import { useMemo } from 'react'
import { Container } from 'react-bootstrap'
import { Navigate, Route, Routes } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import useLocalStorage from './hooks/useLocalStorage'
import NewNote from './pages/NewNote'

export type Tag = {
   id: string
   label: string
}

export type NoteData = {
   title: string
   markdown: string
   tags: Tag[]
}

export type Note = {
   id: string
} & NoteData

export type RawNoteData = {
   title: string
   markdown: string
   tagIds: string[]
}

export type RawNote = {
   id: string
} & RawNoteData

const App = () => {
   const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
   const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

   const notesWithTags = useMemo(() => {
      return notes.map((note) => {
         return { ...note, tags: tags.filter((tag) => note.tagIds.includes(tag.id)) }
      })
   }, [notes, tags])

   const onCreateNote = ({ tags, ...data }: NoteData) => {
      setNotes((prevNotes) => {
         return [...prevNotes, { ...data, id: uuidv4(), tagIds: tags.map((tag) => tag.id) }]
      })
   }

   const onAddTag = (tag: Tag) => {
      setTags((prevTags) => [...prevTags, tag])
   }

   return (
      <Container className='py-4'>
         <Routes>
            <Route
               path='/'
               element={<h1>Hi</h1>}
            />
            <Route
               path='/new'
               element={
                  <NewNote
                     onSubmit={onCreateNote}
                     addTag={onAddTag}
                     availableTags={tags}
                  />
               }
            />
            <Route path='/:id'>
               <Route
                  index
                  element={<h1>Show</h1>}
               />
               <Route
                  path='edit'
                  element={<h1>Edit</h1>}
               />
            </Route>
            <Route
               path='*'
               element={<Navigate to='/' />}
            />
         </Routes>
      </Container>
   )
}

export default App
