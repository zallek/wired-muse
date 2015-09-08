import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

import Network from 'vis-network/network/Network';
import DataSet from 'vis-network/DataSet';
import * as NetworkPropTypes from 'proptypes/network';


export default class VisNetwork extends Component {

  static displayName = 'VisNetwork';

  static propTypes = {
    nodes: PropTypes.arrayOf(NetworkPropTypes.node),
    edges: PropTypes.arrayOf(NetworkPropTypes.edge),
    options: PropTypes.object, // http://visjs.org/docs/network/#options
    eventHandlers: PropTypes.objectOf(PropTypes.func),
  };

  static defaultProps = {
    nodes: [],
    edges: [],
    options: {},
  };

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.nodes !== this.props.nodes) {
      this.nodes.update(nextProps.nodes);
    }
    if (nextProps.edges !== this.props.edges) {
      this.edges.update(nextProps.edges);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidUpdate() {
    const { nodes, edges, options, eventHandlers } = this.props;
    const domNode = React.findDOMNode(this.refs.network);

    this.nodes = new DataSet(nodes);
    this.edges = new DataSet(edges);

    this.network = new Network(domNode, { nodes: this.nodes, edges: this.edges }, options);
    _.each(eventHandlers, (handler, eventName) => {
      this.network.on(eventName, handler);
    });
  }

  render() {
    const { nodes, edges, options, eventHandlers, ...othersProps } = this.props;

    return (
      <div
        ref="network"
        { ...othersProps }
      ></div>
    );
  }

}
