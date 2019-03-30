import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

/**
 * Component that adds a new postit-card to the screen.
 */

class AddPostitCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: "",
      sentence: "",
      createdPostit: []
    };
  }

  /**
   * Function that runs when the submit-button is clicked.
   * Uses axios post to the specified URL, that returns a JSON object.
   * Gets that object from the endpoint and update the createdPostit[] in state.
   */
  handleForm(event) {
    let _this = this;
    event.preventDefault();
    axios
      .post("https://api.myjson.com/bins/", {
        headline: this.state.headline,
        sentence: this.state.sentence
      })
      .then(res => {
        axios({
          method: "get",
          url: res.data.uri
        }).then(function(response) {
          _this.setState(prevState => ({
            createdPostit: [...prevState.createdPostit, response.data]
          }));
        });
      });
  }

  //Sets headline
  handleSetHeadline(event) {
    this.setState({ headline: event.target.value });
  }

  //Sets sentence
  handleSetSentence(event) {
    this.setState({
      sentence: event.target.value
    });
  }

  //Sets createdPostit to an empty array
  handleDelete() {
    this.setState({
      createdPostit: []
    });
  }

  render() {
    let varKey = 0;

    return (
      /**
       * Returns a form with two textfields and a button.
       * Binds the input from the user to state.
       */
      <div className="row">
        <div className="col-sm-4">
          <Card bg="light" text="black" style={{ width: "18rem" }}>
            <Card.Body>
              <Form onSubmit={this.handleForm.bind(this)}>
                <Form.Group controlId="formHeadline">
                  <div className="text-center">
                    <Form.Label>Make new postit</Form.Label>
                  </div>
                  <Form.Control
                    type="headline"
                    placeholder="Headline"
                    value={this.state.headline}
                    onChange={this.handleSetHeadline.bind(this)}
                  />
                </Form.Group>
                <Form.Group className="TextArea">
                  <Form.Control
                    as="textarea"
                    type="TextArea"
                    placeholder="Type here"
                    value={this.state.sentence}
                    onChange={this.handleSetSentence.bind(this)}
                  />
                </Form.Group>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Button id="postitButton" variant="warning" type="Submit">
                    Create postit!
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
         

        {/**
        * Map function that shows Cards from the content of createdPostit[]
        */}
        <div className="col-sm-8">
          <CardColumns>
            {this.state.createdPostit.map(post => (
              <Card
                key={varKey++}
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
            <Button variant="dark" onClick={this.handleDelete.bind(this)}>
              Delete all postits
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddPostitCard;
