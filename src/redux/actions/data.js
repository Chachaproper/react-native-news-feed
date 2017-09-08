import db from '../../storage/firebase'
import { SYNC_FIREBASE, ADD_NOTE, REMOVE_NOTE } from '../constants/data'

export function syncFirebase () {
  return (dispatch, getState) => {
    const { user } = getState().auth

    db.refs.journals.child(user.uid)
      .on('child_added', journalSnap => {
        console.info('journal', journalSnap.val(), journalSnap.key)
        return db.refs.notes.child(journalSnap.key).on('value', noteSnap => {
          console.info('note', noteSnap.val())
          if (!noteSnap.val()) return
          return dispatch({
            type: ADD_NOTE,
            payload: { _id: noteSnap.key, ...noteSnap.val() }
          })
        })
      })

    db.refs.journals.child(user.uid)
      .on('child_removed', journalSnap => {
        console.log('removed', journalSnap.key)
        db.refs.notes.child(journalSnap.key).remove()
        dispatch(removeNote(journalSnap.key))
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
