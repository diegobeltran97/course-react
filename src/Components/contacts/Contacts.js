import React, { Component } from "react";
import Contact from "./Contact";
import { Consumer } from "../../context";
class Contacts extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { contacts } = value;
          return (
            <React.Fragment>
              <h1 className="display-4 mb-2">
                <span className="text-danger">Contact </span>List
              </h1>
              {contacts.map(contactOb => (
                <Contact key={contactOb.id} contact={contactOb} />
              ))}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Contacts;
