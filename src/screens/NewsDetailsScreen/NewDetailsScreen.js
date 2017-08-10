import React from 'react'
import { View, Image, Text } from 'react-native'
import styles from './NewDetailsScreenStyles'
import Layout from '../../components/Layout/Layout'

export class NewDetailsScreen extends Layout {
  static navigationOptions = {
    title: 'Details'
  }

  render () {
    const { content } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{content.title}</Text>
        <View style={styles.content}>
          <Image source={{ uri: content.img }} style={styles.img} />
          <Text style={styles.text}>{content.description}</Text>
        </View>
      </View>
    )
  }
}
