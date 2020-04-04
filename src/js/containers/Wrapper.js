import Wrapper from 'src/js/components/Wrapper';
import { connect } from 'react-redux';

/**
 * Mapping Redux state as props for presentational components
 * @param {object} state - The redux store state
 * @returns {object} Mapping from state to props
 */
function mapStateToProps(state) {
  return {
    mode: state.Common.widgetMode,
  };
}

export default connect(mapStateToProps, null)(Wrapper);
