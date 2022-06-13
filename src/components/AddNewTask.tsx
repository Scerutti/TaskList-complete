import React, { FC, useState, FormEvent } from "react";
import { useDispatch } from "react-redux";

import { List, Task } from "../store/types";
import { addTask, setNotification } from "../store/actions";

interface AddNewTaskProps {
  list: List;
}

const AddNewTask: FC<AddNewTaskProps> = ({ list }) => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");

  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    setTaskName(e.currentTarget.value);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (taskName.trim() === "") {
      return alert("Nombre de tarea requerido!");
    }

    const newTask: Task = {
      name: taskName,
      id: `task-${new Date().getTime()}`,
      completed: false,
    };

    dispatch(addTask(newTask, list));
    dispatch(setNotification(`Nueva tarea creada ("${newTask.name}")!`));
    setTaskName("");
  };

  return (
    <section className="section">
      <h2 className="is-size-4 has-text-centered">
        Agrega una nueva tarea al campo seleccionado
      </h2>
      <form onSubmit={submitHandler}>
        <div className="field">
          <label className="label">Nombre de la tarea</label>
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="Agregar Tareas"
              value={taskName}
              onChange={changeHandler}
            />
          </div>
          <div className="control mt-4">
            <input
              type="submit"
              value="Agregar Tarea"
              className="button is-primary"
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddNewTask;
