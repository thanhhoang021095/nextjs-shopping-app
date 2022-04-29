import React, { useMemo } from 'react';
import classNames from 'classnames';
import storageActions from 'controllers/redux/actions/storageActions'
import CustomImage from 'src/components/ui-kits/CustomImage/CustomImage';
import styles from "./ToolboxMenu.module.scss";
import { connect } from "react-redux";
import IUser from 'src/interfaces/user';
import { sumPrice } from "src/utils/common";
import { Button } from 'src/components/ui-kits/Button'
import Router from 'next/router';

interface CartMenuProps {
  cartList: any[];
  removeFromCart?: (data: any, id: number) => void;
  userInfo?: IUser;
}

const CartMenu: React.FC<CartMenuProps> = ({ cartList, removeFromCart = () => { }, userInfo = null }): JSX.Element => {
  const removeCartItem = (data): void => {
    removeFromCart(data, userInfo?.id)
  }

  const totalPrice: any = useMemo(() => {
    return sumPrice(cartList);
  }, [cartList.length])

  return (
    <div className={classNames(
      styles["toolbox-popup"],
    )}
    >
      <div className={classNames(
        styles["cart-menu"])}
      >
        {cartList.length && cartList.map((item, idx) => (
          <div
            key={idx}
            className={styles["cart-menu-item"]}
          >
            <div className={styles["cart-menu-item__img"]}>
              <CustomImage src={item.image_cover} />
            </div>
            <div className={styles["cart-menu-item__content"]}>
              <p className={styles["cart-menu-item__content--name"]}>{item.name}</p>
              <p className={styles["cart-menu-item__content--qty"]}><span>&#9747;</span>{item.quantity}</p>
              <div className={styles["cart-menu-item__content--actions"]}>
                <p className={styles["cart-menu-item__content--price"]}>{`$${item.price * item.quantity}`}</p>
                <button
                  className={styles["cart-menu-item__content--delete"]}
                  onClick={() => removeCartItem(item)}
                >
                  <i
                    aria-hidden
                    className={classNames("fas fa-trash", styles["cart-menu-item__content--icon"])}
                  >
                  </i>
                </button>
              </div>
            </div>
          </div>
        ))}

        <div
          className={styles["cart-menu-total"]}
        >
          <p className={styles["cart-menu-total__title"]}>
            Total
          </p>
          <p className={styles["cart-menu-total__value"]}>
            {`$${totalPrice}`}
          </p>
        </div>

        <div
          className={styles["cart-menu-actions"]}
        >
          <Button
            handleClick={() => Router.push(`/cart`)}
            style={{
              background: "#000"
            }}
          >
            View Cart
          </Button>
          <Button
            handleClick={() => Router.push(`/checkout`)}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.storage.userInfo,
  }
}

const mapDispatchToProps = {
  removeFromCart: storageActions.removeFromCart
}
export default connect(mapStateToProps, mapDispatchToProps)(CartMenu);
