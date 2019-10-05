import React from 'react'
import styled from 'styled-components'
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import HomePage from './home'
import ReportPage from './report'




const MainPage = () => {
  console.log('render')
  return (
    <Switch>
      <Route exact path="/report" component={ReportPage} />
      <Route exact path="/" component={HomePage} />


    </Switch>
  )
}


export default MainPage