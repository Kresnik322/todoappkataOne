const getClazz = (props) => {
  const { completed, editing } = props;
  if (completed) return "completed";
  if (editing) return "editing";
  return "";
};


const getNumberNotCompletedTasks = (arr) => {
  return arr.reduce((acc, item) => (!item.completed ? acc + 1 : acc), 0);
};

const KeyboardKeysEnum = {
  Enter : 'Enter',
}

const Filters = {Active: 'Active', Completed: 'Completed'}


export { getClazz, getNumberNotCompletedTasks, KeyboardKeysEnum, Filters };
