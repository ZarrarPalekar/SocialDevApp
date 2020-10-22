import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux"; // basically whenever you want to interact with Redux whether you are calling an action or getting the state you use connect

//here we want to get the alert state

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert, // which reducer state you want from root reducer in our case here we want alert reducer state
}); // to map redux alert state to a prop in this component

export default connect(mapStateToProps)(Alert); // here we arent sending alert but receiving it hence mapStateToProps and nothing else as in case of Register.js where we are sending setAlert
