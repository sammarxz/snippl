import {Box, Flex, Select, IconButton} from '@chakra-ui/react'
import {IoIosCopy} from 'react-icons/io'
import Editor from 'react-simple-code-editor'
import Highlight, {defaultProps, Language} from 'prism-react-renderer'
import Token from 'prism-react-renderer'
import TokenInputProps from 'prism-react-renderer'

import {useAppContext} from 'hooks/useAppContext'

import { SnippetType } from 'context/appContext'

import {languages} from 'lib/prismic/languages'
import snippl from 'lib/prismic/themes/snippl'

function renderToken(
  getTokenProps: ({
    token,
    key,
  }: {
    token: string | Token | Highlight | TokenInputProps
    key: string
  }) => JSX.Element,
  token: string | Token | Highlight | TokenInputProps,
  key: string,
) {
  const props = getTokenProps({token, key})

  return <span {...props} />
}

function outputCode(code: string, language: Language) {
  return (
    <Highlight
      {...defaultProps}
      code={code}
      language={language}
      theme={snippl}
    >
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <pre
          className={className}
          style={{
            ...style,
            margin: 0,
            pointerEvents: 'none',
            background: 'transparent',
          }}
        >
          {tokens.map((line, i: number) => (
            <div key={i} {...getLineProps({line, key: i})}>
              {[
                <span className="line-number" key={`n${i}`}>
                  {i + 1}
                </span>,
                ...line.map((token, key) =>
                  renderToken(getTokenProps, token, key),
                ),
              ]}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

type CodeProps = {
  onChange: (value:string, type:keyof SnippetType) => void
}

export function Code({onChange}:CodeProps) {
  const {state: {snippet}} = useAppContext()

  function highlight(value: string, lang: Language) {
    return outputCode(value, lang)
  }

  const highlightValue = (value: string) => highlight(value, snippet.lang)

  function copyCodeToClipboard() {
    navigator.clipboard.writeText(snippet.code);
  }

  return (
    <Box className="code-frame" bg="whiteAlpha.200" borderRadius="base" mt={2}>
      <Flex
        bg="blackAlpha.400"
        alignItems="center"
        justifyContent="space-between"
        p={3}
        mb={4}
      >
        <Select
          size="sm"
          variant="outline"
          borderColor="whiteAlpha.200"
          borderRadius="base"
          value={snippet.lang}
          w={120}
          onChange={e => onChange(e.target.value, 'lang')}
        >
          {Object.values(languages).map(lang => (
            <option
              key={lang}
              value={lang}
              selected={lang === snippet.lang}
              style={{color: 'black'}}
            >
              {lang}
            </option>
          ))}
        </Select>
        <IconButton
          variant="outline"
          colorScheme="whiteAlpha"
          borderColor="whiteAlpha.200"
          aria-label="Copy code to clipboard"
          fontSize="16px"
          size="sm"
          icon={<IoIosCopy />}
          onClick={copyCodeToClipboard}
        />
      </Flex>
      <Box px={3} pb={4}>
        <Editor
          value={snippet.code}
          onValueChange={(value) => onChange(value, 'code')}
          highlight={highlightValue}
          className="editor"
          style={{
            fontFamily: '"IBM Plex Mono", "Fira Mono", monospace',
            fontSize: 14,
            lineHeight: 1.6,
          }}
        />
      </Box>
    </Box>
  )
}