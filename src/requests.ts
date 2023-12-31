const requests = {
    postRecords: "http://localhost:3000/train_records",
    fetchIntervalRates: "http://localhost:3000/interval-rates",
    test: {
        ping: "http://localhost:3000/test/ping",
        ping_with_message: "http://localhost:3000/test/ping_with_message",
        greet: "http://localhost:3000/test/greet",
    },
    auth: {
        signup: "http://localhost:3000/signup",
        signin: "http://localhost:3000/signin",
    },
    user: {
        all: "http://localhost:3000/users",
    },
    image: {
        fetch: "http://localhost:3000/images",
    }
}

export default requests;
