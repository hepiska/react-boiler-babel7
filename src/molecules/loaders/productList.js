import React from 'react'
import lottie from 'lottie-web'
import LoaderProductListJson from 'lotties/loaderProductList.json'
import { Wrapper } from 'atoms'

class LoaderProductList extends React.Component {
  componentDidMount() {
    lottie.setLocationHref(document.location.href)
    lottie.loadAnimation({
      container: document.getElementById('loaderProductList'), // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: LoaderProductListJson // the path to the animation json
    })

  }
  render() {
    return (
      <Wrapper width='100%' justify='center'>
        <Wrapper id='loaderProductList' padding='16px' />
      </Wrapper>

    )
  }
}

export default LoaderProductList