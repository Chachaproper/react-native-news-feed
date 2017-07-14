import React from 'react'
import { WebView, View } from 'react-native'
import Loader from '../../components/Loader/Loader'
import styles from '../../styles/styles'
import Layout from '../../components/Layout/Layout'

export class NewDetailsScreen extends Layout {
  static navigationOptions = {
    title: 'Details'
  }

  state = { isLoad: false }

  handleLoad = () => {
    this.setState({ isLoad: true })
  }

  render() {
    const { isLoad } = this.state

    return (
      <View style={styles.container}>
        {isLoad ? null : <Loader/>}
        <WebView
          source={{ uri: 'https://en.wikipedia.org/wiki/Special:Random' }}
          style={isLoad ? styles.container : styles.hide}
          onLoad={this.handleLoad}
          scalesPageToFit={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        >
        </WebView>
      </View>
    )
  }
}
