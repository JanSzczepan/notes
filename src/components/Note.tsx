import { Badge, Button, Col, Row, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import useNote from '../hooks/useNote'

const Note = () => {
   const { title, markdown, tags, id } = useNote()

   return (
      <>
         <Row className='align-items-center mb-4'>
            <Col>
               <h1>{title}</h1>
               {tags.length > 0 && (
                  <Stack
                     gap={1}
                     direction='horizontal'
                     className='flex-wrap'
                  >
                     {tags.map((tag) => (
                        <Badge
                           key={tag.id}
                           className='text-truncate'
                           bg='primary'
                        >
                           {tag.label}
                        </Badge>
                     ))}
                  </Stack>
               )}
            </Col>
            <Col xs='auto'>
               <Stack
                  gap={2}
                  direction='horizontal'
               >
                  <Link to={`/${id}/edit`}>
                     <Button variant='primary'>Edit</Button>
                  </Link>
                  <Button variant='outline-danger'>Delete</Button>
                  <Link to='..'>
                     <Button variant='outline-secondary'>Back</Button>
                  </Link>
               </Stack>
            </Col>
         </Row>
         <ReactMarkdown>{markdown}</ReactMarkdown>
      </>
   )
}

export default Note
