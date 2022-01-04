import React, { Component, useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import b1 from "../b3.jpg";
import pdfobject from "pdfobject";
import { Auth } from "aws-amplify";

import web3 from "../web3";

// class Forms extends Component {
function Forms(props) {
  const [state, setState] = useState({
    fname: "",
    lname: "",
    course: "",
    email: "",
    id: "",
    studentaddress: "",
    colname: "",
    coladdress: "",
    dateissued: "",
    isLoaded: false,
    authUser: false,
  });

  const [currAccount, setCurrAccount] = useState();

  function getAccount(callback) {
    web3.eth.getAccounts((error, result) => {
      if (error) {
        console.log(error);
      } else {
        callback(result);
      }
    })
  }

  //getting the user's authentication group
  async function getUserGroup() {
    //get the current user that is logged in
    const user = await Auth.currentAuthenticatedUser()
    //get the list of group and store it in a variable
    const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
    //check if the group contains "Cert-Creators"
    if (groups.includes("Cert-Creators")) {
      //if so, the user is authenticated
      setState({ ...state, authUser: true });
    } else {
      //else, user is not authenticated
      setState({ ...state, authUser: false });
    }
  }

  function canBeSubmitted() {
    const { fname, lname, course, email, id, studentaddress, colname, coladdress, dateissued } = state;
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
  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const addcertificate = event => {
    event.preventDefault();
    props.addcertificate(state);
    setState({ ...state, isLoaded: true })
  };

  useEffect(() => {
    getUserGroup();
    getAccount(function (result) {
      setCurrAccount(result[0]);
    });
  }, [])

  const isEnabled = canBeSubmitted();

  return (
    <div>
      {state.authUser === true ?
        (<div
          className="container-fluid"
          style={{
            height: "100%",
            //backgroundImage: `url(${b1})`,
            background: `url(${b1})  no-repeat`,
            backgroundSize: "cover",
            color: "white"
          }}>
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
            style={{ marginBottom: "1.5em", background: "rgba(255,255,255,0.5)" }}
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
            <Form onSubmit={addcertificate}>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="fname"
                  value={state.fname}
                  onChange={handleChange}
                  placeholder="First name"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="lname"
                  value={state.lname}
                  onChange={handleChange}
                  placeholder="Last name"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="course"
                  value={state.course}
                  onChange={handleChange}
                  placeholder="Course name"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="email"
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="number"
                  name="id"
                  value={state.id}
                  onChange={handleChange}
                  placeholder="123"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="studentaddress"
                  value={state.studentaddress}
                  onChange={handleChange}
                  placeholder="student address : 0X"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="colname"
                  value={state.colname}
                  onChange={handleChange}
                  placeholder="University of"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="coladdress"
                  value={state.coladdress}
                  onChange={handleChange}
                  placeholder="University address : 0X"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="date"
                  name="dateissued"
                  value={state.dateissued}
                  onChange={handleChange}
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
          <div style={{ paddingBottom: "2em" }}>
            <h1>Your Certificate Here</h1>
            <p>Your certificate will be provided below once you have confirmed the transaction on MetaMask. <br />
              What you see below is just a template certificate and the data will change when a certificate is created.
            </p>
            {
              !state.isLoaded ?
                <Container>
                  <img width="auto" height="800px" src="/cert.png" />
                </Container>
                :
                <Container id="certFull">
                  {/* <div id="cert-reg"></div> */}
                  <div>
                    <div id="embed-cover"></div>
                    <div id="cert-reg"></div>
                  </div>
                  {currAccount === state.studentaddress ?
                    (<Button
                      className="btn"
                      onClick={() => {
                        props.save(state);
                      }}
                      variant="success"
                    // type="submit"
                    >
                      Save to PDF
                    </Button>)
                    :
                    (<Button
                      disabled={true}
                      className="btn"
                      variant="success"
                    // type="submit"
                    >
                      Save to PDF
                    </Button>)
                  }

                </Container>
            }
            <p>Alternatively, you can view a certificate that has already been created by going to the <a href="/view">view certificate</a> page.</p>
          </div>
        </div>)
        :
        (<div
          className="container-fluid"
          style={{
            height: "100vh",
            //backgroundImage: `url(${b1})`,
            background: `url(${b1})  no-repeat`,
            backgroundSize: "cover",
            color: "white"
          }}>
          <Container>
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
            <Row md={2} style={{ textAlign: "left" }}>
              <Col md={9}>
                <p>NOTE: THIS IS JUST A TEMPORARY EXAMPLE PAGE FOR HOW THE NON-AUTHENTICATED REGISTER PAGE COULD LOOK LIKE</p>
                <p>Sorry, it looks like you are not authorized to access the certificate creation.</p>
                <h1>What does our certification do?</h1>
                <p>We allow certified users to create and deploy certificate on the blockchain to securly certify learners on the completion of a course.
                  This certification's authenticity can be verified on the Etherium blockchain for owners of the certificate to prove their completion of a course.
                </p>
                <h1>How can I create certificates and upload them to the blockchain?</h1>
                <p>We provide a service to create a certificate which can then be uploaded to the blockchain. Here are some steps to take if you are interested:
                  <br />
                  1. Create an account with use by going to the login.<br />
                  2. Verify your account with the code that will be sent to your email.<br />
                  3. Contact us at info@innovfin.ca to discuss more indepth.<br />
                  4. Afterwards, we will give your InnovFin Certificate account access to create and deploy certificates on the blockchain.
                </p>
                <h1>I was given a certificate but I lost the file, how do I get another certificate?</h1>
                <p>As long as you have the transaction hash of your certificate you can always print out another certificate. The certificate has all the information
                  for someone to verify on the blockchain that the certificate and its information is genuine. You can go to the view certificate link and paste your transaction
                  hash there to recieve another certificate. Note that you have to be logged into the metamask account that is on the certificate (the same account as the "unique student address")
                  to be able to download the certificate.</p>
              </Col>
              <Col md={3} style={{ borderLeft: "1px solid rgba(255,255,255,0.6)" }}>
                <Row md={1} style={{ padding: "0em 1em" }}>
                  <h4>Useful links</h4>
                  <a href="/login">Login</a>
                  <a href="/view">View/Recieve a Certificate</a>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>)
      }

    </div>
  );
  // }
}

export default Forms;
