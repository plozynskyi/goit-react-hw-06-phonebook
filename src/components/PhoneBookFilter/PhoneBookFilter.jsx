import PropTypes from 'prop-types';

import {
  FilterBox,
  FilterLabel,
  PhoneBookInput,
} from './phone-book-filter.styled';

const PhoneBookFilter = ({ handleChange, value }) => {
  return (
    <FilterBox>
      <FilterLabel>Find contacts by name</FilterLabel>
      <PhoneBookInput value={value} name="filter" onChange={handleChange} />
    </FilterBox>
  );
};

export default PhoneBookFilter;

PhoneBookFilter.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
