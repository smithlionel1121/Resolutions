import Resolutions from "/imports/api/resolutions/resolutions";
import Goals from "/imports/api/goals/goals";
import { Meteor } from "meteor/meteor";

export default {
  Query: {
    resolutions: (obj, args, { userId }) => {
      if (!userId) return [];
      return Resolutions.find({ userId }).fetch();
    },
  },

  Resolution: {
    goals: resolution => {
      return Goals.find({ resolutionId: resolution._id }).fetch();
    },
    completed: resolution => {
      const goals = Goals.find({
        resolutionId: resolution._id,
      }).fetch();

      if (!goals.length) return false;
      const completedGoals = goals.filter(goal => goal.completed);

      return goals.length === completedGoals.length;
    },
  },

  Mutation: {
    createResolution(obj, { name }, { userId }) {
      if (!userId) throw new Meteor.Error("Access Denied");
      const resolutionId = Resolutions.insert({
        name,
        userId,
      });
    },

    deleteResolution(obj, { _id }, { userId }) {
      const resolution = Resolutions.findOne({ _id, userId });
      if (!resolution) throw new Meteor.Error("Access Denied");
      Resolutions.remove(_id);
    },
  },
};
