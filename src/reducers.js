import { combineReducers } from 'redux';
import { addons } from 'react/addons';
const { update } = addons;
import _ from 'lodash';

import * as Actions from 'actions';

function user(state = {
  id: 1,
}, action) {
  switch (action.type) {
  case Actions.SET_USER:
    return {
      ...state,
      id: action.id,
    };
  default:
    return state;
  }
}

function room(state = {
  users: [],
  nodes: [],
  edges: [],
  isLoaded: false,
  isOutOfSync: false,
  isFetching: false,
}, action) {
  switch (action.type) {
  case Actions.REQUEST_ROOM:
    return {
      ...state,
      isFetching: true,
    };
  case Actions.RECEIVE_ROOM:
    return {
      ...state,
      users: action.users,
      nodes: action.nodes,
      edges: action.edges,
      isLoaded: true,
      isFetching: false,
      isOutOfSync: false,
      lastUpdated: action.receivedAt,
    };
  case Actions.ROOM_OUT_OF_SYNC:
    return {
      ...state,
      isOutOfSync: true,
    };
  case Actions.REINFORCE_NODE_OPTIMISTIC:
    const { nodes } = state;
    const nodeIndex = _.findIndex(nodes, {id: action.nodeId});
    const node = nodes[nodeIndex];
    return {
      ...state,
      nodes: update(nodes, {
        [nodeIndex]: {
          $set: {
            ...node,
            power: node.power + action.power,
          },
        },
      }),
    };
  default:
    return state;
  }
}

const rootReducer = combineReducers({
  user,
  room,
});

export default rootReducer;
