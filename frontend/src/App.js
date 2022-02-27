import { useEffect } from "react";
import axios from "axios";
function App() {
  const config = {
    headers: {
      "Content-Type": "Application/json",
      Accept: "Application/json",
    },
  };
  useEffect(() => {
    axios
      .post(`http://localhost:5000/api/login`, {
        email: "sajjad@gmail.com",
        password: "123123",
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Hello Charles</h1>
    </div>
  );
}

export default App;
