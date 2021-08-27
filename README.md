Certification System

One of the features that InnovFin platform has to offer is the Certification System. As an educational platform offering various courses and modules, the students/users will also be expecting a certification once they complete their course and/or module. InnovFin is using advanced technologies like Blockchain, Artificial Intelligence, Augmented Reality and Virtual Reality to create a safe and secure platform. Hence, this certification system naturally uses Blockchain, the digital ledger with secure, unmodifiable data. 

Tools Used : 
Solidity : For writing the smart contract of the certification system, the language Solidity is used. The version of Solidity used is 0.5.0. 


JavaScript : For the front-end functionality of the form that takes input, and for connecting the browser to web 3, JavaScript has been used


React : Instead of relying heavily on HTML and CSS, React has been used for the frontend web designing purposes. 


Metamask : Metamask is the digital wallet that is being used in the test run below. The program runs and connects automatically to metamask using web3. 

Functionality : 
How does  the system work?

The smart contract was compiled and employed on Remix IDE. The ABI of the contract and the transaction of the address of the deployed contract transaction are copied and added to the config.js file. In the JavaScript file App.js we import these values from the config.js file and use it to call the smart contract function to add the certificate and the values that are taken from the form below. 

React js have been used, therefore, we npm run start on the terminal to start react in our browser. Once a new tab opens in the browser, we reach the form page where the student details are to be entered. Once the page loads, metamask pops up asking to be connected to the site. 





. The details that need to be entered are : 
First Name of the student
Last Name of the student
Course Name the student will be receiving the certificate of completion for
Email address of the student
The manually kept and recorded id of the certificate (number)
The student wallet address that is connected to the browser and will pay the gas fee
Name of the University that hosted the course and is rewarding the certificate
University Wallet Address 
Date the certificate is being issued (in most cases, it will be the current day’s date)

This page also has a menu with the following options :
 
Home
This is the page with the form discussed above where the student details are entered and then the add certificate button is pressed. 


Register
This page does not have any code yet, but the goal of this page is to allow new universities to register as a certified university to be able to add courses/modules on the platform. This functionality is to be discussed in future and hence for now can be removed/avoided.


How it Works
This page simply includes a page that explains how this certification system is working in a simple diagram. 


Verify
Verify is to verify the certificate the student has received Once certificate is added and the transaction gets completed, the transaction hash can be entered in the provided input field and upon clicking verify it redirects to the etherscan transaction page. If the transaction is valid then the transaction details will print on the page.  




View Certificate
After the add certificate is pressed on the Home Page, the student can view the pdf version of the certificate on the View certificate page. This page does show a print button, but it is not functioning as of yet. The most important is the transaction hash, but if the student wants they should be able to print the certificate in the pdf format if they wish to have some kind of pdf hard copy. This certificate was designed and is custom to InnovFin. That being said, later on if more universities are adding courses and wish to use their own certificate (similar format but with different color and name), they should be able to do that. This functionality might have to be added then later on. 


The Name of the student, course name, wallet address of the student, id of the certificate and the transaction hash is printed on the certificate. 

The signatures have yet not been added since they are not available. However, the page certstyle.css in the src folder is responsible for the positioning and format of the printed information on the certificate so when available the code needs to be put here for the styling of the signatures. The certificate.jsx file stores the react code for this page. This is where the variables input entered are being accessed and given an id to be able to style.


Working Example : 
Running React
The first step is to go into the folder and run the React 

When the page loads, the metamask will get connecte. If we are not logged into the metamask, then it will ask you to enter the password automatically and then get connected. If there are more than one accounts, then it will ask you to choose which account you want to connect to the browser..

Adding the information of the student


When Add Certificate is pressed, metamask pop up, stating if we have sufficient funds, and if do, it asks for confirmation on the transaction. 



As we can see the transaction is pending. 
The transaction does not take more than 2 minutes. However, it still depends on the network traffic on the test network we are working on, so this time can often vary. 


View Certificate
While the transaction is being processed, the pdf certificate can be seen on the View Certificate page. As it is a big image, I tried to snapshot the part of the certificate with the printed information. 

 As we can see the certificate hash matches the transaction hash of this transaction which means it is pulling the right information. 

Transaction Confirmed.
Now viewing the confirmed transaction on the testnet etherscan. 
Transaction Hash for this test Transaction: 0xaf93bbec67ba240c59bc636c368f0d88818d76d1490464614cbc319078f19663

Link to the etherescan
If we click on ‘click to see more’, we can actually also see the metadata information after decoding. 


Coding Files : 
The main folder contains the node_modules folder which contains well the node_modules content. This stores the react functions. Babel which is being used. So it is important to not delete this folder. There was once an error in the node_modules > @types > React > index.d.ts. Turns out there was a duplicate of react version, and hence it was showing a few errors - one of which was ‘Duplicate identifier ‘LibraryManagedAttributes’’. Not sure why that happened, but in case if there is the same error then to fix it, simply
Open Command Terminal
Go to the desired folder, which in our case is named blockchain-certs-master
Then type the following command : 
yarn remove @types/react
Next type : yarn add --dev @types/react

This link should be helpful in this scenario. 

Inside the main folder then there are two more folders - public and src
Other than that we have the necessary files like the package.json, and package-lock.json 
The .txt version of our smart contract is also in the main folder itself. This is because, since the open zeppelin library that we have used are constantly changing their code and versions, so as to ensure unnecessary constant changes and popping errors, we have deployed the contract already once and are using the abi and the transaction hash of that transaction of deployment. 

The public folder includes the basic files that have not been used or edited. The main files are in the src folder. 

The src folder contains the folder components which includes the react files : 
Certfound.jsx
This file contains the code that is not exactly called. What it is supposed to do is when the user enters the id of the certificate the certificate is fetched and the details are printed. This has not been implemented yet. 
Certificate.jsx
As mentioned before, this file contains the view certificate page code
Form.jsx
This file contains the react code for the main home page - the form fields where the students’ information are filled in.
Getcert.jsx
This file connects to the ropsten page to access the transaction details of the translation hash that is entered. 
Intro.jsx
This page does not contain any important code as such. It is as the name suggest an intro page 
Ipfs.jsx
In case we end up using ipfs, this page can contain the code for that. This page is currently empty
Navbar.jsx
This page contains the code for the navigation bar with the menu and the company name
reg.jsx
This is the “Register” page that we are not using as of now. 


The other files in the src folder are as follows : 
App.css
This file contains the general styling of the page
App.js
This is the main file that contains all the JavaScript code. This code tells what should happen when the Add Certificate button is pressed. This file converts the browser into a blockchain browser by using web3. This is the main JS file to look at. 
App.test.js
This was a test js file for testing purpose at the start
Image files 
There are 4 image files. One of them being the cert.png, this is the main certificate template that is being used for the view certificate page. Other images are simple logos, diagrams (for the how it works page)  and background images used along the webpage. 
Certstyle.css
This file contains the code for styling the positioning for the view certificate page 
Config.js
This file contains the information about the smart contract
Index.css
General styling of the webpage
Index.js
The index.js file is the javascript file for the default index file. 
Nav.css
Css for nav
serviceWorker.js
This is an optional code used to register and load page faster offline. 
web3.js
The code to connect to web 3. 


Gas fee and deployment fee
We tried once deploying on the ethereum mainnet to understand the gas fee and deployment fee that InnovFIn will need. 
For deployment it required almost CAD40 and for each transaction of adding the certificate, CAD2 is needed. So, we can say that the gas fee is manageable and affordable. 
