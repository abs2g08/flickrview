import React from 'react';
import { HomeStore } from '../stores';
import { Feed } from '../components';
import { HomeActions } from '../actions';
import connectToStores from 'alt/utils/connectToStores';
import classNames from 'classnames';

class HomeView extends React.Component {
  static getStores() {
    return [HomeStore];
  }

  static getPropsFromStores() {
    return {
      homeStore: HomeStore.getState()
    };
  }

  componentDidMount() {
    HomeActions.getFeed();
  }

  render() {
    const loading = this.props.homeStore.loading || false;
    const svgLoaderClass = classNames('svg-loader', { hidden: !loading });
    const items = this.props.homeStore.items;

    return (
      <div className='home-view'>
        <div>
          <Feed items={items}/>
        </div>
        <div className='home-loader'>
          <svg className={svgLoaderClass}></svg>
        </div>
      </div>
    );
  }
}

export default connectToStores(HomeView);
