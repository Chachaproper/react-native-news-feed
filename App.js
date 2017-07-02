import React from 'react'
import { AppRegistry } from 'react-native'
import { StackNavigator }from 'react-navigation'
import { HomeScreen, NewDetailsScreen } from './src/screens'

const Home = StackNavigator({
  Home:       { screen: HomeScreen },
  NewDetails: { screen: NewDetailsScreen }
})

AppRegistry.registerComponent('ExpoApp', () => Home)

export default Home

