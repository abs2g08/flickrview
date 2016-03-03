import React from 'react';
import classNames from 'classnames';
import { Menu } from './components';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drawOpen: false
    }
  }

  onToggle(e) {
    e.preventDefault();

    this.setState({
      drawOpen: !this.state.drawOpen
    });
  };

  closeDraw() {
    if (this.state.drawOpen) {
      this.setState({
        drawOpen: false
      });
    }
  }

  render() {
    const drawOpen = this.state.drawOpen;
    const containerClass = classNames('app', { drawOpen });

    return (
      <div className={containerClass}>
        <div className='pusher'
          onClick={this.closeDraw.bind(this)}>
          <Menu onClick={this.onToggle.bind(this)}/>
          <main className='container content'>
            {this.props.children}
          </main>
        </div>
      </div>
    );
  }
}

export default App;
