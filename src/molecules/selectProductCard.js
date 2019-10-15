import React, { UseState, useState } from 'react'
import { shadows } from '@pomona/pomona3-ui/lib/constants'
import { withApollo } from 'react-apollo'
import styled from 'styled-components'
import { SystemIcons } from '@pomona/pomona3-ui/lib/atoms'
import { Wrapper, ImageWrapper } from '@pomona/pomona3-ui/lib/atoms/basic'
import { GetAllProduct, GetMappingAlias } from 'graphqlQuery/product.gql'
import { AsyncDropdown } from '@pomona/pomona3-ui/lib/atoms/dropdowns'
import Button from '@pomona/pomona3-ui/lib/atoms/buttons'
import Field from '@pomona/pomona3-ui/lib/atoms/fields'
import stringSimilarity from 'string-similarity'

const AbsWrapper = styled(Wrapper)`
    right: 2px;
    top: 2px;
`

const useStringInputAlias = (predictedAlias) => {
  const [corectedAlias, setCoredtedAlias] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loading, setLoading] = useState(false)

  const chackIsSimilar = () => {
    const simDegree = stringSimilarity.compareTwoStrings(corectedAlias, predictedAlias)
    return simDegree > 0.6
  }
  const changeCorectedAlias = ({ target }) => {
    setCoredtedAlias(target.value)
  }

  const getSelectedData = (name, data) => {
    setSelectedProduct(data)
  }

  return [{ corectedAlias, selectedProduct, loading }, { chackIsSimilar, changeCorectedAlias, getSelectedData, setLoading }]

}


const SelectProductCard = ({ product, retailer, getData, onError, checked, ...props }) => {
  const [{ corectedAlias, selectedProduct, loading },
    { changeCorectedAlias, chackIsSimilar, getSelectedData, setLoading
    }] = useStringInputAlias(product.name)

  const checkProductInRetailer = () => props.client.query({
    query: GetMappingAlias,
    variables: {
      product: selectedProduct.value,
      retailer: retailer._id
    }
  }).then(res => res.data.GetMappingAlias.total)

  const onCheck = async () => {
    try {
      setLoading(true)
      const isSimilar = chackIsSimilar()
      if (!isSimilar) {
        throw new Error('Predicted dan Corected Alias terlalu berbeda')
      }

      if (!selectedProduct) {
        throw new Error('Pilih produk terlebih dahulu')
      }
      const productInretailer = await checkProductInRetailer()
      if (productInretailer) {
        throw new Error(`alias untuk product ${selectedProduct.name} di retailer ${retailer.name} telah ada`)
      }
      getData({
        product: { _id: selectedProduct.value, name: selectedProduct.name },
        alias: {
          predicted: product.name,
          corected: corectedAlias
        }
      })
      setLoading(false)


    } catch (error) {
      onError(error)
      setLoading(false)

    }
  }


  const fetchProduct = (limit, skip, searchkey) => {
    return props.client.query({
      query: GetAllProduct,
      variables: {
        input: {
          skip,
          limit,
          q: searchkey
        }
      }
    }).then(res => {
      return res.data.GetAllProduct.products.map(prod => ({ value: prod._id, name: prod.name }))
    })
  }



  return (
    <Wrapper width='100%' position='relative' padding='12px 0px' direction='row' justify='space-between' margin='12px 0px' shadow={shadows.idle}>
      {
        checked && (
          <AbsWrapper position='absolute'>
            <SystemIcons name='approved' fill='green' />
          </AbsWrapper>
        )
      }
      <Wrapper flex='1' padding='8px 8px'>
        <Wrapper width='100%' padding='0px 8px'>
          <AsyncDropdown fetchData={fetchProduct} getSelectedData={getSelectedData} value={selectedProduct && selectedProduct.name} />
        </Wrapper>
        <Wrapper dDirection='row' width='100%' dMargin='8px'>
          <Wrapper flex='1' margin='0px 8px'>
            <Field label='Predicted Alias' disabled value={product.name} />
          </Wrapper>
          <Wrapper flex='1' margin='0px 8px'>
            <Field label='Corected Alias' onChange={changeCorectedAlias} value={corectedAlias} />
          </Wrapper>
        </Wrapper>
      </Wrapper>
      {
        (!checked) && (
          <Wrapper padding='0px 8px' cursor='pointer'>
            {!loading ? (
              <React.Fragment>
                <SystemIcons name='close' margin='8px 0px' />
                <Button size='content' padding='8px' margin='8px 0px' onClick={onCheck}>Check</Button>
              </React.Fragment>
            ) : <ImageWrapper width='24px' height='24px' src={require('img/svg/loaderEclipse.svg')} />
            }


          </Wrapper>
        )
      }

    </Wrapper>
  )
}


export default withApollo(SelectProductCard)