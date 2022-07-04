import { useEffect, useState } from "react";
import "./styles.css";

function App() {
  const [data, setData] = useState([]);
  // get Todos

  const getTodos = () => {
    fetch("http://localhost:8000/posts")
      .then((res) => res.json())
      .then((d) => {
        setData(d);
      });
  };

  useEffect(() => {
    getTodos();
  }, []);

  const postData = () => {
    return fetch(`http://localhost:8000/posts/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: "Rovin Singh",
        completed: false,
        salary: 20000
      })
    })
      .then((res) => res.json())
      .then((d) => {
        getTodos();
      });
  };

  const deleteData = (id) => {
    fetch(`http://localhost:8000/posts/${id}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((d) => {
        getTodos();
      });
  };

  // Update Todo

  const updateData = (item, id) => {
    return fetch(`http://localhost:8000/posts/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({ ...item, completed: !item.completed })
    })
      .then((res) => res.json())
      .then((d) => {
        getTodos();
      });
  };

  // Sorting Data

  const sortData = () => {
    return fetch(`http://localhost:8000/posts/?_sort=salary&_order=asc`)
      .then((res) => res.json())
      .then((d) => {
        console.log(d);
        setData(d);
      });
  };

  // filterData

  const filterData = () => {
    return fetch("http://localhost:8000/posts/?salary=10000")
      .then((res) => res.json())
      .then((d) => {
        console.log(d);
        setData(d);
      });
  };
  return (
    <div className="App">
      <h1>JSON Server </h1>
      {data.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            gap: "20px",
            margin: "auto",
            padding: "10px",
            justifyContent: "space-evenly"
          }}
        >
          <p>{item.name}</p>
          <p>{item.salary}</p>
          {item.completed ? <p>Done</p> : <p>Not Done</p>}
          <button onClick={() => updateData(item, item.id)}>Toggle</button>
          <button onClick={() => deleteData(item.id)}>Delete</button>
        </div>
      ))}

      <div>
        <button onClick={postData}>Add Data</button>
        <button onClick={sortData}>Sort</button>
        <button onClick={filterData}>Filter Data</button>
      </div>
    </div>
  );
}
export default App;
