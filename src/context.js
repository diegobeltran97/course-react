import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };

    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contact: state.contacts.map( x =>
        x.id === action.payload.id
            ? (x = action.payload)
            : x
        )
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [],
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };
  /*componentDidMount() {
    Widthout using async
    /* fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json()) // with fetch https://jsonplaceholder.typicode.com
      .then(json =>
        this.setState({
          contacts : json
        })
      ); 
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then( res => this.setState( { contacts: res.data }))

}*/
  async componentDidMount() {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    //.then(res => this.setState({ contacts: res.data }))

    this.setState({ contacts: res.data });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
