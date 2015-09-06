import React, { PropTypes } from 'react';
import cx from 'classnames';
import Network from 'vis-network';

import * as NetworkPropTypes from 'proptypes/network';


export default class VisNetwork extends React.Component {

  static displayName = 'VisNetwork';

  static propTypes = {
    className: PropTypes.string,
    nodes: PropTypes.arrayOf(NetworkPropTypes.node),
    edges: PropTypes.arrayOf(NetworkPropTypes.edge),
    options: PropTypes.object, // http://visjs.org/docs/network/#options
  };

  static defaultProps = {
    nodes: [],
    edges: [],
    options: {},
  };

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const { nodes, edges, options } = this.props;
    const node = React.findDOMNode(this.refs.network);
    this.network = new Network(node, { nodes, edges }, options);
  }

  render() {
    const { className, ...othersProps } = this.props;

    return (
      <div
        ref="network"
        className={cx('VisNetwork', className)}
        { ...othersProps }
      ></div>
    );
  }

}
