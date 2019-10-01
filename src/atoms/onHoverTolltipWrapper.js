import React from 'react'
import styled from 'styled-components'
import { Wrapper } from './index'


const ToolTipWrapper = styled(Wrapper)`
 position: relative;
   & > .tolltipchild{
  visibility: hidden;
   border-radius: 6px;
   ::after{
     ${({ arrow, arrowColor }) => {
    switch (arrow) {
      case 'top':
        return `
      content: " ";
      position: absolute;
      bottom: 100%;  /* At the top of the tooltip */
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent ${arrowColor || 'transparent'} transparent;
      `
      case 'left':
        return `
      content: " ";
      position: absolute;
      top: 50%;
      right: 100%; /* To the left of the tooltip */
      margin-top: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent  ${ arrowColor || 'transparent'} transparent transparent;
      `
      case 'right':
        return `
        content: " ";
        position: absolute;
        top: 50%;
        left: 100%; /* To the right of the tooltip */
        margin-top: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent transparent  ${arrowColor || 'transparent'};
      `
      case 'none':
        return ''
      default:
        return `
        content: " ";
        position: absolute;
        top: 100%; /* At the bottom of the tooltip */
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: ${arrowColor || 'transparent'} transparent transparent transparent;
                `
    }
  }}
   
   }
  /* Position the tooltip */
   position: absolute;
   ${({ poss }) => poss || `
      bottom: 100%;
      left:0%;
   `}
   z-index: 1;
   }
:hover{
  & > .tolltipchild{
    visibility: visible;
   }
}
`

const OnHoveTolltip = ({ children, tooltip, poss }) => {
  const getChildern = React.Children.only(tooltip)
  return (
    <ToolTipWrapper poss={poss} arrowColor={getChildern.props.background}>
      {children}
      <Wrapper className='tolltipchild'>
        {tooltip}
      </Wrapper>
    </ToolTipWrapper>
  )
}

export default OnHoveTolltip