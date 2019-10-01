import React from 'react'
import styled from 'styled-components'
// import Icons from 'components/icons'

const Button = styled.button`
  width: ${props => (props.width ? props.width : '100%')};
  border-radius: 8px;
  border: transparent;
  display: flex;
  align-items: center;
  padding: 10px;
  margin: ${props => (props.margin ? props.margin : '0')};
  box-shadow: 0 2px 4px 0 rgba(68, 96, 160, 0.26), 0 1px 2px 0 #4460a0;
  cursor: pointer;
  ${(props) => {
    switch (props.name) {
      case 'facebook':
        return ' background-color: #4460a0;'
      default:
        return 'background-color:#fff;'
    }
  }};
`

const IconWrapper = styled.img`
  width: 32px;
  height: 32px;
  @media (max-width: 768px) {
    display: none;
  }
`
const Wrapper = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  color: white;
  justify-content: center;
  font-family: Linotte;
  text-transform: capitalize;
  font-size: 18px;
  line-height: normal;
  letter-spacing: normal;
  ${(props) => {
    switch (props.name) {
      case 'facebook':
        return 'color: #white;'
      default:
        return 'color:#4a4a4a;'
    }
  }};
`

const SocialButton = ({
  id, name = 'google', onClick, width, margin,
}) => (
  <Button id={id} onClick={onClick} width={width} name={name} margin={margin}>
    <IconWrapper name={name} id={`${id}-icon`} />
    <Wrapper id={`${id}-text`} name={name}>
      {name}
    </Wrapper>
  </Button>
)

export default SocialButton
