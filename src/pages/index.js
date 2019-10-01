import React from 'react'
import styled from 'styled-components'
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { colors } from '@pomona/pomona3-ui/lib/constants'
import LoginPage from 'pages/login'
import MainPage from 'pages/main'
import UnAuthRedirect from 'hoc/unAuthRedirect'
import Header from 'molecules/header'


const Container = styled.div`
  width: 100%;
  z-index: 10;
  margin: 68px auto;
  background-color:${colors.background};
  /* overflow: hidden; */
  @media (max-width:721px) {
    padding:24px 24px;
  }
  padding: 24px 20%;
`

const RenderAuthComponent = () => (
  <Route
    render={(matchProps) => (
      <MainPage {...matchProps} />
    )}
  />
)

const Pages = () => (
  <Container id="indexPage">
    <Header />
    <Switch>
      <Route path="/login" component={LoginPage} />
      {/* this have to be last */}
      <UnAuthRedirect
        path="/"
        AuthComponent={RenderAuthComponent}
        redirecTo='/login'
      />
    </Switch>
  </Container>
)

export default Pages
