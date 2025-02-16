import React from "react";
import PropTypes from "prop-types";

import "./TaskFilter.css";


const FILTER_OPTION = [{ name: "All" }, { name: "Active" }, { name: "Completed" }];

class TaskFilter extends React.Component {

  render() {
    const {filter, onChangeFilter} = this.props
    const arrayFilters = FILTER_OPTION.map((item, i) => {
      const clazz = item.name === filter ? "selected" : null;
      return (
        <li key={i}>
          <button key={i} name={item.name} className={clazz} onClick={(e) => onChangeFilter(e.target.name)}>
            {item.name}
          </button>
        </li>
      );
    })
    return (
      <>
        <ul className="filters">{arrayFilters}</ul>
      </>
    );
  }
}

TaskFilter.propTypes = {
  filter: PropTypes.string,
  onChangeFilter: PropTypes.func.isRequired,
};

TaskFilter.defaultProps = {
  filter: "All",
};

export default TaskFilter;
