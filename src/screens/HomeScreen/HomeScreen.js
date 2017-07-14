import React, { PureComponent } from 'react'
import { View, ActivityIndicator, FlatList } from 'react-native'
import NewsItem from '../../components/NewsItem/NewsItem'
import Loader from '../../components/Loader/Loader'
import styles from './HomeScreenStyles'
import Layout from '../../components/Layout/Layout'

const API = 'https://private-23d25c-reactnative.apiary-mock.com'
const NEWS_PER_PAGE = 4

export class HomeScreen extends Layout {
  constructor(props) {
    super(props)
    this.state = {
      isLoad:     false,
      refreshing: false,
      data:       [],
      news:       [],
      page:       1,
      totalPages: 0
    }
  }

  componentDidMount() {
    super.componentDidMount()
    this.handleGetData()
  }

  handleOpenNews = () => {
    const { navigate } = this.props.navigation
    navigate('NewDetails')
  }

  getListFooter = () => {
    const { page, totalPages } = this.state

    if (page >= totalPages) return null

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth:  1,
          borderColor:     '#CED0CE'
        }}
      >
        <ActivityIndicator size="large"/>
      </View>
    )
  }

  handleGetData = () => {
    return fetch(`${API}/news`)
      .then(data => data.json())
      .then(data => {
        this.setState({
          isLoad:     true,
          refreshing: false,
          data:       data,
          news:       data.slice(0, NEWS_PER_PAGE),
          page:       1,
          totalPages: Math.ceil(data.length / NEWS_PER_PAGE)
        })

        console.log(data)
      })
      .catch(err => console.log(err))
  }

  handlerRefresh = () => {
    this.setState({ refreshing: true }, () => this.handleGetData())
  }

  handlerLoadMore = () => {
    setTimeout(() => {
      const { totalPages, news, page, data } = this.state
      const nextPage = page + 1

      if (nextPage > totalPages) return

      const start = page * NEWS_PER_PAGE
      const end = nextPage * NEWS_PER_PAGE

      this.setState({
        news: [...news, ...data.slice(start, end)],
        page: nextPage
      })
    }, 3000)
  }

  render() {
    const { isLoad, news, refreshing } = this.state

    if (!isLoad) return <Loader/>

    return (
      <View style={styles.container}>
        <FlatList
          data={news}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <NewsItem news={item} onPress={this.handleOpenNews}/> }
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
