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
    marginTop: 10,
    marginBottom: 10,
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
  },

  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  progressText: {
    paddingTop: 10,
    fontSize: 16,
    color: '#fff'
  },

  button: {
    padding: 5,
    backgroundColor: 'gray'
  },

  disabledButtonText: {
    color: '#eee'
  },

  buttonText: {
    fontSize: 16,
    color: '#fff'
  },

  activeButtonText: {
    fontSize: 16,
    color: '#B81F00'
  }
})

export default loginStyles
