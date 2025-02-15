import { Component } from "react";

import Task from "../task/Task";

import "./TaskList.css";

class TaskList extends Component {
  // Метол, создающий список задач
  createListItems = (data) => {
    return data.tasks.map(({ id, ...itemProps }) => {
      return (
        <Task
          {...itemProps}
          id={id}
          onToogleCompleted={data.onToogleCompleted}
          onDeleteTask={data.onDeleteTask}
          onFocusTask={data.onFocusTask}
          onChangeNameTask={data.onChangeNameTask}
          key={id}
        />
      );
    });
  };

  render() {
    return (
      <>
        <ul className="todo-list">{this.createListItems(this.props)}</ul>
      </>
    );
  }
}

export default TaskList;
