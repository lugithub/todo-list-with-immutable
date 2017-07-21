import { Record, List, fromJS } from 'immutable'
import { combineReducers } from 'redux-immutable'
import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions'
const { SHOW_ALL } = VisibilityFilters

let count = 0;
function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

const TodoRecord = Record({
  text: void 0,
  completed: void 0,
  id: void 0,
});

function todos(state = List(), action) {
  switch (action.type) {
    case ADD_TODO:
      return state.push(new TodoRecord({
                text: action.text,
                completed: false,
                id: count++
              }));
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return new TodoRecord({
            text: todo.text,
            completed: !todo.completed,
            id: todo.id
          });
        }
        return todo
      })
    default:
      return state
  }
}

const StateRecord = Record({
  visibilityFilter: void 0,
   todos: void 0
});

const todoApp = combineReducers({
  visibilityFilter,
  todos
}, StateRecord);

export default todoApp;
