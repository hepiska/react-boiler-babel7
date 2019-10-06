import React, { useState } from 'react'
import { ImageWrapper, Wrapper } from '@pomona/pomona3-ui/lib/atoms/basic'
import { colors } from '@pomona/pomona3-ui/lib/constants'
import Viewer from 'react-viewer'



const useSelected = (initial) => {
  const [selectedImage, setSelectedImage] = useState(initial)
  const [isFullScreenOpen, setFullScreenOpen] = useState(false)
  const setBigImage = (idx) => () => {
    setSelectedImage(idx)
  }
  const openFullScreen = () => {
    setFullScreenOpen(true)
  }

  const closeFullScreen = () => {
    setFullScreenOpen(false)
  }

  return [{ selectedImage, isFullScreenOpen }, { setBigImage, openFullScreen, closeFullScreen }]

}

const ImageColective = ({ images, }) => {
  const [{ selectedImage, isFullScreenOpen }, { setBigImage, openFullScreen, closeFullScreen }] = useSelected(0)

  return (
    <Wrapper width='100%' dPadding='0px' padding='20px 12px' overflow='hidden' radius='0px'>
      <Viewer
        visible={isFullScreenOpen}
        onClose={closeFullScreen}
        activeIndex={selectedImage}
        images={images.map(img => ({ src: img, alt: img }))}
      />
      <ImageWrapper onClick={openFullScreen} width='100%' maxHeight='720px' src={images[selectedImage]} />
      <Wrapper direction='row' margin='24px 0px' width='320px' justify='flex-start' overflow='scroll' radius='0px'>
        {images.map((image, idx) =>
          (
            <ImageWrapper
              onClick={setBigImage(idx)}
              border={idx === selectedImage ? `3px solid ${colors.pomonaBlue}` : 0}
              width='60px'
              margin='0px 8px'
              maxHeight='80px'
              key={idx}
              src={image}
            />
          ))}
      </Wrapper>
    </Wrapper>

  )
}


export default ImageColective