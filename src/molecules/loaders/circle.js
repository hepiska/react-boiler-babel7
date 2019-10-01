import React from 'react'
import lottie from 'lottie-web'
import Loader from 'lotties/loaderCircle.json'
import { Wrapper } from 'atoms'

class LoaderCircle extends React.Component {
  componentDidMount() {
    const { id } = this.props
    lottie.setLocationHref(document.location.href)
    lottie.loadAnimation({
      container: document.getElementById(id), // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: Loader // the path to the animation json
    })

  }

  render() {
    const { id, padding, size } = this.props
    return (
      <Wrapper id={id} width={size} height={size} padding={padding || '16px'} />
    )
  }
}

LoaderCircle.defaultProps = {
  id: 'loader'
}

export default LoaderCircle