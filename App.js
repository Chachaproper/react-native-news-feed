import React, { PureComponent } from 'react'import { Image, TouchableOpacity, View, Text } from 'react-native'import { Provider } from 'react-redux'import { DrawerNavigator, StackNavigator } from 'react-navigation'import store from './src/redux/configureStore'import {  NEWS,  LOGIN,  NEWS_DETAILS,  LOGOUT,  FEATURES} from './src/constants/navigation'import {  HomeScreen,  NewDetailsScreen,  LoginScreen,  LogoutScreen,  FeaturesScreen} from './src/screens'import styles from './src/styles/styles'const AppNavigation = StackNavigator({  [LOGIN]: {    screen: LoginScreen,    navigationOptions: {      header: false,      drawerLockMode: 'locked-closed'    }  },  [NEWS]: {    screen: HomeScreen,    navigationOptions: {      title: 'Home'    }  },  [NEWS_DETAILS]: {    screen: NewDetailsScreen,    navigationOptions: {      title: false    }  }  /*  [FEATURES]: {      screen: FeaturesScreen,      navigationOptions: {        title: false      }    }*/}, {  initialRouteName: LOGIN,  headerMode: 'screen',  navigationOptions: props => {    return {      headerLeft: <HeaderRight {...props} />,      headerTitleStyle: { color: '#999' }      // gesturesEnabled: false    }  }})class HeaderRight extends PureComponent {  handleBack = () => {    this.props.navigation.goBack()  }  handleOpenMenu = () => {    this.props.navigation.navigate('DrawerOpen')  }  get isNewsScreen () {    return this.props.navigation.state.routeName === NEWS  }  render () {    return (      <View style={styles.leftButtons}>        <TouchableOpacity onPress={this.handleOpenMenu}>          <Image            style={styles.menuBtn}            source={require('./assets/hamburger.png')}          />        </TouchableOpacity>        {!this.isNewsScreen ? (          <TouchableOpacity onPress={this.handleBack}>            <Text style={styles.backBtn}>Back</Text>          </TouchableOpacity>        ) : null}      </View>    )  }}const Drawer = DrawerNavigator({  Drawer: { screen: AppNavigation },  // Features: { screen: FeaturesScreen },  [LOGOUT]: {    screen: LogoutScreen,    navigationOptions: {      title: 'Logout'    }  }})class App extends PureComponent {  render () {    return (      <Provider store={store}>        <Drawer />      </Provider>    )  }}export default App