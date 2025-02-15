import React from "react";

//Импорт компонентов
import NewTaskForm from "../newTaskForm/NewTaskForm";
import TaskList from "../tasksList/TaskList";
import Footer from "../footer/Footer";

import "./App.css";

class App extends React.Component {

  state = {
    tasks: [],
    filter: "All",
  };

  _currentId = this.state.tasks.length;

  // Метод, изменяющий задачу с активной и обратно
  onToogleCompleted = (id) => {
    this.setState(({ tasks }) => {
      return {
        tasks: tasks.map((item) => {
          if (item.id === id)
            return {
              ...item,
              completed: !item.completed,
            };
          return item;
        }),
      };
    });
  };

  // Метод, удаляющий задачу
  onDeleteTask = (id) => {
    this.setState(({ tasks }) => {
      return {
        tasks: tasks.filter((item) => item.id !== id),
      };
    });
  };

  // Метод, включащий инпут по изменению имени
  onFocusTask = (id) => {
    this.setState(({ tasks }) => {
      return {
        tasks: tasks.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              editing: true,
            };
          }
          return item;
        }),
      };
    });
  };

  // Метод, изменяет имя задачи после окончания ввода
  onChangeNameTask = (id, description) => {
    this.setState(({ tasks }) => {
      return {
        tasks: tasks.map((item) => {
          if (item.id === id)
            return {
              ...item,
              description: description,
              editing: false,
            };
          return item;
        }),
      };
    });
  };

  // Метод, добавляющий задачу
  onAddTask = (description) => {
    if (!description) return;
    const newId = this._currentId++;
    this.setState(({ tasks }) => {
      const newTask = { description: description, completed: false, editing: false, id: newId, dateCreate: Date.now() };
      return {
        tasks: [...tasks, newTask],
      };
    });
  };

  // Метод, меняющий тип фильтра
  onChangeFilter = (filter) => {
    this.setState({
      filter: filter,
    });
  };

  // Метод, фильтрующий массив
  filterTasks = (arr, filter) => {
    if (arr.length === 0) return arr;
    switch (filter) {
      case "Active":
        return arr.filter((item) => !item.completed);
      case "Completed":
        return arr.filter((item) => item.completed);
      default:
        return arr;
    }
  };

  // Метод возвращающий количество незавершенных задач
  getNumberNotCompletedTasks = () => {
    return this.state.tasks.reduce((acc, item) => (!item.completed ? acc + 1 : acc), 0);
  };

  // Метод, удаляющий все заверешнные задачи
  onClearCompletedTasks = () => {
    this.setState({
      tasks: this.state.tasks.filter((item) => !item.completed),
    });
  };

  render() {
    const { tasks, filter } = this.state;
    const filterTasks = this.filterTasks(tasks, filter);
    const { onToogleCompleted, onDeleteTask, onAddTask, onChangeFilter, onClearCompletedTasks } = this;
    const countNotCompletedTasks = this.getNumberNotCompletedTasks();
    return (
      <section className="todoapp">
        <NewTaskForm onAddTask={onAddTask} />
        <section className="main">
          <TaskList
            tasks={filterTasks}
            onToogleCompleted={onToogleCompleted}
            onDeleteTask={onDeleteTask}
            onFocusTask={this.onFocusTask}
            onChangeNameTask={this.onChangeNameTask}
          />
        </section>
        <Footer
          filter={filter}
          onChangeFilter={onChangeFilter}
          countNotCompletedTasks={countNotCompletedTasks}
          onClearCompletedTasks={onClearCompletedTasks}
        />
      </section>
    );
  }
}

export default App;
