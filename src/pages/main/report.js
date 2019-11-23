import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { Wrapper, ImageWrapper } from '@pomona/pomona3-ui/lib/atoms/basic'
import Font from '@pomona/pomona3-ui/lib/atoms/fonts'
import dayjs from 'dayjs'
import { shadows } from '@pomona/pomona3-ui/lib/constants'
import { GetAliasUserCount } from 'graphqlQuery/alias.gql'
import CircleLoader from "molecules/loaders/circle"

import UserCard from '@pomona/pomona3-ui/lib/molecules/cards/userCard'



const ReportList = () => {
  const { loading, error, data } = useQuery(GetAliasUserCount)
  if (loading) {
    return (
      <CircleLoader />
    )
  }
  if (error) {
    return (
      <Wrapper margin='16px 0px' width='100%' padding='16px' background='white' shadow={shadows.idle}>
        <Font>ups error</Font>
      </Wrapper>
    )
  }

  const { GetAliasUserCount: userData } = data
  return (
    <Wrapper margin='16px 0px' width='100%' padding='16px' align='flex-start' direction='row' wrap='wrap'>
      {userData.map(_dat => {
        const bulanName = dayjs(_dat.end_at).format('MMMM')
        return (
          <Wrapper minWidth='280px' margin='32px' padding='16px' justify='space-between' background='white' shadow={shadows.idle}>
            <Font>{bulanName}</Font>

            <Wrapper margin='0px 20px' flex='1' minHeight='120px'>
              <Font>{_dat.count}</Font>
            </Wrapper>
          </Wrapper>
        )
      })}

    </Wrapper>
  )
}


const ReportPage = () => {
  return (
    <Wrapper width='100%'>
      <UserCard title={localStorage.getItem('name')} subtitle={localStorage.getItem('_id')} avatar={require('img/svg/group-2.svg')} />
      <ReportList />
    </Wrapper>
  )
}


export default ReportPage