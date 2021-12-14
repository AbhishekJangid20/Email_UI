import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import ReactDOM from "react-dom";
import React from 'react'
import Web3 from 'web3';
function App() {
  const EthCrypto = require('eth-crypto');
  const  web3 = new Web3(window.ethereum);
  const ethEnabled = async () => {
    const account=web3.eth.getAccounts()[0];
  if (window.ethereum) {

    await window.ethereum.send('eth_requestAccounts');
    window.web3 = new Web3(window.ethereum);
    return true;
  }
  return false;
}
ethEnabled();
async function encrypt(message,key){
  const encrypted = await EthCrypto.encryptWithPublicKey(
      key, // encrypt with alice's publicKey
      message
  );
  const string_cipher = EthCrypto.cipher.stringify(encrypted);
  return string_cipher;
}
// console.log(decrypt("610a8e2188af81409c6cb91d55bb4ec0037e738b90a1bd91655d523bdf3ef99f22680072b7798f3aa706bfa8715e7ca68c430108c31683116ba79d345ee16627dbd3813814a8edee3edf62040733546c42c264da4bc9c5e81a967d5463c32d81142d992aa204aaadff07d9d33cd6499c09","0x6b47a7a24412f7c17e019da34cb8098eb0f817d7c23384aba7885f2c50d26f60"));
// async function decrypt(value,key){
//   const newval = EthCrypto.cipher.parse(value);
//   const decrypted = await EthCrypto.decryptWithPrivateKey(
//     key,
//     newval);
//     return decrypted;
// }
async function solving(message,key1,key2){
  const string1=await encrypt(message,key1);
  const string2=await encrypt(message,key2);
  // const string3=await decrypt(string1,"0x6b47a7a24412f7c17e019da34cb8098eb0f817d7c23384aba7885f2c50d26f60");
  return {string1,string2};
}
const [inputs, setInputs] = useState({});

 const handleChange = (event) => {
   const name = event.target.name;
   const value = event.target.value;
   const value2 = event.target.value;
   const value3= event.target.value;
   setInputs(values => ({...values, [name]: value}))
 }
 async function loadContract() {
   console.log("done");
     return await new web3.eth.Contract([
      {
        "constant": false,
        "inputs": [
          {
            "name": "To_Address",
            "type": "string"
          },
          {
            "name": "Encrypted_Text_For_Sender",
            "type": "string"
          },
          {
            "name": "Encrypted_Text_For_Receiver",
            "type": "string"
          }
        ],
        "name": "setMessage",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "get_To_Address",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "get_Encrypted_Text_For_Reciever",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "get_Encrypted_Text_For_Sender",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
    ], '0x337A59f33FC1Cc25B8FfF481F1EDa2d6f030317C');
 }

 async function load(){
 window.contract = await loadContract();}
 load();
 const handleSubmit = (event) => {
   console.log("JJ");
   event.preventDefault();
   const output=solving(inputs["message"],inputs["sendpk"],inputs["receivepk"]);
   output.then(value => {console.log(value);
     window.contract.methods.setMessage(inputs["to"],value["string1"],value["string2"]).send({from:"0x1f162149325Aa2d3A774304bfBD42583a7583905"});
     console.log(value);
    //  window.location.reload();
   });}

 return (
 <form onSubmit={handleSubmit}>
  <div>
        <style dangerouslySetInnerHTML={{__html: "\n        *{\n            padding: 0;\n            margin: 0;\n        }\n        #p{\n            padding-top: 17%;\n            margin-left: 29%;\n        }\n        #heading{\n            float: left;\n            height: 150px;\n            width: 100%;\n            /* border: 1px solid black; */\n            background-color: lightskyblue;\n            margin-bottom: 5%;\n        }\n        #e{\n            text-align: center;\n            font-size: 60px;\n            color: rgb(84, 81, 81);\n            padding-top: 50px;\n        }\n        #t,#f{\n            flex-direction: row;\n            display: flex;\n        }\n       /* #f {\n           display: inline-block ;\n       } */\n        #t1{\n            width: 160px;\n            padding-bottom: 40px;\n        }\n        #to,#sendpk,#receivepk{\n            padding-top: 3px;\n            margin-top: -4px;\n            resize: none;\n            height: 35px;\n            /* padding-top: 2px; */\n            /* padding-bottom: 2px; */\n            width: 41%;\n            font-size: 16px;\n        }\n        #t2{\n            font-size: 16px;\n            resize: none;\n            width: 41%;\n            /* margin-top: -4px; */\n            padding-top: 2px;\n        }\n        #b {\n            font-size: 30px;\n            background-color: rgb(40, 255, 183);\n            border-radius: 10px;\n            border: none;\n            text-align: center;\n            width: 600px;\n            height: 50px;\n            margin-top: 60px;\n            margin-left: -10px;\n            cursor: pointer;\n        }\n        #b:hover{\n            background-color:greenyellow;\n        }\n        .footer{\n            margin-top: 12%;\n            font-size: 20px;\n            text-align: center;\n            height: 52.5px;\n            width: 100%;\n            background-color: rgb(95, 93, 93);\n            padding-top: 30px;\n\n        }\n        .footer a{\n            padding-left: 10px;\n            padding-right: 10px;\n            text-decoration: none;\n            color: white;\n            \n        }\n        \n    " }} />
        <div id="heading">
          <p id="e">Decentralized Email</p>
        </div>
        <div id="p">
          <div id="f">
            <h4 id="t1">Sender's Public Key: </h4>
            <textarea name="sendpk" id="sendpk" cols={80} rows={3} placeholder=" Sender's Public Key"  value={inputs.sendpk || ""} onChange={handleChange}/>
            

          </div>
          <div id="f">
            <h4 id="t1">Receiver's Public Key: </h4>
            <textarea name="receivepk" id="receivepk" cols={80} rows={3} placeholder=" Reciever's Public Key"  value={inputs.receivepk || ""} onChange={handleChange}/>
            {/* value={inputs.receivepk || ""}
            onChange={handleChange} */}
          </div>
          <div id="t">
            <h4 id="t1">To: </h4>
            <textarea name="to" id="to" cols={80} rows={1} placeholder=" Receiver's Address"  value={inputs.to || ""} onChange={handleChange}/>
            {/* value={inputs.to || ""}
            onChange={handleChange} */}
          </div>
          <div id="t">
            <h4 id="t1">Message: </h4>
            <textarea name="message" id="t2" cols={80} rows={5} placeholder=" Message"  value={inputs.message || ""} onChange={handleChange}/>
            {/* value={inputs.message || ""}
            onChange={handleChange} */}
          </div>
          <input type="submit" defaultValue="Submit" id="b" />
        </div>
        <footer className="footer">
          <a href="#">Abhishek Jangid</a>
          <a href="#">Anirudh Ramalingam</a>
          <a href="#">Rishabh Jalan</a>
        </footer>
      </div>
      </form>
 )
}

export default App;
