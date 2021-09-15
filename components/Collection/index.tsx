import {memo, useState, useRef} from 'react'
import {
  Stack,
  Box,
  Heading,
  Flex,
  Icon,
  Input,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import {FiEdit3, FiTrash, FiX} from 'react-icons/fi'

import * as S from './styles'

type CollectionProps = {
  index: number
  id: string
  name: string
  color: string
  isActive: boolean
  isEditing: boolean
  setEditCollection: (index: number) => void
  setCloseEditCollection: (index: number) => void
  submitEditForm: (value: string, id: string) => void
  onDeleteCollection: (id: string) => void
}

export const Collection = memo(function Collection({
  index,
  id,
  name,
  color,
  isActive,
  isEditing,
  setEditCollection,
  setCloseEditCollection,
  submitEditForm,
  onDeleteCollection,
}: CollectionProps) {
  const [editValue, setEditValue] = useState(name)
  const {isOpen, onOpen, onClose} = useDisclosure()

  const showEditForm = (index: number) => {
    setEditCollection(index)
  }

  const onSubmitEditForm = () => {
    if (!editValue.trim()) return
    submitEditForm(editValue, id)
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      onSubmitEditForm()
    }
  }

  const renderEditForm = () => (
    <Flex alignItems="center" justifyContent="space-between">
      <Input
        variant="unstyled"
        size="sm"
        fontWeight={600}
        autoFocus
        value={editValue}
        onChange={e => setEditValue(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button onClick={() => setCloseEditCollection(index)}>
        <FiX />
      </button>
    </Flex>
  )

  return (
    <S.Wrapper>
      <Stack
        bg={isActive ? 'whiteAlpha.200' : 'transparent'}
        transition="ease"
        transitionProperty="all"
        transitionDuration=".6s"
        px={3}
        py={2}
        borderRadius="base"
        opacity={isActive ? 1 : 0.4}
        _hover={{opacity: 1}}
      >
        {isActive && isEditing ? (
          <>{renderEditForm()}</>
        ) : (
          <Flex alignItems="center" justifyContent="space-between">
            <Stack spacing={3} alignItems="center" isInline>
              <Box w="8px" h="8px" borderRadius="8px" bg={`${color}.400`}></Box>
              <Heading
                as="h2"
                fontSize="sm"
                fontWeight="600"
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {name}
              </Heading>
            </Stack>
            <Box className="options">
              <button
                aria-label="edit collection"
                onClick={() => showEditForm(index)}
              >
                <Icon fontSize="md" as={FiEdit3} />
              </button>
              <button aria-label="remove collection" onClick={onOpen}>
                <Icon fontSize="md" as={FiTrash} />
              </button>
            </Box>
          </Flex>
        )}
      </Stack>
      <Modal variant="dark" isOpen={isOpen} onClose={onClose} size="xs">
        <ModalOverlay />
        <ModalContent bg="modalBG" textColor="whiteAlpha.600">
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you would like to delete collection{' '}
              <strong>{name}</strong>?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="whiteAlpha" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={() => onDeleteCollection(id)}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </S.Wrapper>
  )
})
