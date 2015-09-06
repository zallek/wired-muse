import _ from 'lodash';

import * as api from 'utils/api';
import * as actions from 'actions';


export function fetchNetwork() {
  return dispatch => {
    dispatch(requestNetwork());
    api.fetchNetwork()
      .then(network => dispatch(receiveNetwork(network)));
  };
}

function requestNetwork() {
  return {
    type: actions.REQUEST_NETWORK,
  };
}

function receiveNetwork({nodes, edges, groups}) {
  return {
    type: actions.RECEIVE_NETWORK,
    nodes,
    edges,
    groups: _.indexBy(_.map(groups, ({id, color}) => ({
      id,
      color: {
        background: color,
        border: color,
      },
    })), 'id'),
    receivedAt: Date.now(),
  };
}
