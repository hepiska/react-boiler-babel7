import React from 'react'
import ReactDOM from 'react-dom'
import { colors, shadows } from '@pomona/pomona3-ui/lib/constants'
import SideMenu from '@pomona/pomona3-ui/lib/molecules/menu/sideMenu'
import styled from 'styled-components'



const Modal = styled.div`
    display: ${props => (props.isOpen ? 'block' : 'none')}; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 10001; /* Sit on top */
    left: 0;
    top: 0;
    width: 100vw; /* Full width */
    height: 100vh; /* Full height */
    overflow: hidden; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: ${colors.disableText}; /* Black w/ opacity */
`

const element = document.getElementById('modal')

const SideBarMenu = ({
  isOpen = false, title, children, onClose, position
}) => (
    ReactDOM.createPortal(
      <Modal isOpen={isOpen} onClick={onClose}>
        <SideMenu title={title} onClose={onClose} position={position}>
          {children}
        </SideMenu>
      </Modal>
      , element,
    )

  )

export default SideBarMenu
