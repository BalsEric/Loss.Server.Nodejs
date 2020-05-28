//
// configuration for database and PORT
//

const config = {
    app: {
        port: 8080
    },
    db: {
        connection: 'mongodb+srv://@cluster0-97cpr.mongodb.net/test?retryWrites=true&w=majority'
    }
};

module.exports = config;