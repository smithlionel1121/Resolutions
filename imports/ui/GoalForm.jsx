import React from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_GOAL = gql`
  mutation createGoal($name: String!, $resolutionId: String!) {
    createGoal(name: $name, resolutionId: $resolutionId) {
      _id
    }
  }
`;

function GoalForm({ resolutionId, updateRes }) {
  const [createGoal, { data }] = useMutation(CREATE_GOAL);
  let name;

  const submitForm = e => {
    e.preventDefault();
    createGoal({
      variables: {
        name: name.value,
        resolutionId,
      },
    });
    name.value = "";
    updateRes();
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <input type="text" ref={input => (name = input)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default GoalForm;
