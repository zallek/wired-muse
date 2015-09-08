import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

import VisNetwork from 'components/VisNetwork';
import * as RoomPropTypes from 'proptypes/network';
import * as GameMechanics from 'utils/gameMechanics';


export default class Room extends Component {

  static displayName = 'Room';

  static propTypes = {
    user: PropTypes.object.isRequired,
    nodes: PropTypes.arrayOf(RoomPropTypes.node).isRequired,
    edges: PropTypes.arrayOf(RoomPropTypes.edge).isRequired,
    users: PropTypes.arrayOf(RoomPropTypes.user).isRequired,
    reinforceNode: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.nodesIndex = _.indexBy(this.props.nodes, 'id');
    this.edgesIndex = _.indexBy(this.props.edges, 'id');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.nodes !== this.props.nodes) {
      this.nodesIndex = _.indexBy(nextProps.nodes, 'id');
    }
    if (nextProps.edges !== this.props.edges) {
      this.edgesIndex = _.indexBy(nextProps.edges, 'id');
    }
  }

  handleClickNode(nodeId) {
    const { user, reinforceNode } = this.props;
    const node = this.nodesIndex[nodeId];
    const power = 1;

    if (GameMechanics.canReinforceNode(user, node, power)) {
      reinforceNode(nodeId, power);
    }
  }

  render() {
    const { nodes, edges, users, ...othersProps } = this.props;

    return (
      <VisNetwork
        nodes={nodes
          .map(({id, ownerId, power}) => ({
            id,
            group: ownerId,
            value: power,
            shape: 'dot',
          }))
        }
        edges={edges
          .map(edge => ({
            ...edge,
            color: {
              inherit: false,
            },
            smooth: {
              enabled: false,
            },
          }))
        }
        options={{
          groups: _.indexBy(users.map(({id, color}) => ({
            id,
            color: {
              background: color,
              border: color,
            },
          })), 'id'),
          interaction: {
            dragNodes: false,
          },
        }}
        eventHandlers={{
          selectNode: (e) => ::this.handleClickNode(Number(e.nodes[0])),
        }}
        { ...othersProps }
      />
    );
  }

}
