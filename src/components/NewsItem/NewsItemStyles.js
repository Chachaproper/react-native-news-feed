import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  newsContainer: {
    paddingHorizontal: 15
  },

  innerContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginBottom: 5,
    marginTop: 5,
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
    marginTop: 5,
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  date: {
    fontSize: 10
  },

  imgContainer: {},

  newsImg: {
    width: 50,
    height: 50
  },

  favicon: {
    width: 16,
    height: 16,
    marginRight: 7
  },

  alertButton: {
    width: 12,
    height: 12
  },

  textContainer: {
    flex: 1,
    marginRight: 10,
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
