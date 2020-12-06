import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import axios from 'axios';



export default class ContactFacebook extends Component {
    state = {
        isLoggedIn: false,
        userID: "",
        name: "",
        email: "",
        picture: "",
        accessTokenUser: '',
        accessTokenPage: '',
        done: false,
        alertOnce: false,
        formsToMongo: [],
        formsList: '',
        pageId: '',
        update: false
    };
    componentDidUpdate(previousProps, prevState) {
        //done-> alert
        if (prevState.done !== this.state.done && !this.state.alertOnce) {
            let formsName = ''
            this.state.formsList.map((form) => {
                formsName += form.name + ' AND '
            })
            alert(formsName + " forms data added to mongo")
            this.setState({ alertOnce: true })

            return
        }
        else if (!this.state.alertOnce) {

            if (prevState.formsToMongo !== this.state.formsToMongo && this.state.formsToMongo.length !== 0 && this.state.formsToMongo.length > (this.state.formsList.length - 1)) {
               //add user id to formsTo
                // save on mongodb
                axios.post('https://lobby.dev.leader.codes/api/contactFacebookForm/add', this.state.formsToMongo)
                    .then(res => console.log(res.data))
                    .then(this.setState({ done: true }))
                    .catch((err) => console.log(err))
            }
            // get the leads of form
            else if (prevState.formsList !== this.state.formsList || this.state.formsToMongo.length < this.state.formsList.length) {
                function startThis(this_obj) {
                    var getPage = fbPage((response, form) => {
                        let form_id = form.id
                        let form_name = form.name
                        console.log(response)
                        let answers = []

                        response.data.map((data) => {
                            let feeds = []
                            data.field_data.map((item) => {
                                feeds = feeds.concat({ [item['name']]: item['values'][0] })
                            })
                            const answer = {
                                facebook_contact_id: data.id,
                                time_of_submit_form: data.created_time,
                                feeds: feeds
                            };
                            answers = answers.concat(answer)
                        })
                        const contactFacebookForm = {
                            form_name: form_name,
                            form_id: form_id,
                            answers: answers
                        }
                        this_obj.setState({
                            formsToMongo: this_obj.state.formsToMongo.concat(contactFacebookForm)
                        })


                    });
                }
                const fbPage = (callback) => {
                    this.state.formsList.map((form) => {
                        const url2 = `${form.id}/leads`

                        window.FB.api(
                            url2,
                            'GET',
                            { access_token: this.state.accessTokenUser },
                            function (response) {
                                if (response && !response.error) {
                                    callback(response, form)
                                }
                            });
                    })
                }
                startThis(this)




            }
            //get all the forms of user
            else if (prevState.accessTokenPage !== this.state.accessTokenPage) {
                function startThis(this_obj) {
                    var getPage = fbPage((model) => {
                        console.log(model)
                        this_obj.setState({ formsList: model.data })
                    });
                }
                const fbPage = (callback) => {
                    const url3 = `${this.state.pageId}/leadgen_forms`

                    window.FB.api(
                        url3,
                        'GET',
                        { access_token: this.state.accessTokenPage },
                        function (response) {
                            if (response && !response.error) {
                                callback(response)
                                console.log("formm " + response.data[0].id)
                            }
                        });
                }
                startThis(this)

            }
            //get accessToken of the page
            else if (prevState.pageId !== this.state.pageId) {
                function startThis(this_obj) {
                    var getPage = fbPage((model) => {
                        console.log(model)
                        this_obj.setState({ accessTokenPage: model.access_token })
                    });
                }
                const fbPage = (callback) => {
                    const url1 = `${this.state.pageId}/?fields=access_token`
                    window.FB.api(
                        url1,
                        'GET',
                        { access_token: this.state.accessTokenUser },
                        function (response) {
                            if (response && !response.error) {
                                console.log("access_token " + response.access_token)
                                callback(response)
                            }
                        });
                }
                startThis(this)

            }
            //get the page of the user
            else if (prevState.userID !== this.state.userID) {

                function startThis(this_obj) {
                    var getPage = fbPage((model) => {
                        console.log(model)
                        this_obj.setState({ pageId: model.data[0].id })
                    });
                    console.log("get page " + getPage)
                }
                const fbPage = (callback) => {
                    const url = `${this.state.userID}/accounts/?fields=name`
                    window.FB.api(
                        url,
                        'GET',
                        { access_token: this.state.accessTokenUser },
                        function (response) {
                            if (response && !response.error) {
                                callback(response)
                            }
                        });
                }
                startThis(this)

            }
        }
    }

    responseFacebook = response => {
        // console.log(response);

        this.setState({
            isLoggedIn: true,
            userID: response.userID,
            name: response.name,
            email: response.email,
            picture: response.picture.data.url,
            accessTokenUser: response.accessToken,
        });

        debugger
    };


    componentClicked = () => console.log("clicked");

    get_forms_data = () => {

    }




    render() {
        let fbContent;
        if (this.state.isLoggedIn) {
            this.get_forms_data()
            fbContent = (
                <div
                    style={{
                        width: "400px",
                        margin: "auto",
                        background: "#f4f4f4",
                        padding: "20px"
                    }}
                >
                    <img src={this.state.picture} alt={this.state.name} />
                    <h2>Welcome {this.state.name}</h2>
                </div>
            );
        } else {
            fbContent = (
                <FacebookLogin
                    appId="809377206520138"
                    autoLoad={false}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook}
                />
            );
        }

        return <div>{fbContent}</div>;
    }
}