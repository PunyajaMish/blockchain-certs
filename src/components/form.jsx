import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import b1 from "../b3.jpg";
class Forms extends Component {
  canBeSubmitted() {
    const { fname, lname, course, email, id, studentaddress, colname, coladdress, dateissued } = this.state;
    //make sure everything is not empty
    return (
      fname.length > 0 && //first name
      lname.length > 0 && //last name
      course.length > 0 && //course name
      email.length > 0 && //email
      id.length > 0 && //cert id
      studentaddress.length > 0 && //student address
      colname.length > 0 && //college name
      coladdress.length > 0 && //college address
      dateissued.length > 0
    );
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  addcertificate = event => {
    event.preventDefault();
    this.props.addcertificate(this.state);
    //console.log(this);
  };

  state = {
    fname: "",
    lname: "",
    course: "",
    email: "",
    id: "",
    studentaddress:"",
    colname:"",
    coladdress:"",
    dateissued:""
  };
  render() {
    const isEnabled = this.canBeSubmitted();
    return (
      <div
        className="container-fluid "
        style={{
          height: "100vw",
          //backgroundImage: `url(${b1})`,
          background: `url(${b1}) no-repeat `,
          backgroundSize: "cover"
        }}
      >
        <h1
          style={{
            fontFamily: "Montserrat",
            fontWeight: "bold",
            fontSize: "60px",
            color: "#66ffe7"
          }}
          className="mb-5 pt-3"
        >
          Create certificates on Blockchain
        </h1>
        <div
          style={{ marginBottom: "117px", background: "rgba(255,255,255,0.5)" }}
          className="w-50 container pt-3 pb-3 mx-auto"
        >
          <h2
            style={{
              fontWeight: "bold",
              fontFamily: "Montserrat"
            }}
            className="mb-2"
          >
            Enter the Certificate details
          </h2>
          <Form onSubmit={this.addcertificate}>
            <Form.Group>
              <Form.Control
                type="text"
                name="fname"
                value={this.state.fname}
                onChange={this.handleChange}
                placeholder="First name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                name="lname"
                value={this.state.lname}
                onChange={this.handleChange}
                placeholder="Last name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                name="course"
                value={this.state.course}
                onChange={this.handleChange}
                placeholder="Course name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="example@gmail.com"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="number"
                name="id"
                value={this.state.id}
                onChange={this.handleChange}
                placeholder="123"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                name="studentaddress"
                value={this.state.studentaddress}
                onChange={this.handleChange}
                placeholder="student address : 0X"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                name="colname"
                value={this.state.colname}
                onChange={this.handleChange}
                placeholder="University of"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                name="coladdress"
                value={this.state.coladdress}
                onChange={this.handleChange}
                placeholder="University address : 0X"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="date"
                name="dateissued"
                value={this.state.dateissued}
                onChange={this.handleChange}
                placeholder="yyyy/mm/dd"
              />
            </Form.Group>
            <Button
              disabled={!isEnabled}
              className="mt-3"
              variant="primary"
              type="submit"
            >
              Add certificate
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Forms;
