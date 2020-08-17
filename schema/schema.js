const graphql = require('graphql')
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema
} = graphql;

const users = [
    { id: '23', firstName: 'Bill', age: 20},
    { id: '47', firstName: 'Samantha', age: 21 }
];

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

//  Allow GraphQl to jump to a specific node in the graph of all data
// If you are looking for a user provide an id and I give you that User
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user:{
            type: UserType,
            args: { id: {type: GraphQLString }},
            resolve(parentValue, args) {
                return _.find(users, { id: args.id });
            }
        }

    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})