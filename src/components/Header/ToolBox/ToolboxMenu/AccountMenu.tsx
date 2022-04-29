import React from 'react'
import styles from "./ToolboxMenu.module.scss"
import Link from 'next/link'
import classNames from 'classnames'

interface AccountMenuProps {
    isShow: boolean;
    style?: Record<string, any>
}

const AccountMenu: React.FC<AccountMenuProps> = ({ isShow = false, style = {} }): JSX.Element => {
    return (
        <div
            className={classNames(
                styles["toolbox-popup"],
            )}
            style={{
                ...style,
            }}
        >
            <ul className={classNames(styles["account-menu"])}>
                <Link href="/auth/register">
                    <li key="1" className={styles["account-menu__item"]}>
                        Register
                    </li>
                </Link>
                <Link href="/auth/login">
                    <li key="2" className={styles["account-menu__item"]}>
                        Sign in
                    </li>
                </Link>
            </ul>
        </div>
    )
}

export default AccountMenu
