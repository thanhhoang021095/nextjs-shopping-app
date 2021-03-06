import React, { useEffect, useState, useRef } from 'react'
import { Row, Col } from 'antd'
import { Button } from "src/components/ui-kits/Button"
import styles from './Toolbox.module.scss'
import classNames from 'classnames'
import { useMediaQuery } from 'react-responsive'
import storageActions from 'controllers/redux/actions/storageActions'
import { connect } from 'react-redux'
import { CartMenu, AccountMenu } from "./ToolboxMenu"
import { CSSTransition } from 'react-transition-group'
import { SearchInput } from "../SearchInput"
import IUser from 'src/interfaces/user'
import { NavCart } from '../NavHeader/NavCart'

interface CartProps {
    cart: any[];
    categoryWidth?: number;
    userInfo: IUser;
}

const Toolbox: React.FC<CartProps> = ({ cart, categoryWidth = 0, userInfo = null }): JSX.Element => {
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [showCartMenu, setShowCartMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);

    const isLargeDevice = useMediaQuery({ query: '(min-width: 768px)' });
    const isBelowMediumDevice = useMediaQuery({ query: '(max-width: 1200px)' });

    const cartRef = useRef(null);
    const accountRef = useRef(null);
    const searchToolboxElm = useRef(null);

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
        return () => {
            setMounted(false);
            setShowCartMenu(false);
            setShowAccountMenu(false);
        }
    }, [])


    useEffect(() => {
        const checkIfClickedOutside = (e: any): void => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            const cartElm: any = cartRef.current;
            const accountElm: any = accountRef.current;

            if (showCartMenu && cartRef.current && !cartElm.contains(e.target)) {
                setShowCartMenu(false);
            }

            if (showAccountMenu && accountRef.current && !accountElm.contains(e.target)) {
                setShowAccountMenu(false);
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
            // close popup when unmount 
        }
    }, [showCartMenu, showAccountMenu]);

    return (
        mounted &&
        <Row className={styles["toolbox"]} justify="end" gutter={16}>
            <Col
                xxl={10} xl={4} lg={8} md={10}
                className={styles["toolbox-col"]}
            >
                <CSSTransition
                    in={isOpenSearch}
                    timeout={300}
                    classNames="slide-animate"
                    unmountOnExit
                >
                    <SearchInput
                        style={{
                            width: `${categoryWidth}px`,
                            right: "120px"
                        }}
                        searchToolboxElm={searchToolboxElm}
                    />
                </CSSTransition>
                <div
                    className={styles["toolbox-col__search"]}
                    onClick={() => {
                        setIsOpenSearch(status => !status);
                    }}
                    ref={searchToolboxElm}
                >
                    {
                        isOpenSearch ?
                            <i aria-hidden className={classNames("fas fa-times", styles["toolbox-col__search--icon"])}></i>
                            :
                            <i aria-hidden className={classNames("fas fa-search", styles["toolbox-col__search--icon"])}></i>
                    }
                </div>
            </Col>
            {isBelowMediumDevice ?
                <NavCart />
                : 
                <>
                    <Col
                        xxl={7} xl={10} lg={0} md={0}
                        className={classNames(styles["toolbox-col"])}
                        ref={cartRef}
                    >
                        <Button
                            handleClick={(e) => {
                                e.preventDefault();
                                setShowAccountMenu(false);
                                setShowCartMenu(!showCartMenu);
                            }}
                            style={{
                                color: "#000",
                                fontSize: "14px",
                                border: "none",
                                padding: 0,
                                background: "transparent",
                            }}
                        >
                            <i aria-hidden className={classNames("fas fa-shopping-cart", styles["toolbox-col__icon"])}></i>
                            {!isBelowMediumDevice && <span className={styles["toolbox-col__text"]}>{cart.length} item(s)</span>}
                        </Button>

                        <CSSTransition
                            in={showCartMenu}
                            timeout={300}
                            classNames="swing-menu-animate"
                            unmountOnExit
                        >
                            <CartMenu cartList={cart} />
                        </CSSTransition>
                    </Col>
                    <Col
                        xxl={7} xl={10} lg={0} md={0}
                        className={classNames(styles["toolbox-col"])}
                        ref={accountRef}
                    >
                        <Button
                            handleClick={(e) => {
                                e.preventDefault();
                                setShowCartMenu(false);
                                setShowAccountMenu(!showAccountMenu)
                            }}
                            style={{
                                color: "#000",
                                fontSize: "14px",
                                border: "none",
                                padding: 0,
                                background: "transparent",
                            }}
                        >
                            <i aria-hidden className={classNames("fas fa-user", styles["toolbox-col__icon"])}></i>
                            {isLargeDevice &&
                                <span className={styles["toolbox-col__text"]}>
                                    {userInfo ? `Hello ${userInfo.fullName}` : 'Account'}
                                </span>
                            }
                        </Button>

                        <CSSTransition
                            in={showAccountMenu}
                            timeout={300}
                            classNames="swing-menu-animate"
                            unmountOnExit
                        >
                            <AccountMenu
                                isShow={showAccountMenu}
                                userInfo={userInfo}
                                style={{
                                    maxWidth: "200px",
                                    minWidth: "50px"
                                }}
                            />
                        </CSSTransition>
                    </Col>
                </>
            }
        </Row>
    )
}

const mapStateToProps = state => ({
    cart: state.storage.cart,
    userInfo: state.storage.userInfo,
})

const mapDispatchToProps = {
    getCart: storageActions.getCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbox);