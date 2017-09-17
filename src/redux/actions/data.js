import db from '../../storage/firebase'
import { NetInfo } from 'react-native'
import {
  SYNC_FIREBASE, UPDATE_NOTES, REMOVE_NOTE,
  CHANGE_NETWORK, ADD_TRANSACTION
} from '../constants/data'
import { LOGOUT } from '../constants/auth'
import { isEqual, reduce } from 'lodash'

export function syncFirebase () {
  return (dispatch, getState) => {
    const { user } = getState().auth

    db().refs.journals.child(user.uid)
      .on('child_added', journalSnap => {
        return db().refs.notes.child(journalSnap.key).on('value', noteSnap => {
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

    db().refs.journals.child(user.uid)
      .on('child_removed', journalSnap => {
        db().refs.notes.child(journalSnap.key).remove()
        dispatch(removeNote(journalSnap.key))
      })

    db().auth.onAuthStateChanged(user => {
      if (!user) {
        console.log('USER NOT FOUND')
        dispatch({ type: LOGOUT })
      }
    })

    NetInfo.isConnected.fetch().then(isConnected => {
      console.warn('Start', isConnected)
      return dispatch({ type: CHANGE_NETWORK, payload: isConnected })
    })

    NetInfo.isConnected.addEventListener('connectionChange', isConnected => {
      dispatch({ type: CHANGE_NETWORK, payload: isConnected })
      const { transactions } = getState()

      console.warn('START:', isConnected && transactions.length)
      if (isConnected && transactions.length) {
        transactions.forEach(t => dispatch(updateNote(t.oldNote, t.newNote)))
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

export function addNote (note) {
  return (dispatch, getState) => {
    let notes = [...getState().notes]
    const oldNoteIndex = notes.findIndex(n => n._id === note._id)
    if (~oldNoteIndex) notes[oldNoteIndex] = { ...notes[oldNoteIndex], ...note }
    else notes = [note, ...notes]
    return dispatch({ type: UPDATE_NOTES, payload: notes })
  }
}

export function updateNote (oldNote, newNote) {
  return (dispatch, getState) => {
    const state = getState()
    const isConnected = state.network
    const { transactions } = state
    if (isConnected) {
      const filteredTransacitions = transactions.filter(
        t => t.oldNote._id !== oldNote._id)
      if (transactions.length !== filteredTransacitions.length) {
        dispatch({
          type: ADD_TRANSACTION,
          payload: filteredTransacitions
        })
      }

      db().refs.notes.child(oldNote._id).transaction(remoteNote => {
        if (remoteNote && !isEqual(remoteNote, oldNote)) {
          newNote = reduce(newNote, (memo, value, key) => {
            const isNewValue = value !== oldNote[key] && oldNote[key] ===
              remoteNote[key]
            memo[key] = isNewValue ? value : remoteNote[key]
            return memo
          }, {})
        }
        return newNote
      })
        .catch(err => console.error(err.message))
    } else {
      const transaction = {
        oldNote: oldNote,
        newNote: newNote
      }
      let newTransactions = [...transactions]
      const oldTransactionIndex = newTransactions.findIndex(t => {
        return t.oldNote._id === oldNote._id
      })
      if (~oldTransactionIndex) newTransactions[oldTransactionIndex] = { ...newTransactions[oldTransactionIndex], ...transaction }
      else newTransactions = [transaction, ...newTransactions]
      dispatch({ type: ADD_TRANSACTION, payload: newTransactions })
      dispatch(addNote({ _id: oldNote._id, ...newNote }))
    }
  }
}
