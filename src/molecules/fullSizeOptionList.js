import React from 'react'
import { Wrapper } from 'atoms'
import styled from 'styled-components'
import { colors } from '@pomona/pomona3-ui/lib/constants'
import SystemIcons from '@pomona/pomona3-ui/lib/atoms/systemIcons'
import Font from '@pomona/pomona3-ui/lib/atoms/fonts'

const SelectionWrapper = styled(Wrapper)`
  top:${({ top }) => top || '0px'};
  right:${({ right }) => right || '0px'};
  :hover{
      background: ${colors.pbShade1};
      cursor: pointer;
  }
`

const FullOptionsList = ({ options, onOptionClick, name, onClose }) =>
  (
    <Wrapper overflow='scroll' width='100%' height='calc(100vh - (57px + 98px))' direction='column' justify='start' padding='0px 0px 100px'>
      {
        options && options.map((option, index) => (
          <SelectionWrapper
            background={index % 2 === 0 ? colors.pbShade2 : colors.white}
            key={option.value}
            display='static'
            radius='0px'
            padding='13px 16px'
            width='100%'
            align='flex-start'
            justify=''
            onClick={() => {
              onOptionClick(name, option)
              onClose()
            }}
          >
            <Wrapper width='100%' direction='row' justify='space-between'>
              <Font>
                {option.name}
              </Font>
              <SystemIcons name='chevron' />
            </Wrapper>
          </SelectionWrapper>
        ))
      }

    </Wrapper>
  )

export default FullOptionsList