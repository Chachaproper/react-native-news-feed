import { StyleSheet } from 'react-native'

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: 'white'
  },

  formContainer: {
    width: 250
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 40
  },

  logo: {
    width: 150,
    height: 112
  },

  title: {
    fontSize: 18,
    textAlign: 'center'
  }
})

export default loginStyles
