import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  newsContainer: {
    paddingHorizontal: 15
  },

  innerContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 10,
    marginBottom: 5,
    marginTop: 5,
    shadowColor: '#000',
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
    borderRadius: 2
  },

  date: {
    color: '#333'
  },

  text: {
    color: '#5f5f5f',
    fontSize: 12
  },

  title: {
    fontSize: 12,
    color: '#333'
  }
})
