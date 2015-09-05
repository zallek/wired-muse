import { PropTypes } from 'react';


export const node = PropTypes.shape({
  id: PropTypes.number.isRequired,
  label: PropTypes.string,
});

export const edge = PropTypes.shape({
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
});
