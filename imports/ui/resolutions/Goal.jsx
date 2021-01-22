import React from "react";
import { gql, useMutation } from "@apollo/client";

const DELETE_GOAL = gql`
  mutation deleteGoal($_id: String!) {
    deleteGoal(_id: $_id) {
      _id
    }
  }
`;

const UPDATE_GOAL = gql`
  mutation updateGoal($_id: String!, $completed: Boolean!) {
    updateGoal(_id: $_id, completed: $completed) {
      _id
    }
  }
`;

const Goal = ({ goal, updateRes }) => {
  const [updateGoal, { data }] = useMutation(UPDATE_GOAL);
  const [deleteGoal, {}] = useMutation(DELETE_GOAL);

  const deleteClick = e => {
    e.preventDefault();
    deleteGoal({
      variables: {
        _id: goal._id,
      },
    });
    updateRes();
  };

  const updateClick = e => {
    let completed = !goal.completed;
    e.preventDefault();
    updateGoal({
      variables: {
        _id: goal._id,
        completed,
      },
    });
    updateRes();
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={goal.completed}
        onClick={updateClick}
        readOnly
      />
      <span
        style={{ textDecoration: goal.completed ? "line-through" : "none" }}
      >
        {goal.name}
      </span>
      <button onClick={deleteClick}>&times;</button>
    </li>
  );
};

export default Goal;
