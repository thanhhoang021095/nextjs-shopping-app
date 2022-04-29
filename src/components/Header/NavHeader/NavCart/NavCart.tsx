import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import styles from './NavCart.module.scss'
import classNames from 'classnames'
import { CartMenu, AccountMenu } from "../../ToolBox/ToolboxMenu"
import storageActions from 'controllers/redux/actions/storageActions'
import { CSSTransition } from 'react-transition-group'

interface NavCartProps {
    cart: any[];
}

const NavCart: React.FC<NavCartProps> = ({ cart }): JSX.Element => {
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showCartMenu, setShowCartMenu] = useState(false);

    const accRef = useRef();
    const cartRef = useRef();

    useEffect(() => {
        return () => {
            setShowCartMenu(false);
            setShowAccountMenu(false);
        }
    }, [])

    useEffect(() => {
        const checkIfClickedOutside = (e: any): void => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            const accParentElm: any = accRef.current
            const cartParentElm: any = cartRef.current

            if (showAccountMenu && accRef.current && !accParentElm.contains(e.target)) {
                setShowAccountMenu(false);
            }
            if (showCartMenu && cartRef.current && !cartParentElm.contains(e.target)) {
                setShowCartMenu(false);
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
            // close popup when unmount 
        }
    }, [showAccountMenu, showCartMenu])

    return (
        <>
            <div
                className={styles["cart-dropdown"]}
                ref={cartRef}
            >
                <button
                    className={styles["cart-dropdown__button"]}
                    onClick={(e) => {
                        e.preventDefault();
                        setShowAccountMenu(false);
                        setShowCartMenu(!showCartMenu);
                    }}
                >
                    <i aria-hidden className={classNames("fas fa-shopping-cart", styles["cart-dropdown__button--icon"])}></i>
                    <p className={styles["cart-dropdown__button--total"]}>
                        {cart.length}
                    </p>
                </button>
                <CSSTransition
                    in={showCartMenu}
                    timeout={300}
                    classNames="swing-menu-animate"
                    unmountOnExit
                >
                    <CartMenu cartList={cart} />
                </CSSTransition>
            </div>

            <div
                className={styles["account-dropdown"]}
                ref={accRef}
            >
                <button
                    className={styles["account-dropdown__button"]}
                    onClick={(e) => {
                        e.preventDefault();
                        setShowCartMenu(false);
                        setShowAccountMenu(!showAccountMenu);
                    }}
                >
                    <i aria-hidden className={classNames("fas fa-cog", styles["account-dropdown__button--icon"])}></i>

                </button>
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
            </div>
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(NavCart);