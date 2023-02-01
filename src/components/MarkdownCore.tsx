import React from "react";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import "highlight.js/styles/github.css";

interface MarkdownProps {
    children: string;
    className?: string;
}

/**
 * ### Info
 * -  Core Markdown Render Component
 * - Add Plugins Here
 * ### Current Plugins
 * - remark-gfm
 * - rehype-highlight
 */
const MarkdownCore: React.FC<MarkdownProps> = ({ children, className }) => {
    return (
        <ReactMarkdown
            className={className}
            rehypePlugins={[rehypeHighlight]}
            remarkPlugins={[remarkGfm]}
        >
            {children}
        </ReactMarkdown>
    );
};
export default MarkdownCore;
