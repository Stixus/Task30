import React, { Component } from "react";
import "./App.css";
import PostitCard from "./components/PostitCard";
import AddPostitCard from "./components/AddPostitCard";

/**
 * Component that shows postit-notes.
 * Makes one able to create postit-notes.
 * Makes oen able to delete postit-notes.
 */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="container">
        <AddPostitCard></AddPostitCard>
        <PostitCard></PostitCard>
      </div>
    );
  }
}

export default App;
