
class UserToken {
    constructor(){
        this.userToken = new Object();
    }
    addToken(token, username) {
        this.userToken[username] = token;
    }

    getTokenByUsername(username){
        return this.userToken[username] || null;
    }

    getUsernameByToken(token){
        for(var username in this.userToken) {
            if( this.userToken[username] == token) return username
        }
        return null;
    }
}
var userToken = new UserToken();

module.exports = userToken;