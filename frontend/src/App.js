import { useEffect } from "react";
import axios from "axios";
function App() {
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/621af6cd00304b272c134721`)
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
