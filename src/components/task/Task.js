import { Component } from "react";
import { formatDistanceToNow } from "date-fns";

import "./Task.css";

class Task extends Component {
  state = {
    value: this.props.description,
  };

  getClazz = (props) => {
    const { completed, editing } = props;
    if (completed) return "completed";
    if (editing) return "editing";
    return "";
  };

  onChangeValue = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  onChangeNameTask = (e) => {
    if (!this.state.value) return;
    if (e.key === "Enter") this.props.onChangeNameTask(this.props.id, this.state.value);
  };

  render() {
    const { description, id, onToogleCompleted, onDeleteTask, onFocusTask, completed, dateCreate } = this.props;
    const { onChangeValue, onChangeNameTask } = this;
    const { value } = this.state;
    const typeTask = this.getClazz(this.props);

    const addInput =
      typeTask === "editing" ? (
        <input type="text" className="edit" value={value} onChange={onChangeValue} onKeyUp={onChangeNameTask} />
      ) : null;

    return (
      <>
        <li className={typeTask}>
          <div className="view">
            <input className="toggle" type="checkbox" checked={completed} onChange={() => onToogleCompleted(id)} />
            <label>
              <span className="description">{description}</span>
              <span className="created">created {formatDistanceToNow(dateCreate, { includeSeconds: true })}</span>
            </label>
            <button className="icon icon-edit" onClick={() => onFocusTask(id)}></button>
            <button className="icon icon-destroy" onClick={() => onDeleteTask(id)}></button>
          </div>
          {addInput}
        </li>
      </>
    );
  }
}

export default Task;
