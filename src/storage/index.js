import { AsyncStorage } from 'react-native'

export const STORAGE_NAME = '@HelloAppStorage'

export class Storage {
  constructor () {
    this.storageName = STORAGE_NAME
  }

  login (value) {
    if (value) return this.set('login', value)
    return this.get('login')
  }

  get (name) {
    return AsyncStorage.getItem(`${this.storageName}:${name}`)
  }

  set (name, value) {
    return AsyncStorage.setItem(`${this.storageName}:${name}`, value)
  }
}

const storage = new Storage()

export default storage
