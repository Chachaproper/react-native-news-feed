import { StyleSheet } from 'react-native'

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },

  cameraContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  img: {
    width: 300,
    height: 300
  },

  title: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 25,
    color: '#333'
  },

  preview: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },

  cameraToolbar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  }
})

export default loginStyles
