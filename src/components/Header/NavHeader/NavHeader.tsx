import React, { useState, useEffect } from 'react'
import { Drawer, Row, Col } from 'antd'
import { Button } from "src/components/ui-kits/Button"
import styles from './NavHeader.module.scss'
import classNames from 'classnames'
import { NavCart } from './NavCart'
import { NavCategory } from './NavCategory'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'

interface NavHeaderProps {}

const NavHeader: React.FC<NavHeaderProps> = (): JSX.Element => {
    const [showDrawer, setShowDrawer] = useState(false);
    const isMobileDevice = useMediaQuery({ query: '(max-width: 499px)' })
    
    useEffect(() => {
        return () => {
            setShowDrawer(false);
        }
    }, []);

    const handleShowDrawer = (drawerStatus: boolean): void => {
        setShowDrawer(!drawerStatus)
    }

    const handleCloseDrawer = (): void => {
        setShowDrawer(false)
    }

    return (
        <>
            <Row className={styles["navheader"]} justify="space-between">
                <Col span={12} className={styles["navheader-left"]}>
                    <Button
                        style={{
                            display: "flex",
                            alignItems: "center",
                            border: "none",
                            backgroundColor: "transparent",
                            marginLeft: isMobileDevice ? 0 : "-10px",
                        }}
                        handleClick={() => handleShowDrawer(showDrawer)}
                    >
                        {showDrawer ?
                            <i aria-hidden className={classNames("fas fa-arrow-left", "rotate-arrow", styles["navheader-left__icon"])}></i>
                            :
                            <i aria-hidden className={classNames("fas fa-bars", "rotate-nav", styles["navheader-left__icon"])}></i>
                        }
                    </Button>
                    <Link href="/">
                        <span className={styles["navheader-left__text"]}>
                            4everjeans
                        </span>
                    </Link>
                </Col>
                <Col span={12} className={styles["navheader-right"]}>
                    <NavCart />
                </Col>
            </Row>
            <Drawer
                title="Basic Drawer"
                placement='left'
                closable={false}
                onClose={handleCloseDrawer}
                visible={showDrawer}
                key='drawer'
                className={styles["navheader-drawer"]}
                bodyStyle={{ padding: 0 }}
            >
                <NavCategory />
            </Drawer>
        </>
    )
}

export default NavHeader