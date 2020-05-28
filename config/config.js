//
// configuration for database and PORT
//

const config = {
    app: {
        port: 8080
    },
    db: {
        connection: 'mongodb+srv://ericbals:ventilator1@cluster0-97cpr.mongodb.net/test?retryWrites=true&w=majority'
    }
};

module.exports = config;