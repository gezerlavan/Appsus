import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function NoteAdd() {

    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        setNoteToAdd(prevNoteToEdit => {
            if (field === 'txt') {
                return {
                    ...prevNoteToEdit,
                    info: { ...prevNoteToEdit.info, txt: value }
                }
            }
            return { ...prevNoteToEdit, [field]: value }
        })
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(noteToAdd)
            .then(() => console.log('added'))
            .catch(err => console.log('err:', err))
    }

    const { info } = noteToAdd

    return (
        <section className="note-add">
            <form onSubmit={onSaveNote}>
                <input onChange={handleChange} value={info.txt} type="text" name="txt" />
            </form>
        </section>
    )
}