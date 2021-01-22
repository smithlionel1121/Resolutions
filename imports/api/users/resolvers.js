// import User from "/imports/api/resolutions/resolutions";
// import { Meteor } from "meteor/meteor";

export default {
  Query: {
    user: (obj, args, { user }) => {
      return user || {};
    },
  },

  User: {
    email: user => {
      if (!user.emails) return null;
      return user.emails[0].address;
    },
  },
};
