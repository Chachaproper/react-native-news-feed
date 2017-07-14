import { AsyncStorage } from 'react-native'

export const storageName = '@HelloAppStorage'

const storage = new Proxy(AsyncStorage, {
  get(target, prop) {
    return target.getItem(`${storageName}:${prop}`)
  },
  set(target, prop, value) {
    return target.setItem(`${storageName}:${prop}`, value)
  }
})

export default storage
