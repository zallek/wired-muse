import { PropTypes } from 'react';


export const node = PropTypes.shape({
  id: PropTypes.number.isRequired,
  ownerId: PropTypes.number.isRequired,
  power: PropTypes.number.isRequired,
  maxPower: PropTypes.number.isRequired,
});

export const edge = PropTypes.shape({
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
});

export const user = PropTypes.shape({
  id: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
});
