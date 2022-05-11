import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from 'src/components/ui-kits/Button'
import { Icon } from 'src/components/ui-kits/Icon'
import styles from "./ReturnAuthenBtnGroup.module.scss"
import classNames from "classnames"
import { Tooltip } from "antd"
import { useMediaQuery } from 'react-responsive'


interface ReturnAuthenBtnGroupProps { }

const whiteFilter = 'invert(100%) sepia(100%) saturate(0%) hue-rotate(125deg) brightness(103%) contrast(101%)';
const primaryFilter = 'invert(43%) sepia(4%) saturate(6465%) hue-rotate(166deg) brightness(87%) contrast(65%)';

const TitleTooltip = ({ title = "" }):JSX.Element => {
    return (
        <>
            {title ? <span>{title}</span> : <></>}
        </>
    )
}

const ReturnAuthenBtnGroup: React.FC<ReturnAuthenBtnGroupProps> = (): JSX.Element => {
    const [hoverBackBtn, setHoverBackBtn] = useState({
        home: false,
        return: false
    });
    const router = useRouter();
    const isMobileDevice = useMediaQuery({ query: '(max-width: 768px)' })

    return (
        <>
            <Button
                handleClick={() => router.push("/")}
                style={{
                    color: "#fff",
                    background: "transparent",
                    padding: 0,
                }}
            >
                <Tooltip 
                    placement="right" 
                    title={<TitleTooltip title="Home" />} 
                    color="#4d708e" 
                    visible={hoverBackBtn.home && isMobileDevice}
                >
                    <div
                        onMouseEnter={() => setHoverBackBtn((value) => ({
                            ...value,
                            home: true
                        }))}
                        onMouseLeave={() => setHoverBackBtn((value) => ({
                            ...value,
                            home: false
                        }))}
                        className={classNames(
                            styles["auth-btn-content"],
                            { [styles["hover-auth-btn-content"]]: hoverBackBtn.home }
                        )}
                    >
                        <Icon
                            source="/images/icons/home.svg"
                            width='20px'
                            height='20px'
                            style={{
                                filter: hoverBackBtn.home ? primaryFilter : whiteFilter
                            }}
                        />
                        <p className={styles["auth-btn-content__text"]}>Home</p>
                    </div>
                </Tooltip>
            </Button>
            <Button
                handleClick={() => router.back()}
                style={{
                    color: "#fff",
                    background: "transparent",
                    marginTop: "20px",
                    padding: 0,
                }}
            >
                <Tooltip
                    placement="right" 
                    title={<TitleTooltip title="Return" />} 
                    color="#4d708e" 
                    visible={hoverBackBtn.return && isMobileDevice}
                >
                    <div
                        onMouseEnter={() => setHoverBackBtn((value) => ({
                            ...value,
                            return: true
                        }))}
                        onMouseLeave={() => setHoverBackBtn((value) => ({
                            ...value,
                            return: false
                        }))}
                        className={classNames(
                            styles["auth-btn-content"],
                            { [styles["hover-auth-btn-content"]]: hoverBackBtn.return }
                        )}
                    >
                        <Icon
                            source="/images/icons/arrow-left.svg"
                            width='20px'
                            height='20px'
                            style={{
                                filter: hoverBackBtn.return ? primaryFilter : whiteFilter
                            }}
                        />
                        <p className={styles["auth-btn-content__text"]}>Back</p>
                    </div>
                </Tooltip>
            </Button>
        </>
    )
}

export default ReturnAuthenBtnGroup
