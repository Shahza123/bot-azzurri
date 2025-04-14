import React, { memo, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import remarkGfm from "remark-gfm";
import { Components } from "react-markdown";
import { HTMLAttributes } from "react";

interface MarkdownProps {
    children: ReactNode;
}

const components: Components = {

    code({ className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || "");

        return match ? (
            <pre
                {...(props as React.HTMLAttributes<HTMLPreElement>)}
                className={`${className} text-sm w-[80dvw] md:max-w-[500px] overflow-x-scroll bg-zinc-100 p-3 rounded-lg mt-2 dark:bg-zinc-800`}
            >
                <code className={match[1]}>{children}</code>
            </pre>
        ) : (
            <code
                {...props}
                className={`${className} text-sm bg-zinc-100 dark:bg-zinc-800 py-0.5 px-1 rounded-md`}
            >
                {children}
            </code>
        );
    },
    ol({ children, ...props }) {
        return (
            <ol className="list-decimal list-outside ml-4" {...props}>
                {children}
            </ol>
        );
    },
    li({ children, ...props }) {
        return (
            <li className="py-1" {...props}>
                {children}
            </li>
        );
    },
    ul({ children, ...props }) {
        return (
            <ul className="list-disc list-outside ml-4" {...props}>
                {children}
            </ul>
        );
    },
    strong({ children, ...props }) {
        return (
            <span className="font-semibold" {...props}>
                {children}
            </span>
        );
    },
    a({ children, href, ...props }) {
        return (
            <Link
                to={href || "#"}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noreferrer"
                {...(props as HTMLAttributes<HTMLAnchorElement>)}
            >
                {children}
            </Link>
        );
    },
};

const NonMemoizedMarkdown: React.FC<MarkdownProps> = ({ children }) => {
    const content = typeof children === "string" ? children : String(children);


    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {content}
        </ReactMarkdown>
    );
};

export const Markdown = memo(
    NonMemoizedMarkdown,
    (prev, next) => prev.children === next.children
);
