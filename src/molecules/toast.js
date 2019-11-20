import React from 'react'
import styled from 'styled-components'
import { Wrapper } from 'atoms'
import { shadows, colors } from '@pomona/pomona3-ui/lib/constants'
import Font from '@pomona/pomona3-ui/lib/atoms/fonts'

const ToastWrapper = styled(Wrapper)`
  position: fixed;
  top: 0;
  margin: 0 auto;
  z-index: 100;
  transform: translateY(-150%);
  transition: transform .3s ease, opacity 0.3s ease;
  opacity: 0;
  &.visible {
    transform: translateY(150%);
    opacity: 1;
  }
`

const Toast = () => (
  <ToastWrapper id="toast" shadow={shadows.idle} padding="8px 16px" width="160px" background="rgba(106, 124, 149, 0.88)">
    <Font color={colors.white}>Copy Berhasil</Font>
  </ToastWrapper>
)

export default Toast