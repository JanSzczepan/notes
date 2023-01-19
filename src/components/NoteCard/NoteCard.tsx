import { Link } from 'react-router-dom'
import { Badge, Card, Stack } from 'react-bootstrap'
import { Tag } from '../../App'
import styles from './NoteCard.module.css'

type NodeCardProps = {
   id: string
   title: string
   tags: Tag[]
}

const NoteCard = ({ id, title, tags }: NodeCardProps) => {
   return (
      <Card
         as={Link}
         to={`/${id}`}
         className={`h-100 text-reset text-decoration-none ${styles.card}`}
      >
         <Card.Body>
            <Stack
               gap={2}
               className='align-items-center justify-content-center h-100'
            >
               <span className='fs-5'>{title}</span>
               {tags.length > 0 && (
                  <Stack
                     gap={1}
                     direction='horizontal'
                     className='flex-wrap justify-content-center '
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
            </Stack>
         </Card.Body>
      </Card>
   )
}

export default NoteCard
