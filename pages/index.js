import React, { Component } from 'react';
import { initStore } from '../src/javascript/store';
import withRedux from 'next-redux-wrapper';
import fetch from 'isomorphic-fetch';
import NoSSR from 'react-no-ssr';
import Immutable from 'immutable';
import Rx from 'rxjs/Rx';
import antdStyle from '../src/css/index.min.css';
import RenderEngine from '../src/javascript/engine/RenderEngine';
import LayoutEngine from '../src/javascript/engine/LayoutEngine';

import mock from '../src/javascript/mock/page.json';

import ComponentManager from '../src/javascript/manager/IFComponentManager.js';


import { 
 Row,
 Col,
} from 'antd';

class MainPage extends Component {
  static getInitialProps ({ store, isServer }) {

    store.subscribe(() => {
      console.log('Index State', store.getState());
    });

    let that = this;

    return { 
      isServer, 
      counter: 0,
      data: mock,
      formData: null,
    };
  }

  componentDidMount() {
    Object.keys(this.refs).map( (compId, index) => {
      ComponentManager.register(compId, this.refs[compId]);
    });
  }


  render() {
    let {
      dispatch,
      data,
    } = this.props;

    return (
      <div className="p-main">
        <style dangerouslySetInnerHTML={{ __html: antdStyle}} />
        {LayoutEngine.renderLayout(data, dispatch)}
      </div>
    )
  }
}

export default withRedux(initStore)(MainPage);
