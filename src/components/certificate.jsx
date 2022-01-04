import React, { Component, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "../certstyle.css";
import printJs from "print-js";
import web3 from "../web3";
import { jsPDF } from "jspdf";
import pdfobject from "pdfobject";

var doc = new jsPDF({
  orientation: "landscape"
})

function createPDF(name, course, saddress, txhash) {
  var img = new Image;
  img.src = "/cert.png"
  doc.addImage(img, "png", 0, 0, 297, 210);
  //name
  doc.setFontSize(40)
  doc.setFont("Lato-Regular", "normal");
  doc.text(name, (doc.internal.pageSize.width / 2) + 5, 60, null, null, "center");
  //course
  doc.setFontSize(30)
  doc.setFont("Lato-Black", "bold");
  doc.text(course, (doc.internal.pageSize.width / 2) + 5, 95, null, null, "center");

  doc.setFontSize(12)
  doc.setFont("Lato-Regular", "normal");
  doc.text(saddress, (doc.internal.pageSize.width / 2) + 22, 189, null, null, "center");

  doc.setFont("Lato-Regular", "normal");
  doc.text(txhash, (doc.internal.pageSize.width / 2) + 45, 197, null, null, "center");
  pdfobject.embed(doc.output('datauristring') + "#toolbar=0", "#cert", { forcePDFJS: true })
}

class Certificate extends Component {

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // componentDidMount() {
  //   document.addEventListener('contextmenu', (e) => {
  //     e.preventDefault();
  //   });
  // };

  state = {
    fname: "",
    lname: "",
    fullname: "",
    course: "",
    colname: "",
    saddress: "",
    txhash: "",
    loaded: false,
    currAccount: ""
  };

  getAccount(callback) {
    web3.eth.getAccounts((error, result) => {
      if (error) {
        console.log(error);
      } else {
        callback(result);
      }
    })
  }

  getTransDetails = data => {
    let account = "";

    this.getAccount(function (result) {
      account = result[0];
      // console.log("account ", result[0], account)
    });

    web3.eth.getTransaction(this.state.txhash, (err, tx) => {
      try {
        // console.log("data", data)
        let tx_data = tx.input;
        let input_data = "0x" + tx_data.slice(10);
        let params = web3.eth.abi.decodeParameters(["string", "string", "string", "string"], input_data);
        // console.log(tx.to);
        // console.log(params);

        this.setState({
          fname: params[0],
          lname: params[1],
          fullname: params[0] + " " + params[1],
          course: params[2],
          colname: params[3],
          loaded: true,
          saddress: tx.from,
          currAccount: account
        });

        createPDF(params[0] + " " + params[1], params[2], tx.from, this.state.txhash);
      } catch (e) {
        alert("Transaction Hash could not be found. Please try again or check your metamask settings.")
        console.log(e)
      }
    });
  }
  // state = {};
  onclickprint = event => {
    event.preventDefault();
    //doc.save(this.props.sname + "_" + this.props.course +".pdf");
    //printJs("printcertificate", "html");
  };

  render() {
    console.log("state", this.state)
    return (
      <div className="w-100 pc " id="top">
        <Container id="certContainer">
          <h1>Retrieve Certificate from the Blockchain.</h1>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                name="txhash"
                value={this.state.txhash}
                onChange={this.handleChange}
                placeholder="Transaction Hash"
              />
            </Form.Group>
            <Button
              className="mt-3"
              variant="primary"
              // type="submit"
              onClick={() => {
                this.getTransDetails();
              }}
            >
              Get Certificate Details
            </Button>
          </Form>
          {!this.state.loaded ? null
            :
            <Container id="certFull">
              <div>
                <div id="embed-cover"></div>
                <div id="cert"></div>
              </div>

              {this.state.saddress === this.state.currAccount ?
                (<Button
                  className="btn"
                  onClick={() => {
                    doc.save(this.state.fname + "-" + this.state.course + "-certificate.pdf");
                  }}
                  variant="success"
                // type="submit"
                >
                  Save to PDF
                </Button>)
                :
                (<div>
                  <Button
                    disabled={true}
                    className="btn"
                    onClick={() => {
                      doc.save(this.state.fname + "-" + this.state.course + "-certificate.pdf");
                    }}
                    variant="success"
                  // type="submit"
                  >
                    Save to PDF
                  </Button>
                </div>)
              }

            </Container>
          }
          <p style={{ color: "white", margin: "1em 0em" }}>The owner of the certificate will be able to download a PDF of this certificate.</p>
        </Container>
      </div>
    );
  }
}

export default Certificate;
