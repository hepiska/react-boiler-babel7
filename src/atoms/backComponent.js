import React from 'react'
import styled from 'styled-components'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import SystemIcons from '@pomona/pomona3-ui/lib/atoms/systemIcons'

const LeftMenu = styled.div`
  :hover {
    cursor: pointer;
  }
`


const BackComponent = (props) => {
  const onClick = () => {
    if (props.actionBeforeBack && typeof (props.actionBeforeBack) === 'function') {
      props.actionBeforeBack()
    }
    if (props.history.length - props.initialHistory > 0) {
      props.history.goBack()
    } else {
      props.history.push('/')
    }
  }

  return (
    <LeftMenu onClick={onClick}>
      <SystemIcons size="24px" name="arrowBack" />
    </LeftMenu>
  )
}

const mapStateToProps = state => ({
  initialHistory: state.auth.initialHistoryStack,
})

export default compose(
  withRouter,
  connect(mapStateToProps, null)
)(BackComponent)