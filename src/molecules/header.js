import React from 'react'
import styled from 'styled-components'
import { shadows } from '@pomona/pomona3-ui/lib/constants'
import { ImageWrapper } from '@pomona/pomona3-ui/lib/atoms/basic'




const HeaderWrapper = styled.header`
  @media (max-width:721px) {
    padding:16px 24px;
  }
  width:100%;
  padding: 16px 20%;
  position:fixed;
  top:0;
  left:0;
  direction:row;
  box-shadow: ${shadows.idle};
`


const Header = () => {
  return (
    <HeaderWrapper>
      <ImageWrapper width='120px' src={require('img/svg/pomona-icon.svg')} />
    </HeaderWrapper>
  )
}


export default Header