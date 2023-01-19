import { Button, Col, Form, Row } from 'react-bootstrap'
import { Tag } from '../App'

type TagProps = {
   tag: Tag
   onUpdateTag: (id: string, label: string) => void
   onDeleteTag: (id: string) => void
}

const TagComponent = ({ tag, onUpdateTag, onDeleteTag }: TagProps) => {
   return (
      <Row key={tag.id}>
         <Col>
            <Form.Control
               type='text'
               value={tag.label}
               onChange={(e) => onUpdateTag(tag.id, e.target.value)}
            />
         </Col>
         <Col xs='auto'>
            <Button
               variant='outline-danger'
               onClick={() => onDeleteTag(tag.id)}
            >
               &times;
            </Button>
         </Col>
      </Row>
   )
}

export default TagComponent
