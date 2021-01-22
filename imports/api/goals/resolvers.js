import Goals from "/imports/api/goals/goals";
import { Meteor } from "meteor/meteor";

export default {
  Mutation: {
    createGoal(obj, { name, resolutionId }) {
      const goalId = Goals.insert({
        name,
        resolutionId,
        completed: false,
      });
      return Goals.findOne(goalId);
    },
    deleteGoal(obj, { _id }) {
      const goalId = Goals.remove({
        _id,
      });
      return Goals.findOne(goalId);
    },
    updateGoal(obj, { _id, completed }) {
      const goalId = Goals.update(_id, {
        $set: {
          completed,
        },
      });
      return Goals.findOne(goalId);
    },
  },
};
