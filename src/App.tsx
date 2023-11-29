import { useState } from "react";
import {useMutation } from "@tanstack/react-query";

import "./App.scss";

interface RegistrationData {
  password: string;
  email: string;
}

function App() {
  const [password, setPassword] = useState<string>("");
  const [login, setLogin] = useState<string>("");

  const mutation = useMutation({
    mutationFn: async (registrationData: RegistrationData) => {
      const response = await fetch("http://localhost:3005/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return (
    <>
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />

      <button onClick={() => mutation.mutate({ password, email:login })}>send</button>
    </>
  );
}

export default App;
