import React from 'react'
import lottie from 'lottie-web'
import LoaderBannerJson from 'lotties/loaderBanner.json'
import { Wrapper } from 'atoms'

class LoaderBanner extends React.Component {
  componentDidMount() {
    lottie.setLocationHref(document.location.href)
    lottie.loadAnimation({
      container: document.getElementById('loaderBanner'), // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: LoaderBannerJson // the path to the animation json
    })

  }
  render() {
    return (
      <Wrapper id='loaderBanner' padding='16px' />
    )
  }
}

export default LoaderBanner