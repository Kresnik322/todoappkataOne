import React from "react";
import PropTypes from "prop-types";

import "./TaskFilter.css";

class TaskFilter extends React.Component {
  onChangeFilter = (e) => {
    this.props.onChangeFilter(e.target.name);
  };

  filterData = [{ name: "All" }, { name: "Active" }, { name: "Completed" }];

  createFilters = (filterData) => {
    return filterData.map((item, i) => {
      const clazz = item.name === this.props.filter ? "selected" : null;
      return (
        <li key={i}>
          <button key={i} name={item.name} className={clazz} onClick={this.onChangeFilter}>
            {item.name}
          </button>
        </li>
      );
    });
  };

  render() {
    return (
      <>
        <ul className="filters">{this.createFilters(this.filterData)}</ul>
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
