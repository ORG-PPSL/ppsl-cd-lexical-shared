import { useEffect, useState } from 'react'
import { createHeadlessEditor } from '@lexical/headless'
import { $generateHtmlFromNodes } from '@lexical/html'

import { bioConfig } from './config'
import { defaultTheme, readOnlyTheme } from '../theme'

export function BioHTML ({ initialContent }) {
  const [html, setHTML] = useState('<span>Loading...</span>')

  const theme = { ...defaultTheme, ...readOnlyTheme }

  const config = bioConfig(theme, false, function onError (error) {
    throw error
  })

  const editor = createHeadlessEditor(config)

  editor.setEditorState(editor.parseEditorState(initialContent))

  useEffect(() => {
    editor.update(() => {
      setHTML($generateHtmlFromNodes(editor, null))
    })
  }, [editor])

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
