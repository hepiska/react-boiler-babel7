import styled from 'styled-components'
import { colors, shadows } from '@pomona/pomona3-ui/lib/constants'

export const Wrapper = styled.div`
  font-family: 'Linotte';
  -webkit-overflow-scrolling: touch;
  display: ${({ display }) => display || 'flex'};
  position: ${({ position }) => position || 'static'};
  flex: ${({ flex }) => flex || null};
  flex-wrap: ${({ wrap }) => wrap || null};
  z-index: ${({ zIndex }) => zIndex || null};
  border-radius: ${({ radius }) => radius || '8px'};
  flex-direction: ${({ direction }) => direction || 'column'};
  align-items: ${({ align }) => align || 'center'};
  justify-content: ${({ justify }) => justify || 'center'};
  margin: ${({ margin }) => margin || null};
  padding: ${({ padding }) => padding || null};
  width: ${({ width }) => width || null};
  max-width: ${({ maxWidth }) => maxWidth || null};
  max-height: ${({ maxHeight }) => maxHeight || null};
  height: ${({ height }) => height || null};
  border: ${({ border }) => border || null};
  box-shadow: ${({ shadow }) => shadow || null};
  color: ${({ color }) => color || null};
  background: ${({ background }) => background || null};
  overflow: ${({ overflow }) => overflow || null};
  cursor: ${({ cursor }) => cursor || null};
  ${props => (props.focus ? `
    :hover {
      box-shadow: ${shadows.focused};
    }
    :focus {
      box-shadow: ${shadows.focused};
    }
  ` : null)}
  @media (min-width: 768px) {
    margin: ${({ margin, dMargin }) => dMargin || margin || null};
    flex-direction: ${({ dDirection, direction }) => dDirection || direction || 'column'};
    padding: ${({ padding, dPadding }) => dPadding || padding || null};
    width: ${({ dWidth, width }) => dWidth || width || null};
    overflow: ${({ dOverflow, overflow }) => dOverflow || overflow || null};
    justify-content: ${({ dJustify, justify }) => dJustify || justify || 'center'};
    border-radius: ${({ dRadius, radius }) => dRadius || radius || '8px'};
  }
`

export const MobileWrapper = styled(Wrapper)`
  @media (min-width: 768px) {
    display:none;
}
`

export const BorderLessDekstopWrapper = styled(Wrapper)`
    @media(min-width: 768px){
        box-shadow: none;
        background: none;
    }
`

export const DesktopWrapper = styled(Wrapper)`
  @media (max-width: 768px) {
    display:none;
}
`

export const ImageMenu = styled.img`
  height: 28px;
  padding: 0 8px;
  :hover {
    cursor: pointer;
  }
`

export const ImageWrapper = styled.img`
  position: static;
  border-radius: ${({ radius }) => radius || null};
  margin: ${({ margin }) => margin || null};
  padding: ${({ padding }) => padding || null};
  width: ${({ width }) => width || null};
  max-width: ${({ maxWidth }) => maxWidth || null};
  height: ${({ height }) => height || null};
  border: ${({ border }) => border || null};
`

export const NavContainer = styled.div`
  position: fixed;
  height: 56px;
  width: 100vw;
  z-index: 10;
  box-shadow: ${({ shadow }) => shadow || shadows.idle};
  background: ${({ backgroundColor }) => backgroundColor || colors.white};
  ${({ position }) => {
    switch (position) {
      case 'top':
        return 'top: 0px; left: 0px;'
      default:
        return 'bottom: 0px; left: 0px;'
    }
  }};
    @media (min-width:720px) {
    height: 72px
  }
`
export const BorderFullDekstopWrapper = styled(Wrapper)`
    @media(min-width: 768px){
        box-shadow: ${shadows.idle};
        background: ${colors.white};
    }
`

export const LocalNavContainer = styled.div`
  width: 100%;
  max-width: 460px;
  height: 56px;
  z-index: 11;
  margin: 0px auto;
  position: relative;
  @media (min-width:720px) {
    max-width:84vw;
    height: 72px
  }
`

export const RootContainer = styled.div`
  width: 100%;
  max-width: 1200px;
`
export const Container = styled.div`
  width: 100%;
  max-width: 720px;
`

export const PlainLink = styled.a`
  text-decoration: ${({ textDecoration }) => textDecoration || 'none'};
  margin: ${({ margin }) => margin || null};
  padding: ${({ padding }) => padding || null};
  color: ${({ color }) => color || null};
  cursor: pointer;
  :hover, :focus {
    color: ${({ hoverColor }) => hoverColor || null};
  }
`