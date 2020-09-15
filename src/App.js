import React from 'react';
import './App.css';

const loginEndpoint = "https://accounts.google.com/o/oauth2/v2/auth?" + 
                        "response_type=code"+ 
                        "&redirect_uri=http://localhost:9000/oidctoken"+
                        "&client_id=%CLIENT_ID%"+
                        "&scope=openid email";
class App extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
        decodedJsonStr  : ''
   };

     this.state.authToken = this.getUrlParams().authToken;
      if(this.state.authToken != undefined) {
        //fire request and get decoded jwt

        fetch('http://localhost:9000/oidctoken/decode?authToken=' + this.state.authToken)
        .then(res => res.json())
        .then((data) => {
          var json = data.decodedTokenJson;
          this.setState({ decodedJsonStr: JSON.stringify(json, null, 3) })
        })
        .catch(console.log)
      
      }
     this.signIn = this.signIn.bind(this);
    }


 render() {
  return (
    <div className="App">
      <div id="signin">
          <span>Sign In to the desired google account to generate the token --> </span>
      	<input type="button" onClick={this.signIn} value="Sign In"/>
     </div> 

    <div id="signedIn">
       <div id="authorisedInfo">
        <span class="formLabel">JWT Token After Exchange</span>
        <textarea id="token" type="textarea" label="JWT Token After Exchange" rows="20" cols="50" value= {this.state.authToken}/>
       </div>

       <div id="decodedToken">
        <span class="formLabel">Decoded JWT Token</span>
        <textarea id="decoded" type="textarea" label="Decoded JWT Token" rows="20" cols="50"  value = {this.state.decodedJsonStr}/>
       </div>
    </div>
  </div>
  );
}


getUrlParams() {

  var paramMap = {};
  if (window.location.search.length == 0) {
    return paramMap;
  }
  var parts = window.location.search.substring(1).split("&");

  for (var i = 0; i < parts.length; i ++) {
    var component = parts[i].split("=");
    paramMap [decodeURIComponent(component[0])] = decodeURIComponent(component[1]);
  }

  console.log(paramMap)
  return paramMap;
}

signIn(googleUser) {
        var url =loginEndpoint;
        if(url == undefined || url.size == 0 ) {
          alert("enter the auth endpoint with params! ")
          return;
        }

        window.location.href = url;
      }

    }


export default App;
