import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Meteor } from "meteor/meteor";
import ResolutionForm from "/imports/ui/ResolutionForm";
import Resolution from "/imports/ui/Resolution";
import RegisterForm from "/imports/ui/RegisterForm";
import LoginForm from "/imports/ui/LoginForm";

const resolutionsQuery = gql`
  query Resolutions {
    resolutions {
      _id
      name
      completed
      goals {
        _id
        name
        completed
      }
    }
    user {
      _id
      email
    }
  }
`;

const App = () => {
  const { client, loading, error, data, refetch } = useQuery(resolutionsQuery);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const reset = () => {
    client.resetStore();
  };

  return (
    <div>
      {data.user._id ? (
        <button
          onClick={() => {
            Meteor.logout();
            client.resetStore();
          }}
        >
          Logout
        </button>
      ) : (
        <div>
          <RegisterForm resetStore={reset} />
          <LoginForm resetStore={reset} />
        </div>
      )}
      {data.user._id && <ResolutionForm updateRes={refetch} />}
      {data.user._id && (
        <ul>
          {data.resolutions.map(resolution => (
            <Resolution
              key={resolution._id}
              resolution={resolution}
              updateRes={refetch}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
