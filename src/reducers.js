import { combineReducers } from 'redux';

import * as actions from 'actions';


function network(state = {
  nodes: [],
  edges: [],
  isFetching: false,
}, action) {
  switch (action.type) {
  case actions.REQUEST_NETWORK:
    return {
      ...state,
      isFetching: true,
    };
  case actions.RECEIVE_NETWORK:
    return {
      ...state,
      isFetching: false,
      nodes: action.nodes,
      edges: action.edges,
      groups: action.groups,
      lastUpdated: action.receivedAt,
    };
  default:
    return state;
  }
}

const rootReducer = combineReducers({
  network,
});

export default rootReducer;
