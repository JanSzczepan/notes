import { Container } from 'react-bootstrap'
import { Navigate, Route, Routes } from 'react-router-dom'
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

const App = () => {
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
