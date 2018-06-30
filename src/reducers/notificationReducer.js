
const notificationReducer = (state = null, action) => {

  switch (action.type) {
  case 'NOTIFY':
    return {
      message: action.message,
      notificationType: action.notificationType,
      id: action.id
    }
  case 'CLEAR': {
    if(state.id===action.id) {
      return null // nullia vai tyhjää vai tyhjää objektia vai mitä?
    } else {
      return state
    }
  }

  default:
    return state
  }
}

//------------ACTION CREATORS------------

const idCounter = (
  () => {
    var counter = 0
    return () => counter++
  })()

export const notify = (message, notificationType, seconds) => {

  return (dispatch) => {
    const id = idCounter()
    let ms = seconds ? seconds * 1000 : 5000

    dispatch({ type: 'NOTIFY', message, notificationType, id })

    setTimeout(() => {
      dispatch({ type:'CLEAR', id })
    },ms)
  }
}


export default notificationReducer