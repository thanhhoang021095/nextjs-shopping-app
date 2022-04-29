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
interface CartProps {
    cart: any[];
    categoryWidth?: number;
}

const Toolbox: React.FC<CartProps> = ({ cart, categoryWidth = 0 }): JSX.Element => {
    const [isSearching, setIsSearching] = useState(false);
    const [showCartMenu, setShowCartMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const isLargeDevice = useMediaQuery({ query: '(min-width: 1280px)' });
    const cartRef = useRef(null);
    const accountRef = useRef(null);

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
        <Row className={styles["toolbox"]} justify="end">
            <Col
                xl={4} lg={4} md={6} sm={6}
                className={styles["toolbox-col"]}
            >
                <CSSTransition
                    in={isSearching}
                    timeout={300}
                    classNames="slide-animate"
                    unmountOnExit
                >
                    <SearchInput
                        style={{
                            width: `${categoryWidth}px`
                        }}
                        isSearching={isSearching} 
                    />
                </CSSTransition>
                <div
                    className={styles["toolbox-col__search"]}
                    onClick={() => {
                        setIsSearching(stateSearch => !stateSearch);
                    }}
                >
                    {
                        isSearching ?
                            <i aria-hidden className={classNames("fas fa-times", styles["toolbox-col__search--icon"])}></i>
                            :
                            <i aria-hidden className={classNames("fas fa-search", styles["toolbox-col__search--icon"])}></i>
                    }
                </div>
            </Col>
            <Col
                xl={6} lg={4} md={6} sm={4}
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
                    {isLargeDevice && <span className={styles["toolbox-col__text"]}>{cart.length} item(s)</span>}
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
                xl={6} lg={4} md={6} sm={4}
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
                    {isLargeDevice && <span className={styles["toolbox-col__text"]}>Account</span>}
                </Button>
                <CSSTransition
                    in={showAccountMenu}
                    timeout={300}
                    classNames="swing-menu-animate"
                    unmountOnExit
                >
                    <AccountMenu
                        isShow={showAccountMenu}
                        style={{
                            maxWidth: "200px",
                            minWidth: "50px"
                        }}
                    />
                </CSSTransition>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.storage.cart
    }
}

const mapDispatchToProps = {
    getCart: storageActions.getCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbox);