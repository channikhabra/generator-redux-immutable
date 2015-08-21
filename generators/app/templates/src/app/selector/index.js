import { createSelector } from 'reselect';

let titleSelector = state => state.get('title');

export default (state) => {
  return {
    title: titleSelector(state)
  }
}
