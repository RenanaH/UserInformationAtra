import { gapi } from 'gapi-script'
import React from 'react'
import { connect } from 'react-redux';
// import {actions} from '../Redux/actions/Action';
import {actions} from '../../redux/actions/user.action';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = theme => ({
    
    button:{
      //color:'white',
      // margintTop:'80%',
      borderRadius: '290px',
      width:'90%',
      height:'100%;',
      alignItems:'center',    
    },

});

class GoogleContacts extends React.Component {
  constructor(prop) {
    super(prop);
     
  }

  componentDidMount () {
    this.load()
  }

  //sign-in with google account
  authenticate = () => {
    return gapi.auth2
      .getAuthInstance()
      .signIn({
        scope:
          'https://www.googleapis.com/auth/contacts.readonly'
      })
      .then(
        function (res) {
          //this.loadClient();
          console.log('Sign-in successful' + res)
          //this.setState({ data: res.Qt.zu })
          debugger;
          // this.props.setUserGoogleEmail(res.Qt.zu);
          this.loadClient()
        }.bind(this),
        function (err) {
          console.error('Error signing in', err)
        }
      )
  }

  //load google people api
  loadClient = () => {
    gapi.client.setApiKey('AIzaSyDGUA2f430SdP-MGGMaFy2_rPDJzjACffM')
    return gapi.client
      .load('https://people.googleapis.com/$discovery/rest?version=v1')
      .then(
        function () {
          console.log('GAPI client loaded for API')
          this.getGoogleContacts()
        }.bind(this),
        function (err) {
          console.error('Error loading GAPI client for API', err)
        }
      )
  }
  
  //get contacts list
  getGoogleContacts =() =>{
    let userId=this.props.user.uid;
    let tokenFromCookies= this.props.tokenFromCookies;
    return gapi.client.people.people.connections
      .list({
        resourceName: 'people/me',
        personFields: 'names,emailAddresses'
      })
      .then(
        function (response) {
          console.log('Response', response)
          const length = response.result.connections.length
          alert(`נמצאו ${length} אנשי קשר`)
          debugger;
          //go to serve ffor save iin mongo db
          fetch('https://lobby.dev.leader.codes/api/saveGoogleContacts/'+userId,{
            method:'POST',
            headers:{ 
                Accept: 'application/json',
                'Content-Type':'application/json',
                Authorization: tokenFromCookies //cookies
                // Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJzaW1kc01ycmNKZHBRZ3RhOGtnWHlRQmRERnkyIiwiZW1haWwiOiJjdG9AbGVhZGVyLmNvZGVzIiwiaXAiOiI1LjEwMi4yNDYuMjAyIiwiaWF0IjoxNjA0NDgyOTc0fQ.Nn2IC7j_VCDOFIkbwzT3nao0l7OcqbNqDUKkcL0Aoik"
                // JSON.stringify({ "body": mailHTML, "list": emailList, "subject": subjectEmail }),
            },
            body: JSON.stringify(response.result.connections)
          }) 
            .then(() => {
                console.log('contacts save on mongo');
                this.props.setGoogleContacts(response.result.connections);
            })
            .catch(err => {
              console.error(err)
            })
            return;
        },
        function (err) {
          console.error('Execute error', err)
        }
      )
  }

  //load auth2 key
  load () {
    gapi.load('client:auth2', function () {
      gapi.auth2.init({
        client_id:
          '326157560694-96hn3i52jjj2qq6ulijebchsesgmfnob.apps.googleusercontent.com'
      })
    })
  }
  //

  render () {
    const { classes } = this.props;
    return (
      <div>
        {/* <button onClick={this.authenticate}>
          sign in with google
        </button> */}
        <Button variant="contained" className={classes.button} fullWidth={true} size="small" onClick={this.authenticate}>
        sign in with google
        </Button>
        {/* <Welcome googleCalendarIdd={this.state.data}></Welcome> */}
      </div>
    )
  }
}
const mapStateToProps = (state) =>{
    return {
        user: state.user.user,
        tokenFromCookies: state.user.tokenFromCookies,
    }
}

const mapDispatchToProps = (dispatch) => ({

    setGoogleContacts: (googleContacts) => dispatch(actions.setGoogleContacts(googleContacts)),
  })
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(useStyles)(GoogleContacts));
