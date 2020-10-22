import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { addEducation } from "../../actions/profile";

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { school, degree, fieldofstudy, from, current, description } = formData;

  var { to } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      {" "}
      <h1 className="large text-primary">Add Your Education</h1>
      <small>
        <b>
          <u>Note:</u>
        </b>{" "}
        Start with earliest to the latest for proper sequence.
      </small>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any school or bootcamp that
        you have attended
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          if (current) {
            formData.to = "";
          }
          addEducation(formData, history); // history is part of our prop which needs to be pulled in above in const AddEducation
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value={school}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field Of Study"
            value={fieldofstudy}
            onChange={(e) => onChange(e)}
            name="fieldofstudy"
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            value={from}
            onChange={(e) => onChange(e)}
            name="from"
          />
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            value={!toDateDisabled ? to : { to: "" }}
            disabled={toDateDisabled ? "disabled" : ""}
            onChange={(e) => onChange(e)}
            name="to"
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              value={current}
              checked={current}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  current: !current,
                });
                toggleDisabled(!toDateDisabled);
              }}
              name="current"
            />{" "}
            Current School
          </p>
        </div>

        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            value={description}
            onChange={(e) => onChange(e)}
            placeholder="Study Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
