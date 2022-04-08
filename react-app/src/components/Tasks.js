import React from "react";
import axios from "axios";

function Tasks() {
  const [tasks, setTasks] = React.useState([]);

  React.useEffect(() => {
    axios.get(`http://localhost:8080/task`).then((response) => {
      setTasks(response.data);
    });
  }, []);

  const setDate = (date) => new Date(date).toLocaleDateString();

  return (
    <div>
      {!!tasks && (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <h4>{task.name}</h4>
              <p>Is Active? {task.active === 1 ? "Sí!!" : "No ):"}</p>
              <p>Created date: {setDate(task.created_date)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tasks;
