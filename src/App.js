import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import web3 from "./web3.js";
import "./App.css";
import Navhead from "./components/navbar";
import Forms from "./components/registration";
import Getcert from "./components/getcert";
import Reg from "./components/reg";
import Intro from "./components/intro";
import certcontract from "./config.js";
import Certificate from "./components/certificate";
import Home from "./Home.js";
import { jsPDF } from "jspdf";
import pdfobject from "pdfobject";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import Login from "./components/Account/Login.jsx";
import Signup from "./components/Account/Signup.jsx";
import SignupConfirm from "./components/Account/SignupConfirm.jsx";
import Account from "./components/Account/Account.jsx";
import ForgotPassword from "./components/Account/ForgotPassword.jsx";
import ForgotPasswordConfirm from "./components/Account/ForgotPasswordConfirm.jsx";
import Footer from "./components/Footer.jsx";

Amplify.configure(awsconfig);

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
  pdfobject.embed(doc.output('datauristring') + "#toolbar=0", "#cert-reg", { forcePDFJS: true })
}


class App extends Component {
  state = {
    account: "",
    name: "",
    course: "",
    txh: "",
    id: "", //new
    studentaddress: "", //new
    colname: "", //new
    coladdress: "", //new
    dateissued: "", //new
    output: [],
    tofound: false
  };
  componentDidMount() {
    console.log('mounted')
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    //added line 30
    await window.ethereum.enable()
    const accounts = await web3.eth.getAccounts();
    web3.eth.defaultAccount = accounts[0];
    //console.log(certcontract);
    // console.log(accounts);
    // console.log("acc", accounts[0]);
    this.setState({ account: accounts[0] });
  }

  //myevent =()=> certcontract.added();
  //myevent=>watch((error,result)=>{
  //  console.log(result);
  //});

  save = data => {
    doc.save(data.fname + "-" + data.course + "-certificate.pdf");
  }

  add = data => {
    //const certificates = new this.state.web3.eth.Contract(abi, address);
    //console.log(data.fname, data.course, data.email);
    //var name = data.fname + " " + data.lname;
    certcontract.methods.addcert(data.fname, data.lname, data.course, data.colname).send(
      {
        from: this.state.account,
        gas: 500000
      },
      (error, result) => {
        if (error) console.log("error " + error);
        else {
          this.setState({ name: data.fname + " " + data.lname });
          this.setState({ course: data.course + " " + "course" });
          this.setState({ studentaddress: data.studentaddress });
          this.setState({ id: data.id });
          this.setState({ txh: result });
          // console.log(result);
          createPDF(data.fname + " " + data.lname, data.course, data.studentaddress, result);
          /* certcontract.methods
             .getid()
             .call({ from: this.state.account }, (error, result) => {
               this.setState({ id: data.id });
               if (!error) console.log(result);
               else console.log(error);
             });*/
          //certcontract.events.added({}, (error, ev) => {
          //to use event below 2 lines
          //let key = Object.keys(ev[1].returnValues)[1];
          //console.log(ev[1].returnValues[key]);
          //});
        }
      }
    );
  };
  /*get = data => {
    console.log(data.id);
    certcontract.methods
      .getcert(data.id)
      .call({ from: this.state.account }, (error, result) => {
        if (!error) {
          console.log(result);
          const v = Object.values(result);
          this.setState({ output: v });
          this.setState({ tofound: true });
          //this.history.pushState("certfound");
          console.log(this.state.output);
        } else alert("Certificate not found");
      });
  };*/

  render() {
    return (
      <div className="App">
        <Router>
          <Navhead />
          <Route
            path="/"
            exact
            component={() => <Home />}
          />
          <Route
            path="/register"
            exact
            render={() => <Forms addcertificate={this.add} save={this.save} />}
          />
          <Route
            path="/verify"
            render={() => (
              <Getcert
                getcertificate={this.get}
                yes={this.state.tofound}
                details={this.state.output}
              />
            )}
          />
          <Route
            path="/view"
            component={() => (
              <Certificate
                sname={this.state.name}
                course={this.state.course}
                txh={this.state.txh}
                id={this.state.id}
                studentaddress={this.state.studentaddress}
              />
            )}
          />
          <Route path="/intro" component={Intro} />
          <Route path="/reg" component={Reg} />
          <Route path="/account" component={() => <Account />} />
          <Route path="/login" component={() => <Login />} />
          <Route path="/reset" component={() => <ForgotPassword />} />
          <Route path="/confirm-reset" component={() => <ForgotPasswordConfirm />} />
          <Route path="/signup" component={() => <Signup />} />
          <Route path="/signup-confirm" component={() => <SignupConfirm />} />
          <Footer/>
        </Router>
      </div>
    );
  }
}

export default App;
