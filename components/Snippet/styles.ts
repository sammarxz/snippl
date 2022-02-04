import styled from "@emotion/styled";
import { Heading, Text, Flex } from "@chakra-ui/react";

export const Wrapper = styled.div`
  header button {
    opacity: 0;
    transition: opacity 0.6s ease;
  }

  &:hover header button {
    opacity: 0.5;
  }
`;

export const Title = styled(Heading)`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Description = styled(Text)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
