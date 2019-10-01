import React from 'react'
import { Wrapper, ImageWrapper } from 'atoms'


const SmallLoader = () => (
  <Wrapper width='100%' height='116px'>
    <ImageWrapper src={require('img/svg/loader.svg')} />
  </Wrapper>
)


export default SmallLoader