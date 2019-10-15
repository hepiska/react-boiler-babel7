import React from 'react'
import ReactDOM from 'react-dom'
import { colors, shadows } from '@pomona/pomona3-ui/lib/constants'
import { Font, PlainButton } from '@pomona/pomona3-ui/lib/atoms'
import styled from 'styled-components'



const Modal = styled.div`
    display: ${props => (props.isOpen ? 'flex' : 'none')}; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 10001; /* Sit on top */
    left: 0;
    top: 0;
    justify-content:center;
    align-items: center;
    width: 100vw; /* Full width */
    height: 100vh; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: ${colors.disableText}; /* Black w/ opacity */
`

const Headers = styled.div`
    display:flex;
    /* width:500px; */
    flex-direction:row;
    justify-content: flex-start;
    align-items:start;
    padding:0px 0px 12px 0px;
    border-bottom: solid 1px #e1e8ed;
`

const ModalContent = styled.div`
    background-color: #fefefe;
    display:${({ active }) => (active ? 'flex' : 'none')};
    flex-direction:column;
    padding: 12px 24px;
    box-shadow:${shadows.idle};
    border-radius:6px;
    max-height: 70vh;
    width: 500px;
    /* height: 10%; Could be more or less, depending on screen size */
    @media(max-width:768px){
        padding: 12px 24px;
        width: 90%;
    }
`

const Wrapper = styled.div`
    display:flex;
    flex:${({ flex }) => flex || '1'};
    padding:${({ padding }) => padding || '0px'};
    justify-content:${({ justify }) => justify || 'center'};
    align-items:${({ align }) => align || 'center'};
    flex-direction:${({ direction }) => direction || 'column'};
`

const Line = styled.div`
      width:100%;
      border-bottom: solid 1px #e1e8ed;
`

const element = document.getElementById('modal')

const BasicModal = ({
  isOpen = false, title, children, actions,
}) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
  } else {
    document.body.style.overflow = 'auto'
    document.body.style.position = 'static'
  }

  return (
    ReactDOM.createPortal(
      <Modal isOpen={isOpen}>
        <ModalContent name="modalContent" active>
          <Headers>
            <Wrapper justify="start" align="start">
              {typeof title === 'string' ?
                <Font sizeType="title" weightType="semibold">{title}</Font> :
                title
              }
            </Wrapper>
          </Headers>
          <Line />
          <Wrapper margin="0px" padding="24px 0px" align="start">
            {children}
          </Wrapper>
          {actions && (
            <Wrapper direction="row" padding="0px">
              {
                typeof actions === 'object'
                && actions.map((action, idx) =>
                  (
                    <Wrapper flex="1" key={idx}>
                      <PlainButton size="full" key={idx} onClick={action.onClick} color={action.color || null}>{action.text}</PlainButton>
                    </Wrapper>
                  ))
              }
            </Wrapper>
          )}

        </ModalContent>
      </Modal>
      , element,
    )

  )
}

export default BasicModal
