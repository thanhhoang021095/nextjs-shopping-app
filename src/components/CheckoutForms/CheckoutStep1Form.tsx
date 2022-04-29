import React, { ChangeEvent } from 'react'
import styles from "./CheckoutForms.module.scss"
import { Row, Col, Radio, Space, Input } from "antd"
import { Button } from "../ui-kits/Button"

interface CheckoutStep1FormProps {
    handleSubmitOption: (value:string) => void;
}


const CheckoutStep1Form: React.FC<CheckoutStep1FormProps> = ({ handleSubmitOption = () => {} }): JSX.Element => {
    const [optionValue, setOptionValue] = React.useState("register");
    const [email, setEmail] = React.useState("");
    const [pass, setPass] = React.useState("");

    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>):void => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    const handleChangePass = (e: ChangeEvent<HTMLInputElement>):void => {
        e.preventDefault();
        setPass(e.target.value);
    }

    const handleChangeOption = (e: any):void => {
        setOptionValue(e.target.value);
    }

    const handleSubmitAsGuest = ():void => {
        optionValue && handleSubmitOption(optionValue);
    }

    return (
        <Row justify='space-between' gutter={16}>
            <Col sm={24} md={10} lg={10}>
                <div className={styles["checkout-step1-form"]}>
                    <h2>New Customer</h2>
                    <p>Checkout Options:</p>
                    <Radio.Group
                        onChange={handleChangeOption}
                        value={optionValue}
                    >
                        <Space direction="vertical">
                            <Radio value={"register"}>Register Account</Radio>
                            <Radio value={"guest"}>Guest Account</Radio>
                        </Space>
                    </Radio.Group>
                    <p>By creating an account you will be able to shop faster, be up to date on an order's status, and keep track of the orders you have previously made.</p>
                    <Button
                        style={{
                            padding: "18px 39px",
                            width: "fit-content"
                        }}
                        handleClick={handleSubmitAsGuest}
                    >
                        CONTINUE
                    </Button>
                </div>
            </Col>
            <Col sm={24} md={10} lg={10}>
                <div className={styles["checkout-step1-form"]}>
                    <h2>Returning Customer</h2>
                    <p>I am a returning customer</p>
                    <p>E-Mail</p>
                    <Input 
                        placeholder="Email" 
                        size='large'
                        value={email}
                        onChange={handleChangeEmail}
                    />
                    <p>Password</p>
                    <Input.Password 
                        size='large'
                        value={pass}
                        onChange={handleChangePass}
                        placeholder="Password" 
                    />
                    <p>Forgotten Password</p>
                    <Button
                        style={{
                            padding: "18px 39px",
                            width: "fit-content"
                        }}
                    >
                        LOGIN
                    </Button>
                </div>
            </Col>
        </Row>
    )
}

export default CheckoutStep1Form;