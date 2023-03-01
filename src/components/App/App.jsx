import { useSelector, useDispatch } from 'react-redux';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import PhoneBookList from 'components/PhoneBookList/PhoneBookList';
import PhoneBookFilter from 'components/PhoneBookFilter/PhoneBookFilter';
import PhoneBooksForm from 'components/PhoneBookForm/PhoneBookForm';

import { addContact, deleteContact } from 'redux/contacts/contacts-slice';
import { setFilter } from 'redux/filter/filter-slice';

import {
  getAllContacts,
  getFilteredContacts,
} from 'redux/contacts/contacts-selectors';

import { getFilter } from '../../redux/filter/filter-selectors';

import {
  MainSection,
  FormBox,
  PhoneBookTitle,
  ContactsBox,
  ContactsTitle,
} from './App.styled';

const App = () => {
  const filteredContacts = useSelector(getFilteredContacts);
  const allContacts = useSelector(getAllContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const isDuplicate = (name, number) => {
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();
    const result = allContacts.find(({ name, number }) => {
      return (
        name.toLowerCase() === normalizedName &&
        number.toLowerCase() === normalizedNumber
      );
    });

    return Boolean(result);
  };

  const addContacts = ({ name, number }) => {
    if (isDuplicate(name, number)) {
      Notify.failure(`'${name} is already exist'`);
      return false;
    }

    dispatch(addContact({ name, number }));
  };

  const removeContacts = id => {
    dispatch(deleteContact(id));
  };

  const handleFilter = ({ target }) => dispatch(setFilter(target.value));

  const isContacts = Boolean(filteredContacts.length);

  return (
    <>
      <MainSection>
        <FormBox>
          <PhoneBookTitle>Phonebook</PhoneBookTitle>
          <PhoneBooksForm onSubmit={addContacts} />
        </FormBox>
        <ContactsBox>
          <ContactsTitle>Contacts</ContactsTitle>
          <PhoneBookFilter value={filter} handleChange={handleFilter} />
          {isContacts && (
            <PhoneBookList
              items={filteredContacts}
              removeContacts={removeContacts}
            />
          )}
          {!isContacts && <p>No contacts in list</p>}
        </ContactsBox>
      </MainSection>
    </>
  );
};

export default App;
