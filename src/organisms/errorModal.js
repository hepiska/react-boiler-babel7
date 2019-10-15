import React from 'react'
import Font from '@pomona/pomona3-ui/lib/atoms/fonts'
import BasicModal from 'molecules/modal'



const ErrorOrMessageModal = ({ isOpen, closeModal, title = 'Error', message }) => (
  <BasicModal isOpen={isOpen} title={title} actions={[{ text: 'close', onClick: closeModal }]}>
    <Font sizeType="h1" weightType="semibold">
      {message}
    </Font>
  </BasicModal>
)

export default ErrorOrMessageModal