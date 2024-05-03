const { AuthenticationError, signToken } = require('../utils/auth');
const { User } = require('../models');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id });
        return userData;
      }
      // throw new AuthenticationError('You need to be logged in!');
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      console.log("Hit Login Server route");
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
        //  throw new GraphQLError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, args) => {
      console.log("Adding User to DB");
      const user = await User.create(args);
      const token = signToken(user);
      console.log("User: ", user);
      console.log("Token: ", token);
      return { token, user };
    },

    saveBook: async (parent, { input }, context) => {
      console.log("Context: ", context);
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: input } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
