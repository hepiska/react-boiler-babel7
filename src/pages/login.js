import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { LOGIN } from 'modules/auth'
import Font from '@pomona/pomona3-ui/lib/atoms/fonts'
import Fields from '@pomona/pomona3-ui/lib/atoms/fields'
import { Login } from 'graphqlQuery/auth.gql'
import { Wrapper, PlainLink } from '@pomona/pomona3-ui/lib/atoms/basic'
import { shadows, colors } from '@pomona/pomona3-ui/lib/constants'
import Button from '@pomona/pomona3-ui/lib/atoms/buttons'
import FormValidation from '@pomona/pomona3-ui/lib/molecules/formValidation'
import { useMutation } from '@apollo/react-hooks'
import SystemIcons from '@pomona/pomona3-ui/lib/atoms/systemIcons'
import Loader from 'molecules/loaders/circle'
import authRedirect from 'hoc/authRedirect'

const LoginPage = (props) => {
  const [showPassword, setShowPassword] = useState(false)
  const [childChange, setChildChange] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [loginMutate, { error }] = useMutation(Login)

  const onSubmitForm = async (data) => {
    if (data.type === 'valid') {
      setFetching(true)
      try {
        const loginRes = await loginMutate({ variables: { input: { ...data.data } } })
        props.LOGIN({ ...loginRes.data.Login, isAuth: true })
        props.history.push('/')

        setFetching(false)
      } catch (err) {
        setFetching(false)
        throw err
      }
    }
  }

  return (
    <Wrapper width='100%' height='100vh' overflow='hidden'>
      <Wrapper width='320px' height='380px' shadow={shadows.idle} justify='flex-start' dWidth='380px' radius='12px' dPadding='24px 48px' padding='24px 24px'>
        <Font size='36px' weightType='semibold' margin='0 0 16px'>Login</Font>
        {
          fetching ? (
            <Wrapper width='50%'>
              <Loader />
            </Wrapper>
          ) :
            (
              <FormValidation
                intialData={{
                  email: '',
                  password: ''
                }}
                submitToparent={onSubmitForm}
                updateParent={() => setChildChange(!childChange)}
                validationParams={{
                  email: /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  password: /(.|\s)*\S(.|\s)*/,
                }}
                initialValidation={{
                  email: true,
                  password: true
                }}
              >
                {({ data, validation }, { onChange, onSubmit }) => (
                  <div style={{ width: '100%' }}>
                    <Fields
                      name='email'
                      inputPadding='13px 16px 13px 36px'
                      value={data.email}
                      onChange={onChange}
                      placeholder='Email or Username'
                      error={!validation.email && '* invalid username'}
                      leftButton={
                        <SystemIcons dmargin="0 8px" size="24px" name="profile" />
                      }
                    />
                    <Fields
                      name='password'
                      inputPadding='13px 48px 13px 36px'
                      value={data.password}
                      onChange={onChange}
                      placeholder='Password'
                      error={!validation.password && '* invalid password'}
                      type={showPassword ? 'text' : 'password'}
                      sideButton={
                        (
                          <PlainLink margin='8px 16px' onClick={() => setShowPassword(!showPassword)}>
                            <Font size='12px'>{showPassword ? 'Hide' : 'Show'}</Font>
                          </PlainLink>
                        )}
                      leftButton={
                        <SystemIcons dmargin="0 8px" size="24px" name="profile" />
                      }
                    />
                    <Wrapper width='100%' direction='row' justify='flex-end' align='center' margin='16px 0 0'>
                      <Button
                        size='small'
                        onClick={onSubmit}
                      >
                        Log In
                      </Button>
                    </Wrapper>
                  </div>
                )}
              </FormValidation>
            )
        }

      </Wrapper>
      {
        error && error.message && (
          <Wrapper width='100%' align='center' margin='16px 0'>
            <Font color={colors.redError}>* invalid username or password</Font>
          </Wrapper>
        )
      }
    </Wrapper>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      LOGIN,
    },
    dispatch,
  )



export default connect(null, mapDispatchToProps)(authRedirect('/', LoginPage))