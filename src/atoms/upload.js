import React, { Fragment, useState } from 'react'
import { Wrapper, ImageWrapper } from 'atoms'
import { colors } from '@pomona/pomona3-ui/lib/constants'
import Font from '@pomona/pomona3-ui/lib/atoms/fonts'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import Loader from 'molecules/loaders/circle'
import { uploadFile2 } from 'utils/services'

let cancelToken = null
const UploadCompt = ({ target, url, sizeText, onChange, name, width = '350px', height = '150px', accept = 'image/jpeg' }) => {
  const [loading, setLoading] = useState(false)
  const onDropRejected = async () => {
    const error = {
      message: 'format gambar tidak sesuai',
    }
    onChange(null, false, error)

  }
  const onDropAccepted = async (files) => {
    if (onChange) {

      try {
        const image = files[0]
        cancelToken = axios.CancelToken.source()
        const formData = new FormData()
        formData.append(target, image)
        setLoading(true)
        const res = await uploadFile2(formData, () => { }, cancelToken.token)
        setLoading(false)
        onChange(name, res.data.data, null)

      } catch (error) {
        setLoading(false)
        onChange(name, null, error)
      }
    }
  }

  return (
    <Dropzone
      onDropAccepted={onDropAccepted}
      onDropRejected={onDropRejected}
      accept={accept}
      style={{ position: 'relative' }}
    >
      <Wrapper width={width} height={height} overflow='hidden' background={url ? colors.white : 'rgba(106, 124, 149, 0.3)'} cursor='pointer'>

        {
          loading ? <Loader id='loader-upload' /> : url ?
            <Wrapper cursor='pointer'>
              <ImageWrapper src={url} height='100%' width='100%' />
              <Wrapper height='40px' width='100%' radius='0px 0px 8px 8px' background='rgba(106, 124, 149, 0.08)' style={{ position: 'absolute', bottom: 0 }}>
                <Font size='16px'>Change Photo</Font>
              </Wrapper>
            </Wrapper>
            : (
              <Fragment>
                <ImageWrapper src={require('img/svg/grey-camera.svg')} margin='8px 0px' />
                <Font size='16px'>Add your image</Font>
                <Font size='16px'>{sizeText}</Font>
              </Fragment>
            )
        }
      </Wrapper>
    </Dropzone>
  )
}



export default UploadCompt