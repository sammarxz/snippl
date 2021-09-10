import styled from '@emotion/styled'

export const Wrapper = styled.div`
  position: relative;

  .options {
    position: absolute;
    top: 2px;
    right: var(--chakra-space-3);
    opacity: 0;
    transition: opacity 0.6s ease;

    button {
      margin-left: var(--chakra-space-2);

      svg {
        opacity: 0.6;
        transition: opacity 0.6s ease;
      }

      &:hover {
        svg {
          opacity: 1;
        }
      }
    }
  }

  &:hover {
    .options {
      opacity: 1;
    }
  }
`
