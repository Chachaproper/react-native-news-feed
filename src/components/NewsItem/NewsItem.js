import React, { PureComponent } from 'react'
import moment from 'moment'
import { Text, View, Animated, TouchableOpacity } from 'react-native'
import Swipeable from 'react-native-swipeable'
import styles from './NewsItemStyles'

const ANIMATION_DURATION = 250
const ROW_HEIGHT = 100

export default class NewsItem extends PureComponent {
  animated = new Animated.Value(0)

  state = { rowLeft: 0 }

  handlerRemove = () => {
    const { onRemove } = this.props
    this.setState({ rowLeft: 1000 }, () => {
      Animated.timing(this.animated, {
        toValue: 0,
        duration: ANIMATION_DURATION
      }).start(() => onRemove())
    })
  }

  componentDidMount () {
    Animated.timing(this.animated, {
      toValue: 1,
      duration: ANIMATION_DURATION
    }).start()
  }

  render () {
    const { rowLeft } = this.state
    const { news, onPress } = this.props

    const rowStyles = [
      styles.newsContainer,
      {
        transform: [
          { scale: this.animated }
        ]
      },

      {
        height: this.animated.interpolate({
          inputRange: [0, 1],
          outputRange: [0, ROW_HEIGHT],
          extrapolate: 'clamp'
        }),
        left: this.animated.interpolate({
          inputRange: [0, 1],
          outputRange: [rowLeft, 0],
          extrapolate: 'clamp'
        })
      }
    ]

    return (
      <Swipeable
        leftContent={[]}
        onLeftActionRelease={this.handlerRemove}
      >
        <TouchableOpacity onPress={onPress} activeOpacity={1}>
          <Animated.View style={rowStyles}>
            <View style={styles.innerContainer}>
              <Text style={styles.date}>{moment(
                new Date(news.timestamp)).format('MM/DD/YYYY h:mm a')}</Text>
              <Text style={styles.title}>{news.name}</Text>
              <Text
                style={styles.text}
                ellipsizeMode='tail'
                numberOfLines={2}
              >{news.description}</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Swipeable>
    )
  }
}
