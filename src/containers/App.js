import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchNetwork } from '../actionsCreators';
import VisNetwork from 'components/VisNetwork';
import * as NetworkPropTypes from 'proptypes/network';

import styles from './App.css';


class App extends Component {

  static displayName = 'App';

  static propTypes = {
    network: PropTypes.shape({
      isFetching: PropTypes.bool.isRequired,
      lastUpdated: PropTypes.number,
      nodes: PropTypes.arrayOf(NetworkPropTypes.node),
      edges: PropTypes.arrayOf(NetworkPropTypes.edge),
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchNetwork());
  }

  render() {
    const {
      network: {
        isFetching,
        lastUpdated,
        nodes,
        edges,
      },
    } = this.props;

    return (
      <div>
        <div
          className={styles.infos}
        >
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
        </div>
        <div
          className={isFetching ? styles.networkFetching : styles.network}
        >
          {isFetching &&
            <h2>Loading...</h2>
          }
          {nodes.length > 0 &&
            <VisNetwork
              nodes={nodes}
              edges={edges.map(edge => ({
                ...edge,
                smooth: {
                  enabled: false,
                },
              }))}
            />
          }
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  const { network } = state;
  return {
    network,
  };
}

export default connect(mapStateToProps)(App);
