import { StyleSheet } from 'react-native'

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },

  content: {
    flex: 1,
    flexDirection: 'row'
  },

  img: {
    width: 100,
    height: 100,
    marginRight: 10
  },

  title: {
    fontSize: 16,
    marginBottom: 25,
    color: '#333'
  },

  text: {
    flex: 1,
    fontSize: 14
  },

  titleWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15
  },

  fakeBtnWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },

  fakeBtn: {
    height: 20,
    fontSize: 18,
    marginLeft: 10
  }
})

export default loginStyles
