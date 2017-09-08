import * as firebase from 'firebase'

export const config = {
  apiKey: 'AIzaSyCbNw-ajEj5xnJNxlgDkBfS7-0oJS59fTs',
  authDomain: 'casekeepers-4b528.firebaseapp.com',
  databaseURL: 'https://casekeepers-4b528.firebaseio.com',
  projectId: 'casekeepers-4b528',
  storageBucket: 'casekeepers-4b528.appspot.com',
  messagingSenderId: '752992849544'
}

export class Db {
  constructor (config) {
    this.config = config
    this.firebaseApp = firebase.initializeApp(config)
    this.auth = firebase.auth()
    this.db = this.firebaseApp.database()
    this.refs = {
      journals: this.db.ref('journals'),
      notes: this.db.ref('notes')
    }
  }
}

export default new Db(config)
