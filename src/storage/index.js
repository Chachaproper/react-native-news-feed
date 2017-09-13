import { AsyncStorage } from 'react-native'

export const STORAGE_NAME = '@HelloAppStorage'

export class Storage {
  constructor () {
    this.storageName = STORAGE_NAME
  }

  user (value) {
    if (value) return this.set('user', JSON.stringify(value))
    return this.get('user')
  }

  get (name) {
    return AsyncStorage.getItem(`${this.storageName}:${name}`)
  }

  set (name, value) {
    return AsyncStorage.setItem(`${this.storageName}:${name}`, value)
  }

  remove (name) {
    return AsyncStorage.removeItem(`${this.storageName}:${name}`)
  }
}

const storage = new Storage()

export default storage
