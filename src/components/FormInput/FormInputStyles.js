import { StyleSheet } from 'react-native'


const inputStyles = StyleSheet.create({
  input:          {
    height:  30,
    padding: 5,
    color: 'white'
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderColor:       'rgba(0, 0, 0, 0.4)',
    marginTop:         20
  },
  valid:          {
    borderColor: '#53E69D'
  },
  invalid:        {
    borderColor: '#F55E64'
  }
})


export default inputStyles
