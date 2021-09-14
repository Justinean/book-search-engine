const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, { user = null, params }) => {
            return User.findOne({ $or: [{ _id: user ? user._id : params.id }, { username: params.username }] })
        }
    },

    Mutation: {
        
    }
}

module.exports = resolvers;