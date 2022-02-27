import { useEffect, useState } from "react";
import uniqid from "uniqid";
import axios from "axios";
function App() {
  const [carName, setCarName] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carPrice, setCarPrice ] = useState(0);
  const [userId ] = useState("621af6cd00304b272c134721");
  const [selectedImage, setSelectedImage] = useState("");

  const uploadFileHandler = async (e) => {
    e.preventDefault();
    setSelectedImage("");

    const file = e.target.files[0];
    // const formData = new FormData();
    // formData.append("image", file);

    if (!file) {
      alert("Please select a file");
      return;
    }
    if (!file.type.includes("image")) {
      alert("Selected file must be an image");
      return;
    }
    if (file.size > 100000) {
      alert("Image file size must be less than 100kb");
      return;
    }

    setSelectedImage(file);
  };

  const submitForm = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", selectedImage);
    data.append("name", carName);
    data.append("model", carModel);
    data.append("SKU", uniqid());
    data.append("price", carPrice);
    data.append("userId", userId);

    axios({
      method: "post",
      url: "http://localhost:5000/api/car",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={submitForm} encType="multipart/form-data">
        <input type="text" onChange={(e) => setCarName(e.target.value)} value={carName} name="name" placeholder="name" required/>
        <input type="text" onChange={(e) => setCarModel(e.target.value)} value={carModel} name="model" placeholder="model" required/>
        <input type="number" onChange={(e) => setCarPrice(e.target.value)} value={carPrice} name="price" placeholder="price" required/>
        <input type="text" defaultValue={userId} name="userId" placeholder="userId" required/>
    
        <input type="file" onChange={uploadFileHandler} name="image" required/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
