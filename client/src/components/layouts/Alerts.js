import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const Alerts = props => {
  const { alert } = props;

  const renderAlerts = () => {
    if (alert !== null || alert.length > 0) {
      return alert.map(alt => {
        return (
          <div className={`alert alert-${alt.alertType}`} key={alt.id}>
            <strong>{alt.msg}</strong>
          </div>
        );
      });
    }
  };

  return <Fragment>{renderAlerts()}</Fragment>;
};

/////////////////////////// mapStateToProps /////////////////////////////
const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(mapStateToProps)(Alerts);
