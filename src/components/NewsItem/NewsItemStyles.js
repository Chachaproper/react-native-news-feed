import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  newsContainer: {
    paddingHorizontal: 15
  },

  innerContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginBottom: 15,
    shadowColor: '#000',
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 50 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    borderRadius: 2
  },

  newsBody: {
    flex: 1,
    flexDirection: 'row'
  },

  statusBar: {
    marginBottom: 15
  },

  date: {
    fontSize: 10
  },

  imgContainer: {
    marginRight: 10
  },

  newsImg: {
    width: 50,
    height: 50
  },

  textContainer: {
    flex: 1,
    paddingLeft: 10,
    alignItems: 'center'
  },

  text: {
    color: '#5f5f5f',
    fontSize: 12
  },

  title: {
    color: '#333',
    fontSize: 14
  }
})
