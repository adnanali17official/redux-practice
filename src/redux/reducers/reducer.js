const initialState = {
  rows: [],
};

export function reducer(state = initialState, action) {
  // Check to see if the reducer cares about this action
  if (action.type === "push") {
    // If so, make a copy of `state`
    return {
      ...state,
      // and update the copy with the new value
      rows: [...state.rows, action.payload],
    };
  }

  if (action.type === "edit") {
    // If so, make a copy of `state`
    let newState = [];
    state.rows.forEach((row, index) => {
      if (index === action.payload.index)
        newState[index] = action.payload.value;
      else newState.push(row);
    });

    return {
      ...state,
      // and update the copy with the new value
      rows: newState,
    };
  }
  // otherwise return the existing state unchanged
  return state;
}
