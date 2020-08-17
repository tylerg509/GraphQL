const express = require('express');
const { graphqlHTTP } = require('express-graphql');


const app = express();

// graph ql is registered as a middleware (via app.use)
app.use('/graphql', graphqlHTTP({
    graphiql: true
}))

app.listen(4000, () => {
    console.log('listening')
})