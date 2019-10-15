import React, { useState } from 'react'
import styled from 'styled-components'
import { shadows } from '@pomona/pomona3-ui/lib/constants'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { LOGOUT } from 'modules/auth'
import { withRouter } from "react-router-dom"
import { ImageWrapper, Wrapper } from '@pomona/pomona3-ui/lib/atoms/basic'
import SystemIcons from '@pomona/pomona3-ui/lib/atoms/systemIcons'
import FullSizeOptionList from 'molecules/fullSizeOptionList'
import Button from '@pomona/pomona3-ui/lib/atoms/buttons'


import SidebarMenu from 'molecules/sidebarMenu'

const HeaderWrapper = styled.header`
  @media (max-width:721px) {
    padding:16px 24px;
  }
  width:100%;
  padding: 16px 15%;
  position:fixed;
  top:0;
  left:0;
  z-index:1000;
  background:white;
  box-shadow: ${shadows.idle};
`


const useModal = (init) => {
  const [isOpen, setIsOpen] = useState(init)
  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }
  return [{ isOpen }, { openModal, closeModal }]
}



const Header = ({ isAuth, LOGOUT: logout, ...props }) => {
  const [modalState, modalAction] = useModal(false)
  return (
    <HeaderWrapper>
      <Wrapper width='100%' direction='row' justify='space-between'>
        <ImageWrapper width='120px' src={require('img/svg/pomona-icon.svg')} />
        {
          isAuth && (
            <Wrapper cursor='pointer' onClick={modalAction.openModal}>
              <SystemIcons name='category' margin="0 0 0 8px" />
            </Wrapper>
          )
        }

      </Wrapper>

      <SidebarMenu
        title='Menu'
        isOpen={modalState.isOpen}
        onClose={modalAction.closeModal}
        position='right'
      >
        <FullSizeOptionList
          onOptionClick={(_, option) => props.history.push(option.value)}
          options={[{ name: 'Create Alias', value: '/' }, { name: 'Report', value: '/report' }]}
        />
        <Button size='full' radius='0px' margin='32px 0px 0px' onClick={logout}>logout</Button>

      </SidebarMenu>
    </HeaderWrapper>
  )
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      LOGOUT,
    },
    dispatch,
  )
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))