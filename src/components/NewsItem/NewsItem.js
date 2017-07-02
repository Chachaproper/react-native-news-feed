import React, { PureComponent } from 'react'
import { Image, Text, View, TouchableOpacity } from 'react-native'
import styles from './NewsItemStyles'


export default class NewsItem extends PureComponent {
  render() {
    const { news, onPress } = this.props

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.newsContainer}>
          <View style={styles.imgContainer}>
            <Image source={{ uri: news.img }} style={styles.newsImg}/>
          </View>
          <View style={styles.textContainer}>
            <View style={styles.text}>
              <Text style={styles.title}>{news.title}</Text>
              <Text>{news.description}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
