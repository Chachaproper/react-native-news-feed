import React from 'react'
import { View, FlatList } from 'react-native'
import { Icon } from 'react-native-elements'
import NewsItem from '../../components/NewsItem/NewsItem'
import { NEWS_DETAILS } from '../../constants/navigation'
import styles from './HomeScreenStyles'
import Layout from '../../components/Layout/Layout'
import db from '../../storage/firebase'
import { connect } from 'react-redux'

@connect(state => ({
  user: state.auth.user,
  notes: state.notes
}))
export class HomeScreen extends Layout {
  handleRemoveItem = id => () => {
    const { user } = this.props
    db.refs.journals.child(user.uid).child(id).remove()
  }

  handleOpenNote = content => {
    return () => {
      const { navigate } = this.props.navigation
      navigate(NEWS_DETAILS, { content })
    }
  }

  handleCreateNote = () => this.props.navigation.navigate(NEWS_DETAILS)

  render () {
    const { notes } = this.props

    return (
      <View style={styles.container}>
        <FlatList
          data={notes}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <NewsItem
              news={item}
              onPress={this.handleOpenNote(item)}
              onRemove={this.handleRemoveItem(item._id)}
            />
          )}
        />
        <Icon
          raised
          reverse
          containerStyle={styles.addNewBtn}
          onPress={this.handleCreateNote}
          name='add'
          color='#18BB49'
        />
      </View>
    )
  }
}
