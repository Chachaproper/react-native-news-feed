import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { View, Button, Text } from 'react-native'
import FormInput from '../../components/FormInput/FormInput'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import db from '../../storage/firebase'
import styles from './NewDetailsScreenStyles'
import { NEWS } from '../../constants/navigation'

@connect(state => ({ user: state.auth.user }))
@reduxForm({ form: 'note' })
export class NewDetailsScreen extends PureComponent {
  static navigationOptions = {
    title: 'Note'
  }

  handleSubmit = ({ name, description }) => {
    if (!name || !description) {
      throw new SubmissionError({
        username: 'Empty fields',
        _error: 'Failed!'
      })
    }

    const { user, navigation } = this.props
    const { content } = navigation.state.params

    if (content && content._id) {
      db.refs.notes.child(content._id).set({ name, description })
    } else {
      const newNoteRef = db.refs.notes.push({ name, description })
      db.refs.journals.child(user.uid).set({ [newNoteRef.key]: true })
    }

    navigation.navigate(NEWS)
  }

  render () {
    const { handleSubmit } = this.props
    const { content } = this.props.navigation.state.params
    let resultContent = content || {}

    return (
      <View style={styles.container}>
        <Text>{moment().format('MM/DD/YYYY h:mm a')}</Text>
        <Field
          style={{
            borderWidth: 0,
            borderColor: 'transparent'
          }}
          name={'name'}
          component={FormInput}
          onSubmitEditing={handleSubmit(this.handleSubmit)}
          placeholder='Title'
          defaultValue={resultContent.name || ''}
        />
        <Field
          style={{
            marginBottom: 25
          }}
          name={'description'}
          component={FormInput}
          onSubmitEditing={handleSubmit(this.handleSubmit)}
          placeholder='Your content'
          multiline
          numberOfLines={10}
          defaultValue={resultContent.description || ''}
        />
        <Button
          color='#6249ca'
          onPress={handleSubmit(this.handleSubmit)}
          title='Submit'
        />
      </View>
    )
  }
}
