import React from "react";

//Импорт компонентов
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TaskList from "../TasksList/TaskList";
import Footer from "../Footer/Footer";

import { getNumberNotCompletedTasks, Filters } from "../../util/helper";

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
      const newTask = tasks.map((item) => {
        if (item.id === id)
          return {
            ...item,
            completed: !item.completed,
          };
        return item;
      });
      return {
        tasks: newTask,
      };
    });
  };

  // Метод, удаляющий задачу
  onDeleteTask = (id) => {
    this.setState(({ tasks }) => {
      const newTasks = tasks.filter((item) => item.id !== id);
      return {
        tasks: newTasks,
      };
    });
  };

  // Метод, включащий инпут по изменению имени
  onFocusTask = (id) => {
    this.setState(({ tasks }) => {
      const newTasks = tasks.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            editing: true,
          };
        }
        return item;
      });
      return {
        tasks: newTasks,
      };
    });
  };

  // Метод, изменяет имя задачи после окончания ввода
  onChangeNameTask = (id, description) => {
    this.setState(({ tasks }) => {
      const newTask = tasks.map((item) => {
        if (item.id === id)
          return {
            ...item,
            description: description,
            editing: false,
          };
        return item;
      });
      return {
        tasks: newTask,
      };
    });
  };

  // Метод, добавляющий задачу
  onAddTask = (description) => {
    if (!description.trim().length) return;
    const newId = this._currentId++;
    this.setState(({ tasks }) => {
      const newTask = { description, completed: false, editing: false, id: newId, dateCreate: Date.now() };
      return {
        tasks: [...tasks, newTask],
      };
    });
  };

  // Метод, меняющий тип фильтра
  onChangeFilter = (filter) => {
    this.setState({
      filter,
    });
  };

  // Метод, фильтрующий массив
  filterTasks = (arr, filter) => {
    if (arr.length === 0) return arr;
    switch (filter) {
      case Filters.Active:
        return arr.filter((item) => !item.completed);
      case Filters.Completed:
        return arr.filter((item) => item.completed);
      default:
        return arr;
    }
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
    const {
      onToogleCompleted,
      onDeleteTask,
      onAddTask,
      onChangeFilter,
      onClearCompletedTasks,
      onFocusTask,
      onChangeNameTask,
    } = this;
    const countNotCompletedTasks = getNumberNotCompletedTasks(tasks);
    return (
      <section className="todoapp">
        <NewTaskForm onAddTask={onAddTask} />
        <section className="main">
          <TaskList
            tasks={filterTasks}
            onToogleCompleted={onToogleCompleted}
            onDeleteTask={onDeleteTask}
            onFocusTask={onFocusTask}
            onChangeNameTask={onChangeNameTask}
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
