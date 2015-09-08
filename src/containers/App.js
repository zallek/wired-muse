import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchRoom, reinforceNode } from '../actionsCreators';
import Room from 'components/Room';
import * as RoomPropTypes from 'proptypes/room';

import styles from './App.css';


class App extends Component {

  static displayName = 'App';

  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
    room: PropTypes.shape({
      isFetching: PropTypes.bool.isRequired,
      isLoaded: PropTypes.bool.isRequired,
      lastUpdated: PropTypes.number,
      nodes: PropTypes.arrayOf(RoomPropTypes.node).isRequired,
      edges: PropTypes.arrayOf(RoomPropTypes.edge).isRequired,
      users: PropTypes.arrayOf(RoomPropTypes.user).isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchRoom());
  }

  handleReinforceNode(...options) {
    const { dispatch } = this.props;
    dispatch(reinforceNode(...options));
  }

  render() {
    const {
      user,
      room: {
        isFetching,
        isLoaded,
        lastUpdated,
        nodes,
        edges,
        users,
      },
    } = this.props;

    return (
      <div>
        <div
          className={styles.infos}
        >
          {lastUpdated &&
            <span>
              {`Last updated at ${new Date(lastUpdated).toLocaleTimeString()}`}
            </span>
          }
        </div>
        <div
          className={isFetching ? styles.roomFetching : styles.room}
        >
          {isFetching &&
            <h2>Loading...</h2>
          }
          {isLoaded &&
            <Room
              user={user}
              nodes={nodes}
              edges={edges}
              users={users}
              reinforceNode={::this.handleReinforceNode}
            />
          }
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  const { user, room } = state;
  return {
    user,
    room,
  };
}

export default connect(mapStateToProps)(App);
