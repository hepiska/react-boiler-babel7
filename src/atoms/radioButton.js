import React from 'react'
import { Wrapper } from '@pomona/pomona3-ui/lib/atoms/basic'
import Font from '@pomona/pomona3-ui/lib/atoms/fonts'
import { colors } from '@pomona/pomona3-ui/lib/constants'


const Radio = ({ value, text, name, onClick, fontStyles, wrapperStyles }) => {
  const _onClick = () => {
    onClick(name, {
      value: !value,
      label: text,

    })
  }

  return (
    <Wrapper direction='row' {...wrapperStyles}>
      <Wrapper width='16px' height='16px' background='white' cursor='pointer' onClick={_onClick} border='solid 1px #37a0f4' radius='8px' margin='0px 8px 0px 0px '>
        {value && <Wrapper width='8px' height='8px' zIndex='2' background={colors.pomonaBlue} radius='4px' />}
      </Wrapper>
      <Font {...fontStyles}>{text}</Font>
    </Wrapper>
  )
}

export default Radio