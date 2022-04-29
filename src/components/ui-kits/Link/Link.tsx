import React from 'react'
import Link from 'next/link'
import styles from './Link.module.scss'

interface LinkProps {
    href: string | Record<string, any>,
    text: string,
    isReplace?: boolean,
    // onClick?: (e?: React.MouseEvent<HTMLElement>) => void,
}

const CustomLink:React.FC<LinkProps> = ({ href , text = "", isReplace = false }):JSX.Element => {
    return (
        <Link href={href} replace={isReplace}>
            <a className={styles["link-text"]}>{text}</a>
        </Link>
    )
}

export default CustomLink;