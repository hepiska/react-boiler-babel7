import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { ImageWrapper, Wrapper } from '@pomona/pomona3-ui/lib/atoms/basic'
import Font from '@pomona/pomona3-ui/lib/atoms/fonts'
import ImageColective from 'organisms/imageColective'
import { GetUnAliasedReceipt } from 'graphqlQuery/receipt.gql'
import { dateConstant } from 'utils/constants'
import CircleLoader from "molecules/loaders/circle"
import SelectProductCard from 'molecules/selectProductCard'



const HomePage = () => {
  const { loading, error, data } = useQuery(GetUnAliasedReceipt, { variables: { input: dateConstant } })
  if (loading) {
    return (
      <Wrapper>
        <CircleLoader />
      </Wrapper>
    )
  }
  const receipt = data.GetUnAliasedReceipt
  return (
    <Wrapper>
      <Wrapper dDirection='row' width='100%' align='flex-start'>
        <Wrapper flex='2'>
          <ImageColective images={receipt.images.map(img => (img.uri))} />
        </Wrapper>
        <Wrapper flex='3' dPadding='0px 32px' maxHeight='760px' justify='flex-start' align='flex-start'>
          <Font size='22px'>
            {`Retailer : ${receipt.retailer.name}`}
          </Font>
          <Wrapper width='100%' margin='12px 0px'>
            {
              receipt.prediction.products.map(product => (
                <SelectProductCard product={product} />
              ))
            }
          </Wrapper>
        </Wrapper>
      </Wrapper>

    </Wrapper>
  )
}


export default HomePage