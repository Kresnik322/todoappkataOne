import { Component } from "react";

import Task from "../Task/Task";

import "./TaskList.css";

class TaskList extends Component {
  render() {
    const { tasks, onToogleCompleted, onDeleteTask, onFocusTask, onChangeNameTask } = this.props;
    const listTasks = tasks.map(({ id, ...itemProps }) => {
      return (
        <Task
          {...itemProps}
          id={id}
          onToogleCompleted={onToogleCompleted}
          onDeleteTask={onDeleteTask}
          onFocusTask={onFocusTask}
          onChangeNameTask={onChangeNameTask}
          key={id}
        />
      );
    });
    return <ul className="todo-list">{listTasks}</ul>;
  }
}

export default TaskList;
