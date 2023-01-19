import { NoteData, Tag } from '../App'
import NoteForm from '../components/NoteForm'
import useNote from '../hooks/useNote'

type EditNoteProps = {
   onSubmit: (id: string, data: NoteData) => void
   addTag: (tag: Tag) => void
   availableTags: Tag[]
}

const EditNote = ({ onSubmit, addTag, availableTags }: EditNoteProps) => {
   const note = useNote()

   return (
      <>
         <h1 className='mb-4'>Edit Note</h1>
         <NoteForm
            onSubmit={(data) => onSubmit(note.id, data)}
            addTag={addTag}
            availableTags={availableTags}
            title={note.title}
            markdown={note.markdown}
            tags={note.tags}
         />
      </>
   )
}

export default EditNote
