import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth.js";

const Jokes = () => {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("http://localhost:5000/api/jokes")
      .then(res => setJokes(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h3>Jokes</h3>
      {jokes.length === 0 ? (
        <p>Sign in to see jokes</p>
      ) : (
        jokes.map((item, index) => {
          return (
            <div key={index}>
              Joke: {item.joke} Id: {item.id}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Jokes;