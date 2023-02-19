import React, { useState, useEffect, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IFilterStatus, IState, ITodo } from "../types/global";
import {
  getTodos,
  createTodo,
  markTodoCompleted,
  markTodoUncompleted,
  deleteTodo,
} from "../services/todo-service";

export const Todos = () => {
  const { user: currentUser } = useSelector((state: IState) => state.auth);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [filterStatus, setFilterStatus] = useState<IFilterStatus>("");
  const form = useRef();
  const addBtn = useRef();

  const fetchTodos = (status: IFilterStatus) => {
    getTodos(status).then(
      (response) => {
        setTodos(response.data);
      },
      (error) => {
        console.log("Error when retrieving todos", error);
      }
    );
  };
  useEffect(() => {
    fetchTodos("");
  }, []);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setTitle(title);
  };

  const handleChangeTodoStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const todoId = e.target.getAttribute("id");

    if (!todoId) return;

    if (checked) {
      markTodoCompleted(+todoId).finally(() => {
        fetchTodos(filterStatus);
      });
    } else {
      markTodoUncompleted(+todoId).finally(() => {
        fetchTodos(filterStatus);
      });
    }
  };

  const handleDeleteTodo = (e: any) => {
    const todoId = e.target.getAttribute("id");

    if (!todoId) return;

    deleteTodo(+todoId).finally(() => {
      fetchTodos(filterStatus);
    });
  };

  const handleAddTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setLoading(true);
    createTodo(title)
      .then(() => {
        setTitle("");
        fetchTodos(filterStatus);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleFilterStatusChange = (status: IFilterStatus) => {
    setFilterStatus(status);
    fetchTodos(status);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card card-container p-3">
          <div className="row">
            <div className="col-md-2">
              <img src="/logo-todo.png" alt="logo-todo" />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-12">
              <h4>Todo List</h4>
            </div>
            <div className="col-md-12 mt-2">
              <Form onSubmit={handleAddTodo} ref={form}>
                <div className="row">
                  <div className="form-group col-md-10">
                    <Input
                      type="text"
                      className="form-control"
                      name="title"
                      value={title}
                      onChange={handleChangeTitle}
                      placeholder="Add a new todo"
                    />
                  </div>

                  <div className="form-group col-md-2">
                    <button
                      className="btn btn-primary btn-block"
                      disabled={loading || title.length <= 0}
                    >
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <span>Add</span>
                    </button>
                  </div>
                </div>
                <CheckButton style={{ display: "none" }} ref={addBtn} />
              </Form>
            </div>

            <div className="row">
              <div className="col-md-12">
                Show:
                <Link
                  to="#"
                  onClick={() => handleFilterStatusChange("")}
                  className={filterStatus === "" ? "disabledLink" : ""}
                >
                  All
                </Link>{" "}
                |{" "}
                <Link
                  to="#"
                  onClick={() => handleFilterStatusChange("Completed")}
                  className={filterStatus === "Completed" ? "disabledLink" : ""}
                >
                  Completed
                </Link>{" "}
                |{" "}
                <Link
                  to="#"
                  onClick={() => handleFilterStatusChange("Uncompleted")}
                  className={
                    filterStatus === "Uncompleted" ? "disabledLink" : ""
                  }
                >
                  Uncompleted
                </Link>
              </div>
              <div className="col-md-12 mt-2">
                {todos.map((todo: ITodo) => {
                  return (
                    <div key={`container-${todo.id}`}>
                      <Form>
                        <div className="row">
                          <div className="col-md-1">
                            <Input
                              type="checkbox"
                              id={todo.id}
                              key={todo.id}
                              name="todoStatus"
                              value="Completed"
                              checked={todo.status === "Completed"}
                              onChange={handleChangeTodoStatus}
                            />
                          </div>
                          <div className="col-md-9">
                            <label htmlFor={todo.id.toString()}>
                              {" "}
                              &nbsp; {todo.title}
                            </label>
                          </div>

                          <div className="col-md-1">
                            <Link
                              to="#"
                              onClick={handleDeleteTodo}
                              id={todo.id.toString()}
                            >
                              x
                            </Link>
                          </div>
                        </div>
                      </Form>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
