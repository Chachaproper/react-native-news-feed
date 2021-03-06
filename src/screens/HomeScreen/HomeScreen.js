import React from 'react'
import { View, ActivityIndicator, FlatList, Alert } from 'react-native'
import NewsItem from '../../components/NewsItem/NewsItem'
import Loader from '../../components/Loader/Loader'
import { NEWS_DETAILS } from '../../constants/navigation'
import styles from './HomeScreenStyles'
import Layout from '../../components/Layout/Layout'
import dataNews from '../../data/news'
import moment from 'moment'

const NEWS_PER_PAGE = 10

let newData = [...dataNews]
newData = newData.map(news => {
  news.date = getRandomDate()
  return news
})

function getRandomDate () {
  const start = new Date(2017, 0, 1)
  const end = new Date()
  const rndDate = new Date(start.getTime() + Math.random() *
    (end.getTime() - start.getTime()))

  return moment(rndDate).format('MMM Do YY')
}

export class HomeScreen extends Layout {
  handleOpenNews = (content) => {
    return () => {
      const { navigate } = this.props.navigation
      navigate(NEWS_DETAILS, { content })
    }
  }

  getListFooter = () => {
    const { page, totalPages } = this.state

    if (page >= totalPages) return null

    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  handleGetData = () => {
    setTimeout(() => {
      this.setState({
        isLoad: true,
        refreshing: false,
        isEndReached: false,
        data: [...newData],
        news: newData.slice(0, NEWS_PER_PAGE),
        page: 1,
        totalPages: Math.ceil(newData.length / NEWS_PER_PAGE)
      })
    }, 1500)
  }

  handlerRefresh = () => {
    this.setState({ refreshing: true }, () => this.handleGetData())
  }

  handlerLoadMore = () => {
    const { isEndReached, refreshing } = this.state
    if (isEndReached || refreshing) return

    this.setState({ isEndReached: true })

    setTimeout(() => {
      const { totalPages, news, page, data } = this.state
      const nextPage = page + 1

      if (nextPage > totalPages) return

      const start = page * NEWS_PER_PAGE
      const end = nextPage * NEWS_PER_PAGE

      this.setState({
        news: [...news, ...data.slice(start, end)],
        page: nextPage,
        isEndReached: false
      })
    }, 3000)
  }

  handleRemoveItem = id => {
    return () => {
      const { data, news } = this.state
      this.setState({
        data: data.filter(el => el.id !== id),
        news: news.filter(el => el.id !== id)
      })
    }
  }

  handleShowAlert = () => {
    return Alert.alert('Hello!', 'Message',
      [
        {
          text: 'Ok',
          onPress: () => console.log('pressed')
        }
      ])
  }

  constructor (props) {
    super(props)
    this.state = {
      isLoad: false,
      refreshing: false,
      data: [],
      news: [],
      page: 1,
      totalPages: 0,
      isEndReached: false
    }
  }

  componentDidMount () {
    super.componentDidMount()
    this.handleGetData()
  }

  render () {
    const { isLoad, news, refreshing } = this.state

    if (!isLoad) return <Loader />

    return (
      <View style={styles.container}>
        <FlatList
          data={news}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <NewsItem
              news={item}
              onPress={this.handleOpenNews(item)}
              onRemove={this.handleRemoveItem(item.id)}
              onShowAlert={this.handleShowAlert}
            />
          )}
          ListFooterComponent={this.getListFooter}
          refreshing={refreshing}
          onRefresh={this.handlerRefresh}
          onEndReached={this.handlerLoadMore}
          onEndThrashhold={1}
        />
      </View>
    )
  }
}
