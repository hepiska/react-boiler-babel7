import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { setContext } from "apollo-link-context"
import { onError, ErrorLink } from "apollo-link-error"
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { Provider } from 'react-redux'
import Pages from 'pages'
import store from './store'
import { BASE_URL } from './utils/constants'

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    const expToken = graphQLErrors.find((err) => err.message.includes("jwt expired"))
    if (expToken) {
      localStorage.removeItem('token')
      window.location.replace('/login')
    }
  }

})

const httpLink = new HttpLink({ uri: `${BASE_URL}graphql` })

const cache = new InMemoryCache({
  // dataIdFromObject: object => {
  //   switch (object.__typename) {// use `blah` as the priamry key
  //     case 'Ads':
  //       return object.coupon._id || object.coupon.id
  //     default: return object.id || object._id // fall back to `id` and `_id` for all other types
  //   }
  // }
})

const authlink = setContext((req, { headers }) => {
  const header = {}
  const token = localStorage.getItem('token')
  if (token) {
    header.authorization = token
  }
  return {
    headers: {
      ...headers,
      ...header
    }
  }
})

// const link = authlink.concat(httpLink)

const link = ApolloLink.from([
  authlink,
  errorLink,
  httpLink
])


const client = new ApolloClient({
  link,
  cache
})

const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router basename="/">
        <Pages />
      </Router>
    </Provider>
  </ApolloProvider>
)

export default App
