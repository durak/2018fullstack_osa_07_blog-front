const initialState = {
  visible: false
}

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SIDEBAR_VISIBILITY_TOGGLE':
    return { ...state, visible: !state.visible }

  default:
    return state
  }
}


//------------ACTION CREATORS------------

export const toggleSidebar = () => {
  return (dispatch) => {
    dispatch({ type: 'SIDEBAR_VISIBILITY_TOGGLE' })
  }
}

export default sidebarReducer