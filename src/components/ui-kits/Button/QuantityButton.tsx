import React, { useEffect, useState } from 'react'
import IProduct from '../../../interfaces/product'
import api from '../../../../controllers/baseApi'
import endpoint from '../../../utils/endpoints'
import { connect } from 'react-redux'
import { Button } from '../Button'
import storageActions from '../../../../controllers/redux/actions/storageActions'
import IUser from '../../../interfaces/user'
import { StyledQuantityButtonGroup, StyledQuantityButtonValue } from './Button.styled'
import { IconButton } from '../IconButton'
import Router from "next/router"

interface QuantityButtonProps {
  userInfo: IUser;
  cart: any[];
  productId: number;
  quantity: number;
  updateQtyCart: (prodData: any, id: number, actionType:string) => void;
}

const QuantityButton: React.FC<QuantityButtonProps> = ({
  userInfo,
  cart,
  productId,
  quantity = 1,
  updateQtyCart,
}): JSX.Element => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const data:IProduct = cart.length ? cart.find(item => item.id == productId) : null;
    setProduct(data);
  }, [cart])
  
  const changeQuantity = (actionType = 'increase'): void => {
    // const token:string = JSON.parse(localStorage.getItem("access_token")) ?? "";
    if (userInfo && product) {
      const prodData = !product.hasOwnProperty("quantity") ? {...product, quantity: 0 } : {...product}
      updateQtyCart(prodData, userInfo?.id, actionType)
    } 
    // else {
    //   Router.push("/auth/login")
    // }
  }

  return (
    <StyledQuantityButtonGroup>
      <Button 
        style={{
          width: "30px",
          height: "25px",
          padding: 0
        }} 
        handleClick={() => changeQuantity('increase')}
      >
        +
      </Button>
      <StyledQuantityButtonValue>{quantity ?? 0}</StyledQuantityButtonValue>
      <Button 
        style={{
          width: "30px",
          height: "25px",
          padding: 0
        }}  
        handleClick={() => changeQuantity('decrease')}
      >
        -
      </Button>
      <IconButton 
        width="20px" 
        height="20px" 
        img="/images/icons/remove.png" 
        imageStyle={`padding: 0; margin-left: 20px`} 
        handleClick={() => changeQuantity('remove')} 
      />
    </StyledQuantityButtonGroup>
  )
}

const mapStateToProps = (state) => {
  return {
    cart: state.storage.cart,
    userInfo: state.storage.userInfo,
  }
}

const mapDispatchToProps = {
  getUserInfo: storageActions.getUserInfo,
  updateQtyCart: storageActions.updateQtyCart,
}
export default connect(mapStateToProps, mapDispatchToProps)(QuantityButton)
