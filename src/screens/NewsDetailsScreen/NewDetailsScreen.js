import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { isEqual, reduce } from 'lodash'
import { Button } from 'react-native-elements'
import { View, Text, ScrollView } from 'react-native'
import FormInput from '../../components/FormInput/FormInput'
import FormInputGrow from '../../components/FormInput/FormInputGrow'
import { reduxForm, Field } from 'redux-form'
import db from '../../storage/firebase'
import styles from './NewDetailsScreenStyles'

@connect((state, ownProps) => {
  const { params } = ownProps.navigation.state
  const content = params ? params.content : null
  return {
    user: state.auth.user,
    initialValues: {
      name: content ? content.name : '',
      description: content ? content.description : ''
    }
  }
})
@reduxForm({
  form: 'note'
})
export class NewDetailsScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    return {
      title: 'Note',
      headerRight: (
        <Button
          title='Save'
          color='#999'
          fontSize={20}
          backgroundColor='transparent'
          onPress={() => params.handleSubmit()}
        />
      )
    }
  }

  handleSubmit = ({ name, description }) => {
    if (!name || !description) return

    const { user, navigation } = this.props
    const { content } = navigation.state.params
    const timestamp = content ? content.timestamp : new Date().getTime()

    if (content && content._id) {
      db.refs.notes.child(content._id).transaction(note => {
        let newNote = { timestamp, name, description }
        const original = {
          name: content.name,
          description: content.description,
          timestamp: content.timestamp
        }
        if (note && !isEqual(note, original)) {
          newNote = reduce(newNote, (memo, value, key) => {
            const isNewValue = value !== content[key] && content[key] ===
              note[key]
            memo[key] = isNewValue ? value : note[key]
            return memo
          }, {})
        }
        return newNote
      })
    } else {
      const newNoteRef = db.refs.notes.push({ timestamp, name, description })
      db.refs.journals.child(user.uid).child(newNoteRef.key).set(true)
    }

    navigation.goBack()
  }

  componentDidMount () {
    this.props.navigation.setParams(
      { handleSubmit: this.props.handleSubmit(this.handleSubmit) })
  }

  render () {
    const { params } = this.props.navigation.state
    const content = params ? params.content : null
    return (
      <View style={styles.container}>
        <ScrollView>
          {content ? (
            <Text>{moment(new Date(content.timestamp))
              .format('MM/DD/YYYY h:mm a')}</Text>
          ) : null}

          <Field
            style={{
              borderWidth: 0,
              borderColor: 'transparent'
            }}
            name='name'
            component={FormInput}
            placeholder='Title'
          />
          <Field
            style={{
              marginBottom: 25,
              borderColor: 'transparent'
            }}
            name='description'
            component={FormInputGrow}
            placeholder='Your content'
          />
        </ScrollView>
      </View>
    )
  }
}
