import React, { PureComponent } from 'react'
import { Image, Text, View, Animated, TouchableOpacity } from 'react-native'
import moment from 'moment'
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

  get randomDate () {
    const start = new Date(2017, 0, 1)
    const end = new Date()
    const rndDate = new Date(start.getTime() + Math.random() *
      (end.getTime() - start.getTime()))

    return moment(rndDate).format('MMM Do YY')
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
        onPanAnimatedValueRef={(value) => console.log(value.x)}
      >
        <TouchableOpacity onPress={onPress} activeOpacity={1}>
          <Animated.View style={rowStyles}>
            <View style={styles.innerContainer}>
              <View style={styles.statusBar}>
                <Text style={styles.date}>{this.randomDate}</Text>
              </View>

              <View style={styles.newsBody}>

                <View style={styles.imgContainer}>
                  <Image source={{ uri: news.img }} style={styles.newsImg} />
                </View>

                <View style={styles.textContainer}>
                  <View>
                    <Text style={styles.title}>{news.title}</Text>
                    <Text
                      style={styles.text}
                      ellipsizeMode='tail'
                      numberOfLines={4}
                    >{news.description}</Text>
                  </View>
                </View>
              </View>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Swipeable>
    )
  }
}
