import { Component } from "react";
import { KeyboardKeysEnum } from "../../util/helper";

import "./NewTaskForm.css";



class NewTaskForm extends Component {
  state = {
    task: "",
  };

  onChangeTask = (e) => {
    this.setState({ task: e.target.value });
  };

  addTask = (e) => {
    if (e.key === KeyboardKeysEnum.Enter) {
      this.props.onAddTask(this.state.task);
      this.setState({
        task: ''
      })
    }
  };

  render() {
    const {task} = this.state;
    const {addTask, onChangeTask} = this;
    return (
      <>
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={onChangeTask}
            onKeyUp={addTask}
            autoFocus
            value = {task}
          />
        </header>
      </>
    );
  }
}

export default NewTaskForm;
