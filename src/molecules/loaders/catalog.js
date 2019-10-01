import React from 'react'
import lottie from 'lottie-web'
import LoaderCatalogJson from 'lotties/loaderCatalog.json'
import { Wrapper } from 'atoms'

class LoaderKatalog extends React.Component {
  componentDidMount() {
    lottie.setLocationHref(document.location.href)
    lottie.loadAnimation({
      container: document.getElementById('loaderCatalog'), // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: LoaderCatalogJson // the path to the animation json
    })

  }
  render() {
    return (
      <Wrapper id='loaderCatalog' padding='16px' />
    )
  }
}

export default LoaderKatalog