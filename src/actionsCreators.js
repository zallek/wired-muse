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

function receiveNetwork({nodes, edges}) {
  return {
    type: actions.RECEIVE_NETWORK,
    nodes,
    edges,
    receivedAt: Date.now(),
  };
}
