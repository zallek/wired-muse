import * as Api from 'utils/api';
import * as Actions from 'actions';


export function fetchRoom() {
  return dispatch => {
    dispatch(requestRoom());
    Api.fetchRoom()
      .then(network => dispatch(receiveRoom(network)));
  };
}

function requestRoom() {
  return {
    type: Actions.REQUEST_ROOM,
  };
}

function receiveRoom({nodes, edges, users}) {
  return {
    type: Actions.RECEIVE_ROOM,
    nodes,
    edges,
    users,
    receivedAt: Date.now(),
  };
}

function roomOutOfSync() {
  return {
    type: Actions.ROOM_OUT_OF_SYNC,
  };
}


export function reinforceNode(nodeId, power) {
  return (dispatch, getState) => {
    const { user } = getState();
    dispatch(reinforceNodeOptimistic(nodeId, power));
    Api.reinforceNode(user.id, nodeId, power)
      .catch(err => {
        dispatch(roomOutOfSync());
        dispatch(fetchRoom());
      });
  };
}

function reinforceNodeOptimistic(nodeId, power) {
  return {
    type: Actions.REINFORCE_NODE_OPTIMISTIC,
    nodeId,
    power,
  };
}
