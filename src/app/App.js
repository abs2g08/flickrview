import React from 'react';
import classNames from 'classnames';

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
        <main className='container content'>
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default App;
