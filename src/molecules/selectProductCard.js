import React, { UseState, useState } from 'react'
import { shadows } from '@pomona/pomona3-ui/lib/constants'
import { SystemIcons } from '@pomona/pomona3-ui/lib/atoms'
import { ImageWrapper, Wrapper } from '@pomona/pomona3-ui/lib/atoms/basic'
import { AsyncDropdown } from '@pomona/pomona3-ui/lib/atoms/dropdowns'
import Button from '@pomona/pomona3-ui/lib/atoms/buttons'
import Field from '@pomona/pomona3-ui/lib/atoms/fields'
import stringSimilarity from 'string-similarity'


const useStringInputAlias = (predictedAlias) => {
  const [corectedAlias, setCoredtedAlias] = useState('')

  const chackIsSimilar = () => {
    const simDegree = stringSimilarity.compareTwoStrings(corectedAlias, predictedAlias)
    return simDegree > 0.6
  }
  const changeCorectedAlias = ({ target }) => {
    setCoredtedAlias(target.value)
  }

  return [{ corectedAlias, }, { chackIsSimilar, changeCorectedAlias }]

}


const SelectProductCard = ({ product }) => {
  const [{ corectedAlias }, { changeCorectedAlias, chackIsSimilar }] = useStringInputAlias(product.name)
  const onCheck = () => {
    const isSimilar = chackIsSimilar()
  }
  return (
    <Wrapper width='100%' padding='12px 0px' direction='row' justify='space-between' margin='12px 0px' shadow={shadows.idle}>
      <Wrapper flex='1' padding='8px 16px'>
        <Wrapper width='100%' padding='0px 8px'>
          <AsyncDropdown />
        </Wrapper>
        <Wrapper dDirection='row' width='100%' margin='8px'>
          <Wrapper flex='1' margin='0px 8px'>
            <Field label='Predicted Alias' disabled value={product.name} />
          </Wrapper>
          <Wrapper flex='1' margin='0px 8px'>
            <Field label='Corected Alias' onChange={changeCorectedAlias} value={corectedAlias} />
          </Wrapper>
        </Wrapper>
      </Wrapper>
      <Wrapper padding='0px 16px' cursor='pointer'>
        <SystemIcons name='close' margin='8px 0px' />
        <Button size='content' padding='8px' margin='8px 0px' onClick={onCheck}>Check</Button>
      </Wrapper>
    </Wrapper>
  )
}


export default SelectProductCard