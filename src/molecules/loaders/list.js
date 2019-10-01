import React from 'react'
import lottie from 'lottie-web'
import LoaderFlatListJson from 'lotties/loaderFlatList.json'
import { Wrapper } from 'atoms'

class LoaderFlatList extends React.Component {
  componentDidMount() {
    lottie.setLocationHref(document.location.href)
    lottie.loadAnimation({
      container: document.getElementById('loaderFlatList'), // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: LoaderFlatListJson // the path to the animation json
    })

  }
  render() {
    return (
      <Wrapper id='loaderFlatList' padding='16px' />
    )
  }
}

export default LoaderFlatList