import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux"; // this needs to be exported down from the file
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

// const Register = (props) => {
//added props in parenthesis after bringing in setAlert
// then he went ahead and removed props word by destructuring it
const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      // console.log("Passwords do not match");
      setAlert("Passwords do not match", "danger", 10000); // what this should do is pass this "" as a msg to our actions which will then call the reducer through dispatch //danger type will be used by CSS in our case for alert css
    } else {
      // console.log("SUCCESS");
      register({ name, email, password });
    }
  };

  // Redirect if registered
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form onSubmit={(e) => onSubmit(e)} className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            // required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={(e) => onChange(e)}
            value={email}
            // required
          />
          <small className="form-text">
            This site uses Gravatar, so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            placeholder="Password"
            // minLength="6"
            // required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            onChange={(e) => onChange(e)}
            value={password2}
            // minLength="6"
            // required
          />
        </div>
        <input type="submit" value="Register" className="btn btn-primary" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
}); // we are doing this here because we are calling in the auth state from the auth reducer

export default connect(mapStateToProps, { setAlert, register })(Register); // this { setAlert } will allow us to access props.setAlert or destructure props to get setAlert in the Register's parenthesis at the start of the code here we wer sending an alert and not mapping any reducer state to props thus null and {setAlert}
