import React from 'react';
import PropTypes from 'prop-types';

import 'regenerator-runtime/runtime';

/* All redux related stuff */
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { addCurrencyFormatting, maskPIIData } from 'src/js/utils/NumberFormat';
import { isPIIDataMaskingEnabled, getParameterByName } from 'src/js/utils/Utils';
import { queryParams, plaformTypes } from 'src/js/utils/Enums';
import { setMaxCount } from 'src/js/utils/Cache';

import * as ActionCreators from 'src/js/actions/Actions';
import reducer from 'src/js/reducers/index';
import rootSaga from 'src/js/sagas/RootSaga';

import Wrapper from 'src/js/containers/Wrapper';
/*
 * CSS files go here.
 */
import 'src/css/homepage.scss';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    /* Initialize the redux and middleware */
    this.initStore();

    const { locale, currency, currencySymbol } = this.props;
    /* This is to add the number and money formatting to the plugins. */
    addCurrencyFormatting(locale, currency, currencySymbol);

    /* Mask PII data if the localStorage option is set */
    if (isPIIDataMaskingEnabled()) {
      maskPIIData();
    }

    /**
     * Initializing the data cache.
     */
    setMaxCount(10);
  }

  /**
   * We tell appfabric that we have mounted
   */
  componentDidMount() {
    const { platform } = this.props;

    let currentPlatformType = plaformTypes.WEB;
    if (platform !== null) {
      currentPlatformType = platform;
    } else if (getParameterByName(queryParams.PLATFORM) !== null) {
      currentPlatformType = getParameterByName(queryParams.PLATFORM);
    }

    this.store.dispatch(ActionCreators.setPlatformType(currentPlatformType));
  }

  /**
   * Initialises the redux store if not present
   */
  initStore() {
    const sagaMiddleware = createSagaMiddleware();
    this.store = createStore(reducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);
  }

  render() {
    return (
      <Provider store={this.store}>
        <Wrapper>
          <div>Homepage Rendered!</div>
        </Wrapper>
      </Provider>
    );
  }
}

export default HomePage;

HomePage.propTypes = {
  locale: PropTypes.string,
  currency: PropTypes.string,
  currencySymbol: PropTypes.string,
  platform: PropTypes.string,
};

HomePage.defaultProps = {
  locale: 'en-US',
  currency: 'USD',
  currencySymbol: '$',
  platform: null,
};
