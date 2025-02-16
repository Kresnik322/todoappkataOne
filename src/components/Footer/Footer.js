/* eslint-disable react/react-in-jsx-scope */
import { Component } from "react";
import PropTypes from "prop-types";

import TaskFilter from "../TaskFilter/TaskFilter";

import "./Footer.css";

class Footer extends Component {
  render() {
    const {countNotCompletedTasks, onChangeFilter, filter, onClearCompletedTasks} = this.props;
    return (
        <footer className="footer">
          <span className="todo-count">{countNotCompletedTasks} items left</span>
          <TaskFilter filter={filter} onChangeFilter={onChangeFilter} />
          <button className="clear-completed" onClick={() =>onClearCompletedTasks()}>
            Clear completed
          </button>
        </footer>
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
