import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.string().min(7, 'short').max(7, 'long').required(),
});

const initialValues = { name: '', number: '' };

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  onChangeInput = evt => {
    const { name, number } = evt.currentTarget;

    this.setState({ name: name.value, number: number.value });
  };

  onSubmitForm = (values, { resetForm }) => {
    this.props.onAddContact(this.state);

    resetForm();
  };

  render() {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={this.onSubmitForm}
      >
        <Form autoComplete="off" onChange={this.onChangeInput}>
          <label htmlFor="name">
            Name
            <Field
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            />
            <ErrorMessage name="name" />
          </label>
          <label htmlFor="number">
            Number
            <Field
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            />
            <ErrorMessage name="number" />
          </label>
          <button type="submit">Add contact</button>
        </Form>
      </Formik>
    );
  }
}

export default ContactForm;
