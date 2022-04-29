import React, { ChangeEvent } from 'react'
import styles from "./CheckoutForms.module.scss"
import { Row, Col, Input, Form, Checkbox } from "antd"
import { Button } from "../ui-kits/Button"

interface CheckoutStep1FormProps {
    handleSubmitOption: (value: string) => void;
}


const CheckoutStep2Form: React.FC<CheckoutStep1FormProps> = ({ handleSubmitOption = () => { } }): JSX.Element => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row justify='space-between' gutter={16}>
            <Col sm={24} md={10} lg={10}>
                <p className={styles['checkout-step2-title']}>
                    Your Personal Details
                </p>
                <Form
                    name="info"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[{ required: true, message: 'First Name must be between 1 and 32 characters!' }]}
                    >
                        <Input
                            placeholder='First Name'
                        />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: 'Last Name must be between 1 and 32 characters!' }]}
                    >
                        <Input
                            placeholder='Last Name'
                        />
                    </Form.Item>

                    <Form.Item
                        label="E-Mail"
                        name="email"
                        rules={[{ required: true, message: 'E-Mail address does not appear to be valid!' }]}
                    >
                        <Input
                            placeholder='E-Mail'
                        />
                    </Form.Item>

                    <Form.Item
                        label="Telephone"
                        name="telephone"
                        rules={[{ required: true, message: 'Telephone must be between 3 and 32 characters!' }]}
                    >
                        <Input
                            placeholder='Telephone'
                        />
                    </Form.Item>

                    {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button >
                            Submit
                        </Button>
                    </Form.Item> */}
                </Form>

                <p className={styles['checkout-step2-title']}>
                    Your Password
                </p>
                <Form
                    name="password"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Password must be between 4 and 20 characters!' }]}
                    >
                        <Input.Password 
                            placeholder='Password'
                        />
                    </Form.Item>
                    <Form.Item
                        label="Password Confirm"
                        name="passwordConfirm"
                        rules={[{ required: true, message: 'Password must be between 4 and 20 characters!' }]}
                    >
                        <Input.Password 
                            placeholder='Password Confirm'
                        />
                    </Form.Item>

                    <Form.Item name="newsletter" valuePropName="checked" style={{ marginBottom : 0 }}>
                        <Checkbox>I wish to subscribe to the BJeans newsletter.</Checkbox>
                    </Form.Item>
                    <Form.Item name="delivery" valuePropName="checked" style={{ marginBottom : 0 }}>
                        <Checkbox>My delivery and billing addresses are the same.</Checkbox>
                    </Form.Item>
                </Form>

            </Col>
            <Col sm={24} md={10} lg={10}>
                <p className={styles['checkout-step2-title']}>
                    Your Address
                </p>
            </Col>
        </Row>
    )
}

export default CheckoutStep2Form;