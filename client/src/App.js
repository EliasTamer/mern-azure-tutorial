import { useEffect } from "react";
import "./App.css";
import baseUrl from "./baseUrl";
import axios from "axios";
import { useState } from "react";

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/categories/getCategories`)
      .then((res) => {
        console.log(res.data.categories);
        setCategories(res.data.categories)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <h1>CATEGORIES</h1>

      {categories &&
        categories.map((category) => {
          return (
            <div>
              <h3>
                {category.name}
              </h3>
            </div>
          );
        })}
    </div>
  );
}

export default App;
