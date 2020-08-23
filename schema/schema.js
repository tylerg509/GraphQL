const graphql = require('graphql');
const _ = require('lodash')
const axios = require('axios')
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLString,
    GraphQLSchema
} = graphql;


const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString},
        description: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType), // note that UserType makes referece to companytype and vice versa. So we need to wrap fields in an arrow function
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
                .then(res => res.data)
            }
        }
    })
})

// name = describe the type we are defining
// fields =  tell graphql about all properties that the user has
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: graphql.GraphQLString},
        firstName: {type: graphql.GraphQLString} ,
        age: {type: graphql.GraphQLInt},
        company: {
            type: CompanyType, // This is how you create relationship between company type and user type
            resolve(parentValue, args) { // In the graphQl server there is no property company so we need a resolve function
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`) // make request to get company
                .then(res => res.data)
            }
        }
    })
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
                return axios.get(`http://localhost:3000/users/${args.id}`)
                .then(resp => resp.data);
            }
        },
        company: {
            type: CompanyType,
            args: { id: {type: GraphQLString} },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${args.id}`)
                .then(res => res.data)
            }
        }

    }
})

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: {type: GraphQLString},
                age: {type: GraphQLInt},
                companyId: {type: GraphQLString}

            },
            resolve() {

            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})