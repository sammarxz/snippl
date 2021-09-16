import styled from '@emotion/styled'
import {Container} from '@chakra-ui/react'

export const Preview = styled(Container)`
  position: relative;

  &:before,
  &:after {
    content: '';
    content: '';
    position: absolute;
    bottom: 0;
    left: 16px;
    right: 16px;
  }

  &:before {
    top: 0;
    z-index: -1;
    background: var(--chakra-colors-green-300);
    transform: scaleY(1.01);
    filter: blur(120px);
    opacity: .2;
  }

  &:after {
    height: 400px;
    background: linear-gradient(0deg, #000, transparent);
    z-index: 1111;
    bottom: -10px;
  }
`