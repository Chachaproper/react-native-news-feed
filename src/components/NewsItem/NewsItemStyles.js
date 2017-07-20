import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  newsContainer: {
    flex: 1,
    padding: 10,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 50 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    borderRadius: 2
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
    fontSize: 10
  },

  title: {
    color: '#333',
    fontSize: 13
  }
})
