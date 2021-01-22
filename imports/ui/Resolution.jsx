import React from "react";
import { gql, useMutation } from "@apollo/client";

import GoalForm from "/imports/ui/GoalForm";
import Goal from "/imports/ui/resolutions/Goal";

const DELETE_RESOLUTION = gql`
  mutation deleteResolution($_id: String!) {
    deleteResolution(_id: $_id) {
      _id
    }
  }
`;

const Resolution = ({ resolution, updateRes }) => {
  const [deleteResolution, { data }] = useMutation(DELETE_RESOLUTION);
  let id = resolution._id;

  const deleteClick = e => {
    e.preventDefault();
    deleteResolution({
      variables: {
        _id: id,
      },
    });
    updateRes();
  };

  return (
    <li>
      <span
        style={{
          textDecoration: resolution.completed ? "line-through" : "none",
        }}
      >
        {resolution.name}
      </span>
      <button onClick={deleteClick}>&times;</button>
      <ul>
        {!resolution.goals
          ? null
          : resolution.goals.map(goal => (
              <Goal goal={goal} key={goal._id} updateRes={updateRes} />
            ))}
      </ul>
      <GoalForm resolutionId={resolution._id} updateRes={updateRes} />
    </li>
  );
};

export default Resolution;
