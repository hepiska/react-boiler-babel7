import React from 'react'
import styled from 'styled-components'
import { Wrapper } from 'atoms'
import { colors } from '@pomona/pomona3-ui/lib/constants'

const Input = styled.input`
  width: 32px;
  height: 32px;
  border: ${({ border }) => border || null};
  font-family: Linotte;
  font-size: 16px;
  border-radius: 8px;
  text-align: center;
  margin: 0px 6px;
`

class OtpField extends React.Component {
  state = {
    inputs: Array.from({ length: this.props.inputLength }, x => ''),
    reset: false,
  }


  static getDerivedStateFromProps(props, state) {
    if (props.reset !== state.reset) {
      const inputs = Array.from({ length: props.inputLength }, x => '')
      return {
        reset: props.reset,
        inputs,
      }
    }
    return null
  }

  onChange = (e) => {
    const { target } = e
    if (Number(e.key) || Number(e.key) === 0) {
      const value = e.key
      this.setState(
        (state) => {
          state.inputs[target.name] = value
          return state
        },
        () => {
          this.props.onChange(this.state.inputs.join(''))
        },
      )
      target.nextSibling.focus()
    } else if (e.key === 'Backspace') {
      const newInput = this.state.inputs
      newInput[target.name] = ''
      this.props.onChange(this.state.inputs.join(''))
      e.target.blur()
      e.target.previousSibling.focus()
    } else if (e.key === 'ArrowLeft') {
      e.target.previousSibling.focus()
    } else if (e.key === 'ArrowRight') {
      e.target.nextSibling.focus()
    }
  }


  render() {
    return (
      <Wrapper width="100%" background={colors.white} direction="row">
        {this.state.inputs.map((input, i) => <Input name={i} key={i} type='number' border={`1px solid ${colors.pbShade1}`} onKeyDown={this.onChange} maxLength={1} value={input} />)}
      </Wrapper>
    )
  }
}

export default OtpField
