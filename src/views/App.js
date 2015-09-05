import React from 'react';

import VisNetwork from 'components/VisNetwork';

import './App.scss';


export default class App extends React.Component {

  static displayName = 'App';

  render() {
    return (
      <div className="App">
        <VisNetwork
          className="App-VisNetwork"
          nodes={[
            {id: 1, label: 'Node 1'},
            {id: 2, label: 'Node 2'},
            {id: 3, label: 'Node 3'},
            {id: 4, label: 'Node 4'},
            {id: 5, label: 'Node 5'},
          ]}
          edges={[
            {from: 1, to: 3},
            {from: 1, to: 2},
            {from: 2, to: 4},
            {from: 2, to: 5},
          ]}
        />
      </div>
    );
  }

}
