import { Container } from 'react-bootstrap'
import { Navigate, Route, Routes } from 'react-router-dom'
import NewNote from './pages/NewNote'

const App = () => {
   return (
      <Container className='py-4'>
         <Routes>
            <Route
               path='/'
               element={<h1>Hi</h1>}
            />
            <Route
               path='/new'
               element={<NewNote />}
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
