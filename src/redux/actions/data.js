import db from '../../storage/firebase'
import { SYNC_FIREBASE, UPDATE_NOTES, REMOVE_NOTE } from '../constants/data'
import { LOGOUT } from '../constants/auth'

export function syncFirebase () {
  return (dispatch, getState) => {
    const { user } = getState().auth

    db.refs.journals.child(user.uid)
      .on('child_added', journalSnap => {
        return db.refs.notes.child(journalSnap.key).on('value', noteSnap => {
          if (!noteSnap.val()) return

          let notes = [...getState().notes]
          const newNote = { _id: noteSnap.key, ...noteSnap.val() }
          const oldNoteIndex = notes.findIndex(n => n._id === newNote._id)
          if (~oldNoteIndex) notes[oldNoteIndex] = newNote
          else notes = [newNote, ...notes]
          return dispatch({
            type: UPDATE_NOTES,
            payload: notes
          })
        })
      })

    db.refs.journals.child(user.uid)
      .on('child_removed', journalSnap => {
        db.refs.notes.child(journalSnap.key).remove()
        dispatch(removeNote(journalSnap.key))
      })

    db.auth.onAuthStateChanged(user => {
      if (!user) {
        console.log('USER NOT FOUND')
        dispatch({ type: LOGOUT })
      }
    })

    return dispatch({ type: SYNC_FIREBASE.START })
  }
}

export function removeNote (id) {
  return (dispatch, getState) => {
    const { notes } = getState()
    const newNotes = notes.filter(n => n._id !== id)
    return dispatch({ type: REMOVE_NOTE, payload: newNotes })
  }
}
