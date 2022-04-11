import React from "react";
import axios from "axios";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const apiUrl = "http://localhost:8080";

function Tasks() {
  let [tasks, setTasks] = React.useState([]);
  let [editMode, setEditMode] = React.useState();
  let [inputError, setInputError] = React.useState();

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
    const taskId = event;

    axios.delete(`${apiUrl}/task/delete/${taskId}`).then((response) => {
      if (response) {
        getAllTasks();
      }
    });
  };

  const updateTask = (event) => {
    event.preventDefault();

    const task = tasks.find((t) => t.id === +event.target.id);

    if (event.target.taskName && !event.target.taskName.value) {
      setInputError(true);
      event.preventDefault();
      return;
    }

    const taskObject = {
      name: event.target.taskName.value,
      created_date: task.created_date,
      active: task.active,
    };

    axios.put(`${apiUrl}/task/update/${task.id}`, taskObject).then(() => {
      let editObject = {
        enableEdit: !editMode.enableEdit,
        taskId: task.id,
      };
      setEditMode(editObject);
      getAllTasks();
    });
  };

  const setActiveTask = (taskId) => {
    const task = tasks.find((t) => t.id === +taskId);

    const taskObject = {
      name: task.name,
      created_date: task.created_date,
      active: 1 - task.active,
    };

    axios.put(`${apiUrl}/task/update/${task.id}`, taskObject).then(() => {
      getAllTasks();
    });
  };

  const startEditing = (event) => {
    setTimeout(() => {
      let enableEdit = editMode?.enableEdit;
      let editObject = {
        enableEdit: enableEdit ? !enableEdit : true,
        taskId: event,
      };
      setEditMode(editObject);
    }, 100);
  };

  const validateInput = (event) => {
    if (event.target.value.trim()) {
      setInputError(false);
    } else {
      setInputError(true);
    }
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

      <div id="container">
        {!!tasks && (
          <div className="tasksContainer">
            {tasks.map((task) => (
              <form
                className="task"
                onSubmit={updateTask}
                id={task.id}
                key={task.id}
              >
                <Tooltip title={task.active ? "Complete" : "Uncomplete"}>
                  <Checkbox
                    id={"activeTaskCheckbox"}
                    checked={!task.active}
                    onChange={() => {
                      setActiveTask(task.id);
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Tooltip>
                {editMode &&
                editMode.enableEdit &&
                editMode.taskId === task.id ? (
                  <TextField
                    error={inputError}
                    id={"taskName"}
                    label="Name"
                    variant="outlined"
                    defaultValue={task.name}
                    onInput={validateInput}
                    helperText={inputError ? "Name cannot be empty" : ""}
                  />
                ) : (
                  <p>{task.name}</p>
                )}
                <div className="task-actions">
                  {editMode &&
                  editMode.enableEdit &&
                  editMode.taskId === task.id ? (
                    <Tooltip title="Save changes">
                      <IconButton type="submit" aria-label="save" size="large">
                        <SaveIcon fontSize="inherit" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Edit">
                      <IconButton
                        aria-label="edit"
                        size="large"
                        onClick={() => {
                          startEditing(task.id);
                        }}
                      >
                        <EditIcon fontSize="inherit" />
                      </IconButton>
                    </Tooltip>
                  )}

                  {editMode &&
                  editMode.enableEdit &&
                  editMode.taskId === task.id ? (
                    <Tooltip title="Close">
                      <IconButton
                        aria-label="close"
                        size="large"
                        onClick={() => {
                          startEditing(task.id);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Delete">
                      <IconButton
                        aria-label="delete"
                        size="large"
                        onClick={() => {
                          deleteTask(task.id);
                        }}
                      >
                        <DeleteForeverIcon
                          className="deleteIcon"
                          fontSize="inherit"
                        />
                      </IconButton>
                    </Tooltip>
                  )}
                </div>
              </form>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tasks;
