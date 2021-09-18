const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, {user}) => {
            return User.findOne({ _id: user._id})
        }
    },

    Mutation: {
        login: async (parent, body) => {
            console.log(body)
            const user = await User.findOne({ email: body.email });
            if (!user) {
                return { message: "Can't find this user" };
            }

            const correctPw = await user.isCorrectPassword(body.password);

            if (!correctPw) {
                return { message: 'Wrong password!' };
            }
            const token = signToken(user);
            console.log(token, user)
            return { token, user };
        },
        addUser: async (parent, body) => {
            console.log(body)
            const user = await User.create(body);

            if (!user) {
                return { message: 'Something is wrong!' };
            }

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, args) => {
            console.log(args);
            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $addToSet: { savedBooks: body } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            } catch (err) {
                console.log(err);
                return err
            }
        },
        removeBook: async (parent, { user, params }) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: { bookId: params.bookId } } },
                { new: true }
            );
            if (!updatedUser) {
                return { message: "Couldn't find user with this id!" };
            }
            return updatedUser;
        }
    }
}

module.exports = resolvers;