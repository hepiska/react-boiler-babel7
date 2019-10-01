import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const UnAuthRedirect = ({ AuthComponent, redirecTo, isAuth, ...props }) => {
  if (isAuth) {
    return (
      <AuthComponent {...props} />
    )
  }
  return <Redirect to={redirecTo} />

}





const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
})


export default connect(mapStateToProps, null)(UnAuthRedirect)
