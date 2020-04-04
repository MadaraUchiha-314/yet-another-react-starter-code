import { widgetModes } from 'src/js/utils/Enums';
import PropTypes from 'prop-types';
import React from 'react';
import { Spin } from 'antd';
import { SpinnerContainer } from 'src/js/components/StyledComponents';

/**
 * Shows the spinner based on the mode
 * @param {object} props Props for the ShowSpinner Module
 * @returns {void}
 */
const ShowSpinner = (props) => {
  const { mode } = props;
  const { children } = props;

  return (
    <>
      {mode === widgetModes.LOADING ? (
        <SpinnerContainer>
          <Spin />
        </SpinnerContainer>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

ShowSpinner.propTypes = {
  mode: PropTypes.string,
  children: PropTypes.element.isRequired,
};

ShowSpinner.defaultProps = {
  mode: widgetModes.RENDER,
};

export { ShowSpinner as default };
