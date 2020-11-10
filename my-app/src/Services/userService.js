class UserService {
    constructor() {
        this.url = "https://lobby.leader.codes/api";
    }

    //  a(params) {
    //     console.log(params);
    // }

    // saveUser=(user)=>{
    //     console.log(user+"uuuuuu")
    //     const requestOptions={method:'POST',
    //      body: JSON.stringify(user)
    //     // body:user
    // };
    //     return fetch(`${this.url}/saveUserInformation`, requestOptions).then(res => res.json()).then((result) => { console.log(result) });
    // }
    saveUser = (user) => {
       // debugger
        console.log("save user", user)
        fetch(this.url + '/patch_update_user/'+user.username, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( user) 
        }).then((response) => {
         //  debugger;
            return response.json();
        }).then((message) => {
            console.log(message);
        })
    }

    getUserByUserName = (userName) => {
        // debugger;
        fetch(this.url + `/getUserByUserName/${userName}`,
            {
                method: 'GET'
                // ,body:JSON.stringify(userName)
            })
            .then((res) => {
                // debugger;
                return res.json();
            })
            .then((result) => {
                console.log(result);
            })
    }

}
export default new UserService();