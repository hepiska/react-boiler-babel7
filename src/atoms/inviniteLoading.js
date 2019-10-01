import React from 'react'
import styled from 'styled-components'
import { ImageWrapper } from 'atoms'
import { colors } from '@pomona/pomona3-ui/lib/constants'

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: ${props => (props.direction ? props.direction : 'column')};
  padding: ${props => (props.padding ? props.padding : '0px 0px 56px')};
  align-items: center;
  background-color: ${colors.line};
  position: absolute;
  height: 56px;
  width: 100%;
  left: 0;
  bottom: 56px;
  overflow: hidden;
  z-index: 10;
`

const InviteLoading = () => (
  <LoaderWrapper >
    <ImageWrapper width="100px" height="50px" src={require('img/svg/loader.svg')} />
  </LoaderWrapper>
)

export default InviteLoading
