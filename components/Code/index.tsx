import {useState} from 'react'
import {Box, Flex, Select, IconButton} from '@chakra-ui/react'
import {IoIosCopy} from 'react-icons/io'
import Editor from 'react-simple-code-editor'
import Highlight, {defaultProps, Language} from 'prism-react-renderer'
import Token from 'prism-react-renderer'
import TokenInputProps from 'prism-react-renderer'

import {languages} from 'lib/prismic/languages'
import minimal from 'lib/prismic/themes/minimal'

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
      theme={minimal}
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

function outputText(text: string) {
  const lines = text.split(/\r?\n/)
  return (
    <pre
      className="language-none"
      style={{
        margin: 0,
        pointerEvents: 'none',
        background: 'transparent',
      }}
    >
      {lines.map((line: string, i: number) => (
        <div key={i} className="token-line">
          <span className="line-number" key={`n${i}`}>
            {i + 1}
          </span>
          {line.length ? line : ' '}
        </div>
      ))}
    </pre>
  )
}

const initialCode = `// What's your code?
console.log("Hello World")`

const defaultLanguage = 'javascript'

export function Code() {
  const [code, setCode] = useState(initialCode)
  const [language, setLanguage] = useState<Language>(defaultLanguage)

  function highlight(value: string, lang: Language) {
    return outputCode(value, lang)
  }

  const highlightValue = (value: string) => highlight(value, language)

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
          value={language}
          w={120}
          onChange={e => setLanguage(e.target.value)}
        >
          {Object.values(languages).map(language => (
            <option
              key={language}
              value={language}
              selected={language === defaultLanguage}
              style={{color: 'black'}}
            >
              {language}
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
        />
      </Flex>
      <Box px={3} pb={4}>
        <Editor
          value={code}
          onValueChange={setCode}
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
