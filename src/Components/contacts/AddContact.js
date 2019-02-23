import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
//import uuid from "uuid";
import axios from "axios";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };
  onFieldChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    //Check for Errors
    if (name === "") {
      this.setState({ errors: { name: " Name is required" } });
      return;
    }

    if (email === "") {
      this.setState({ errors: { name: " email is required" } });
      return;
    }

    if (phone === "") {
      this.setState({ errors: { name: " phone is required" } });
      return;
    }

    const newContact = {
      name,
      email,
      phone
    };

    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newContact
    );
    //.then(res => dispatch({ type: "ADD_CONTACT", payload: res.data }));
    dispatch({ type: "ADD_CONTACT", payload: res.data });
    // Clear State
    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });

    this.props.history.push("/");
  };

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name..."
                    value={name}
                    onFieldChange={this.onFieldChange}
                    error={errors.name}
                  />

                  <TextInputGroup
                    label="email"
                    name="email"
                    type="email"
                    placeholder="Enter Email..."
                    value={email}
                    onFieldChange={this.onFieldChange}
                    error={errors.email}
                  />

                  <TextInputGroup
                    label="phone"
                    name="phone"
                    
                    placeholder="Enter Phone..."
                    value={phone}
                    onFieldChange={this.onFieldChange}
                    error={errors.phone}
                  />

                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
