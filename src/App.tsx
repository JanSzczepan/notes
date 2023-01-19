import { useMemo } from 'react'
import { Container } from 'react-bootstrap'
import { Navigate, Route, Routes } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Note from './components/Note'
import useLocalStorage from './hooks/useLocalStorage'
import EditNote from './pages/EditNote'
import NewNote from './pages/NewNote'
import NoteLayout from './pages/NoteLayout'
import NoteList from './pages/NoteList'

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
      setNotes((prevNotes) => [...prevNotes, { ...data, id: uuidv4(), tagIds: tags.map((tag) => tag.id) }])
   }

   const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
      setNotes((prevNotes) => prevNotes.map((note) => (note.id === id ? { ...note, ...data, tagIds: tags.map((tag) => tag.id) } : note)))
   }

   const onDeleteNote = (id: string) => {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id))
   }

   const onAddTag = (tag: Tag) => {
      setTags((prevTags) => [...prevTags, tag])
   }

   const onUpdateTag = (id: string, label: string) => {
      setTags((prevTags) => prevTags.map((tag) => (tag.id === id ? { ...tag, label } : tag)))
   }

   const onDeleteTag = (id: string) => {
      setTags((prevTags) => prevTags.filter((tag) => tag.id !== id))
   }

   return (
      <Container className='py-4'>
         <Routes>
            <Route
               path='/'
               element={
                  <NoteList
                     availableTags={tags}
                     notes={notesWithTags}
                     onUpdateTag={onUpdateTag}
                     onDeleteTag={onDeleteTag}
                  />
               }
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
            <Route
               path='/:id'
               element={<NoteLayout notes={notesWithTags} />}
            >
               <Route
                  index
                  element={<Note onDelete={onDeleteNote} />}
               />
               <Route
                  path='edit'
                  element={
                     <EditNote
                        onSubmit={onUpdateNote}
                        addTag={onAddTag}
                        availableTags={tags}
                     />
                  }
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
