import { StyleSheet } from 'react-native'

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },

  content: {
    flex: 1,
    flexDirection: 'row'
  },

  img: {
    width: 100,
    height: 100,
    marginRight: 10
  },

  title: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 25,
    color: '#333'
  },

  text: {
    flex: 1,
    fontSize: 14
  },

  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  cameraToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  }
})

export default loginStyles
