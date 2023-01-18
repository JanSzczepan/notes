import { NoteData, Tag } from '../App'
import NoteForm from '../components/NoteForm'

type NewNoteProps = {
   onSubmit: (data: NoteData) => void
   addTag: (tag: Tag) => void
   availableTags: Tag[]
}

const NewNote = ({ onSubmit, addTag, availableTags }: NewNoteProps) => {
   return (
      <>
         <h1 className='mb-4'>New Note</h1>
         <NoteForm
            onSubmit={onSubmit}
            addTag={addTag}
            availableTags={availableTags}
         />
      </>
   )
}

export default NewNote
