'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rangeParser from 'parse-numeric-range'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import ReactMarkdown from 'react-markdown'

const syntaxTheme = oneDark

const Highlighter = {
    code({ node, inline, className, ...props }) {

        const match = /language-(\w+)/.exec(className || '')
        const hasMeta = node?.data?.meta

        const applyHighlights: object = (applyHighlights: number) => {
        if (hasMeta) {
            const RE = /{([\d,-]+)}/
            const metadata = node.data.meta?.replace(/\s/g, '')
            const strlineNumbers = RE?.test(metadata)
            ? RE?.exec(metadata)[1]
            : '0'
            const highlightLines = rangeParser(strlineNumbers)
            const highlight = highlightLines
            const data: string = highlight.includes(applyHighlights)
            ? 'highlight'
            : null
            return { data }
        } else {
            return {}
        }
        }

        return match ? (
        <SyntaxHighlighter
            style={syntaxTheme}
            language={match[1]}
            PreTag="div"
            className="codeStyle"
            showLineNumbers={true}
            wrapLines={hasMeta ? true : false}
            useInlineStyles={true}
            lineProps={applyHighlights}
            {...props}
        />
        ) : (
        <code className={className} {...props} />
        )
    },
};

export default function Markdown ({ content }){
    return (
        <ReactMarkdown components={Highlighter}>
            {content}
        </ReactMarkdown>
    )
}