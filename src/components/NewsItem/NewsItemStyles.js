import { StyleSheet } from 'react-native'


export default StyleSheet.create({
  newsContainer: {
    flex:              1,
    padding:           15,
    flexDirection:     'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e4'
  },

  imgContainer: {
    marginRight: 10
  },

  newsImg: {
    width:  100,
    height: 100
  },

  textContainer: {
    flex: 1,
    padding:    10,
    alignItems: 'center'
  },

  text: {},

  title: {
    fontSize: 24
  }
})
