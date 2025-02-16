import { Component } from "react";
import { formatDistanceToNow } from "date-fns";
import { getClazz, KeyboardKeysEnum } from "../../util/helper";
import "./Task.css";



class Task extends Component {
  state = {
    value: this.props.description,
  };

  onChangeValue = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  onChangeNameTask = (e) => {
    if (!this.state.value.trim().length) return;
    if (e.key === KeyboardKeysEnum.Enter) this.props.onChangeNameTask(this.props.id, this.state.value);
  };

  render() {
    const { description, id, onToogleCompleted, onDeleteTask, onFocusTask, completed, dateCreate } = this.props;
    const { onChangeValue, onChangeNameTask } = this;
    const { value } = this.state;
    const typeTask = getClazz(this.props);

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
          {typeTask === "editing" ? (
            <input type="text" className="edit" value={value} onChange={onChangeValue} onKeyUp={onChangeNameTask} />
          ) : null}
        </li>
      </>
    );
  }
}

export default Task;
