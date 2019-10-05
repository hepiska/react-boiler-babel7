const type = {
  LOGIN: 'auth/LOGIN_REQUEST',
  LOGOUT: 'auth/Logut',
}


const initialState = {
  token: localStorage.getItem('token'),
  _id: localStorage.getItem('_id'),
  email: localStorage.getItem('email'),
  isAuth: localStorage.getItem('token') !== null,
}


export default (state = initialState, action) => {
  let newState = { ...state }
  switch (action.type) {
    case type.LOGIN:
      if (action.payload === null) {
        return initialState
      }
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('_id', action.payload._id)
      localStorage.setItem('email', action.payload.email)
      localStorage.setItem('name', action.payload.profile.first_name)
      newState = action.payload
      return newState
    case type.LOGOUT:

      localStorage.removeItem('token')
      localStorage.removeItem('_id')
      localStorage.removeItem('email')
      localStorage.removeItem('name')
      return {
        isAuth: false,
      }
    default:
      return {
        ...state
      }

  }
}


export const LOGIN = authData => ({ type: type.LOGIN, payload: authData })
export const LOGOUT = () => ({ type: type.LOGOUT, payload: '' })
