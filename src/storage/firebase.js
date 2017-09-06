import * as firebase from 'firebase'

export const config = {
  apiKey: 'AIzaSyCbNw-ajEj5xnJNxlgDkBfS7-0oJS59fTs',
  authDomain: 'casekeepers-4b528.firebaseapp.com',
  databaseURL: 'https://casekeepers-4b528.firebaseio.com',
  projectId: 'casekeepers-4b528',
  storageBucket: 'casekeepers-4b528.appspot.com',
  messagingSenderId: '752992849544'
}

export const firebaseApp = firebase.initializeApp(config)
export const database = firebaseApp.database()
const dbRefObject = database.ref().child('object')
const dbRefList = dbRefObject.child('users')

dbRefObject.on('value', snap => {
  console.log('value', snap.val())
})

dbRefList.on('child_added', snap => {
  console.log('child', snap.val())
})
