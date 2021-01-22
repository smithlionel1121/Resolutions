import React from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_RESOLUTION = gql`
  mutation createResolution($name: String!) {
    createResolution(name: $name) {
      _id
      name
    }
  }
`;

function ResolutionForm({ updateRes }) {
  const [createResolution, { data }] = useMutation(CREATE_RESOLUTION);
  let name;

  const submitForm = e => {
    // console.log(name.value)
    e.preventDefault();
    createResolution({
      variables: {
        name: name.value,
      },
    }).catch(() => console.log(data));
    name.value = "";
    updateRes();
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <input type="text" ref={input => (name = input)} />
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => updateRes()}>Submit</button>
    </div>
  );
}

export default ResolutionForm;
