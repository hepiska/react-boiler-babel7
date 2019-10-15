import React, { useState } from 'react'
import styled from 'styled-components'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { ImageWrapper, Wrapper } from '@pomona/pomona3-ui/lib/atoms/basic'
import Font from '@pomona/pomona3-ui/lib/atoms/fonts'
import ImageColective from 'organisms/imageColective'
import { GetUnAliasedReceipt } from 'graphqlQuery/receipt.gql'
import { CreateAliasByManager } from 'graphqlQuery/product.gql'
import { dateConstant } from 'utils/constants'
import CircleLoader from "molecules/loaders/circle"
import SelectProductCard from 'molecules/selectProductCard'
import ErrorModal from 'organisms/errorModal'
import Button from '@pomona/pomona3-ui/lib/atoms/buttons'




const HomePage = () => {
  const [localError, setLocalError] = useState(null)
  const [aliasResponse, setAliasResponse] = useState(null)
  const [aliasesInput, setAliasesInput] = useState([])
  const [deletedProduct, setDeletedProduct] = useState([])

  const [createAlias] = useMutation(CreateAliasByManager)
  const { loading, error, data, refetch } = useQuery(GetUnAliasedReceipt, {
    fetchPolicy: 'network-only',
    variables: { input: dateConstant }
  })

  if (loading) {
    return (
      <Wrapper>
        <CircleLoader />
      </Wrapper>
    )
  }

  if (error) {
    return (
      <Wrapper>
        {JSON.stringify(error)}
      </Wrapper>
    )

  }

  const receipt = data.GetUnAliasedReceipt

  const onError = (err) => {
    setLocalError(err.message)
  }
  const onSubmit = async () => {
    try {
      const resAlias = receipt.prediction.products.length - aliasesInput.length
      if (deletedProduct.length - resAlias !== 0) {
        throw new Error('Proses semua alias sebelum melakukan submit')
      }

      const aliasData = aliasesInput.map(al => ({
        product: al.product._id,
        retailer: receipt.retailer._id,
        alias: al.alias.corected
      }))
      // const createAliasInput = {}
      const res = await createAlias({
        variables: {
          input: {
            receipt_id: receipt._id,
            aliases: aliasData
          }
        }
      })
      setAliasResponse(res.data.CreateAliasByManager.message)
    } catch (err) {
      setLocalError(err.message)
    }
  }

  const getData = (productAlias) => {
    setAliasesInput([...aliasesInput, productAlias])
  }

  const closeModal = () => {
    setLocalError(null)
  }

  const onDeleteProduct = (product) => {
    // need to call backend to set data on redis
    setDeletedProduct([...deletedProduct, product])
  }

  const closeResponse = () => {
    refetch()
    setAliasResponse(null)
  }
  return (
    <Wrapper>
      <Wrapper dDirection='row' width='100%' align='flex-start'>
        <Wrapper flex='2'>
          <ImageColective images={receipt.images.map(img => (img.uri))} />
        </Wrapper>
        <Wrapper
          flex='3'
          maxHeight='760px'
          justify='flex-start'
          dPadding='0px 32px'
          overflowY='scroll'
          align='flex-start'
        >
          <Font size='22px'>
            {`Retailer : ${receipt.retailer.name}`}
          </Font>
          <Wrapper
            width='100%'
            margin='12px 0px'
            dPadding='0px 8px'
            padding='0px 1px'
            overflow='scroll'
            zIndex='0'
            justify='flex-start'
          >
            {
              receipt.prediction.products.filter(prod => !deletedProduct.find(delProd => delProd._id === prod._id)).map(product => (
                <SelectProductCard
                  onRemoveProduct={onDeleteProduct}
                  key={product._id}
                  id={product._id}
                  checked={aliasesInput.find(al => al.alias.predicted === product.name)}
                  product={product}
                  retailer={receipt.retailer}
                  onError={onError}
                  getData={getData}
                />
              ))
            }
          </Wrapper>
          <Wrapper width='100%' direction='row'>
            {/* <Button background='red' margin='0px 8px'>Get other Receipt</Button> */}
            <Button margin='0px 8px' onClick={onSubmit}>Submit</Button>
          </Wrapper>
        </Wrapper>
      </Wrapper>
      <ErrorModal
        isOpen={localError}
        message={localError}
        closeModal={closeModal}
      />
      <ErrorModal
        isOpen={aliasResponse}
        message={aliasResponse}
        title='Response'
        closeModal={closeResponse}
      />
    </Wrapper>
  )
}


export default HomePage