import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formattedNumber = number => {
    const part1 = number.slice(0, 3);
    const part2 = number.slice(3, 5);
    const part3 = number.slice(5, 7);
    return `${part1}-${part2}-${part3}`;
  };

  onAddContact = data => {
    const { name, number } = data;

    const isContainName = this.state.contacts.some(
      contactName =>
        contactName.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );

    if (isContainName) {
      alert(`${name} is already in contacts.`);
      return;
    } else {
      this.setState(prevState => {
        const newContactList = [...prevState.contacts];

        newContactList.push({
          id: nanoid(),
          name: name,
          number: this.formattedNumber(number),
        });
        return { contacts: newContactList };
      });
    }
  };

  deleteContact = id => {
    console.log(id);
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  onChangeFilterInput = evt => {
    const { value } = evt.currentTarget;

    console.log(value);

    this.setState({
      filter: value,
    });
  };

  filteredContactsList = () => {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return filteredContacts;
  };

  render() {
    return (
      <>
        <div>
          <h1>Phonebook</h1>
          <ContactForm onAddContact={this.onAddContact} />

          <h2>Contacts</h2>
          <Filter onChangeFilterInput={this.onChangeFilterInput} />

          <ContactList
            contacts={this.filteredContactsList()}
            onDeleteContact={this.deleteContact}
          />
        </div>
      </>
    );
  }
}

export default App;
