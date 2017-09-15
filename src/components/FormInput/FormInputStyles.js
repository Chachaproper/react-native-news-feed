import { StyleSheet } from 'react-native'

const inputStyles = StyleSheet.create({
  input: {
    height: 35,
    padding: 10
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#cfd7dd',
    marginTop: 20,
    flex: 1
  },
  valid: {
    borderColor: '#53E69D'
  },
  invalid: {
    borderColor: '#F55E64'
  }
})

export default inputStyles
