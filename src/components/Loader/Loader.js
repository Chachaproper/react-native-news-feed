import React, { PureComponent } from 'react'
import { ActivityIndicator, View } from 'react-native'
import styles from '../../styles/styles'
import loaderStyles from './LoaderStyles'

export default class Loader extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          style={loaderStyles.centerLoader}
          size="large"
        />
      </View>
    )
  }
}
