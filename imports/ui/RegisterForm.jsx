import React, { useState } from "react";

const RegisterForm = ({ resetStore }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = e => {
    e.preventDefault();
    Accounts.createUser({ email, password }, error => {
      if (!error) resetStore();
      console.log(error);
    });
  };

  return (
    <form className="register-form" onSubmit={submit}>
      <label htmlFor="email"></label>
      <input
        type="email"
        name="email"
        placeholder="email"
        onChange={e => setEmail(e.target.value)}
        required
      />

      <label htmlFor="password"></label>
      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={e => setPassword(e.target.value)}
        required
      />

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
