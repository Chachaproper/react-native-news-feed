import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  centerLoader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8
  },

  hide: {
    flex: 0,
    width: 0,
    height: 0,
    display: 'none',
    position: 'absolute'
  },

  headerLogo: {
    height: 28,
    width: 90,
    marginRight: 10
  },

  menuBtn: {
    height: 25,
    width: 25,
    marginLeft: 10
  },

  backBtn: {
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold'
  },

  leftButtons: {
    flexDirection: 'row'
  }
})

export default styles
