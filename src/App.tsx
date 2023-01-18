import { Container } from 'react-bootstrap'
import { Navigate, Route, Routes } from 'react-router-dom'
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

   const onSubmit = (data: NoteData) => {
      console.log(data)
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
               element={<NewNote onSubmit={onSubmit} />}
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
