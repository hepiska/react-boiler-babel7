import React from 'react'
import { ImageWrapper } from 'atoms'


const SortIcon = ({ sort }) => {
  const iconName = (i) => {
    switch (i) {
      case 2:
        return require('img/svg/sort-dsc.svg')
      case 1:
        return require('img/svg/sort-asc.svg')
      default:
        return require('img/svg/sort.svg')
    }
  }
  return (
    <ImageWrapper width='12px' height='12px' src={iconName(sort)} />
  )
}


export default SortIcon