import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import { Button } from "react-bootstrap";

const URL = "https://api.myjson.com/bins/1flx02";

/**
 * Component that gets various text from a database and shows these as cards.
 */

class PostitCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postit: [],
      shown: true
    };
  }

  componentDidMount() {

    /**
     * Axios get on the selected database, sets state of postit to an array of objects
     * from the database.
     */
    let _this = this;
    axios({
      method: "get",
      url: URL
    }).then(function(response) {
      _this.setState({ postit: response.data });
    });
  }

/**
 * A set of functions that is used to delete the content in the postit array.
 * Also sets the button that is clicked invisible.
 */

  onClick(event) {
    this.handleDelete();
    this.toggle();
  }

  handleDelete() {
    this.setState({
      postit: []
    });
  }

  toggle() {
    this.setState({
      shown: !this.state.shown
    });
  }

  render() {
    let keyVar = 0; //Variable used as key for the objects in postit[].

    //Variable that alters the visibility of the button.
    var shown = {
      display: this.state.shown ? "" : "none"
    };

    return (
      /**
       * Cards that present the objects from the database shown as CardColumns.
       * Uses the map function that method creates a new array with the results of calling 
       * a provided function on every element in the calling array.
       * Increments key for each instance.
       * 
       */
      <div className="col-sm-12" id="p-container">
        <CardColumns>
          {this.state.postit.map(post => (
            <Card
              key={keyVar++}
              bg="warning"
              text="white"
              style={{ width: "18rem" }}
            >
              <Card.Header>{post.headline}</Card.Header>
              <Card.Body>
                <Card.Text>{post.sentence}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </CardColumns>
        <div id="deleteButton">
          <Button
            variant="danger"
            onClick={this.onClick.bind(this)}
            style={shown}
          >
            Delete all postits
          </Button>
        </div>
      </div>
    );
  }
}

export default PostitCard;
