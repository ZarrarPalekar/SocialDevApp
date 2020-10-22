import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { addExperience } from "../../actions/profile";

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { company, title, location, from, current, description } = formData;

  var { to } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      {" "}
      <h1 className="large text-primary">Add An Experience</h1>
      <small>
        <b>
          <u>Note:</u>
        </b>{" "}
        Start with earliest to the latest for proper sequence.
      </small>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          if (current) {
            formData.to = "";
          }
          addExperience(formData, history); // history is part of our prop which needs to be pulled in above in const AddExperience
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => onChange(e)}
            name="location"
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
            Current Job
          </p>
        </div>

        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            value={description}
            onChange={(e) => onChange(e)}
            placeholder="Job Description"
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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
