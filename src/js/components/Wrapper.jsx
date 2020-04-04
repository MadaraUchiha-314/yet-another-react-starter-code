import React from 'react';
import PropTypes from 'prop-types';

import ShowSpinner from 'src/js/components/Spinner';
import { widgetModes } from 'src/js/utils/Enums';

/**
 * A wrapper component which takes care of showing the spinner and error handling at the page level
 * Ideally every route should have its top level component Wrapped in this
 * @param {object} props - The props for Wrapper
 * @returns {void}
 */
const Wrapper = (props) => {
  const { children } = props;
  const { mode } = props;
  return <ShowSpinner mode={mode}>{children}</ShowSpinner>;
};

Wrapper.defaultProps = {
  mode: widgetModes.RENDER,
};

Wrapper.propTypes = {
  /* Decided whether to render, show spinner or error */
  mode: PropTypes.string,
  children: PropTypes.element.isRequired,
};

export { Wrapper as default };
