const graphql = require('graphql')
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString
} = graphql;

// name = describe the type we are defining
// fields =  tell graphql about all properties that the user has
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {type: graphql.GraphQLString},
        firstName: {type: graphql.GraphQLString} ,
        age: {type: graphql.GraphQLInt}
    }
})