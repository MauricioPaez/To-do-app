import React from "react";
import axios from "axios";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const apiUrl = "http://localhost:8080";

function Tasks() {
  const [tasks, setTasks] = React.useState([]);

  const getAllTasks = () => {
    axios.get(`${apiUrl}/task`).then((response) => {
      setTasks(response.data);
    });
  };

  React.useEffect(() => {
    getAllTasks();
  }, []);

  const createNewTask = (event) => {
    event.preventDefault();

    const newTaskName = event.target.newTaskName.value;

    if (!newTaskName.trim()) {
      return;
    }

    const taskObject = {
      name: newTaskName,
      created_date: new Date(),
      active: 1,
    };

    axios.post(`${apiUrl}/task/create`, taskObject).then((response) => {
      if (response) {
        getAllTasks();
        document.forms[0].reset();
      }
    });
  };

  const deleteTask = (event) => {
    event.preventDefault();

    const taskId = event.target.id;

    axios.delete(`${apiUrl}/task/delete/${taskId}`).then((response) => {
      if (response) {
        getAllTasks();
      }
    });
  };

  const updateTask = (event) => {
    const task = tasks.find((t) => t.id === +event.target.value);

    const taskObject = {
      name: task.name,
      created_date: task.created_date,
      active: 1 - task.active,
    };

    axios.put(`${apiUrl}/task/update/${task.id}`, taskObject).then(() => {
      getAllTasks();
    });
  };

  return (
    <div>
      <div id="newTaskContainer">
        <form className="newTask" onSubmit={createNewTask} autoComplete="off">
          <TextField id={"newTaskName"} label="Name" variant="outlined" />
          <Button type="submit" variant="contained" endIcon={<AddIcon />}>
            Add
          </Button>
        </form>
      </div>

      <div>
        {!!tasks && (
          <div className="tasksContainer">
            {tasks.map((task) => (
              <form
                className="task"
                onSubmit={deleteTask}
                id={task.id}
                key={task.id}
              >
                <Checkbox
                  checked={!task.active}
                  onChange={updateTask}
                  value={task.id}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <p>{task.name}</p>
                <IconButton type="submit" aria-label="delete" size="large">
                  <DeleteForeverIcon
                    className="deleteIcon"
                    fontSize="inherit"
                  />
                </IconButton>
              </form>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tasks;
