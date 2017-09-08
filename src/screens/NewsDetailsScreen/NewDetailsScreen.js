import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { View, Button } from 'react-native'
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
        <Field
          style={{ backgroundColor: '#777' }}
          name={'name'}
          component={FormInput}
          onSubmitEditing={handleSubmit(this.handleSubmit)}
          placeholder='Name'
          defaultValue={resultContent.name || ''}
        />
        <Field
          style={{ marginBottom: 25, backgroundColor: '#777' }}
          name={'description'}
          component={FormInput}
          onSubmitEditing={handleSubmit(this.handleSubmit)}
          placeholder='Description'
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
