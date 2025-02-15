import { Component } from "react";
import PropTypes from "prop-types";

import TaskFilter from "../taskFilter/TaskFilter";

import "./Footer.css";

class Footer extends Component {
  onClearCompletedTasks = () => {
    this.props.onClearCompletedTasks();
  };



  render() {
    return (
      <>
        <footer className="footer">
          <span className="todo-count">{this.props.countNotCompletedTasks} items left</span>
          <TaskFilter filter={this.props.filter} onChangeFilter={this.props.onChangeFilter} />
          <button className="clear-completed" onClick={this.onClearCompletedTasks}>
            Clear completed
          </button>
        </footer>
      </>
    );
  }
}

Footer.propTypes = {
  filter: PropTypes.string,
  onChangeFilter: PropTypes.func.isRequired,
  countNotCompletedTasks: PropTypes.func.isRequired,
  onClearCompletedTasks: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  filter: 'All',
}

export default Footer;
