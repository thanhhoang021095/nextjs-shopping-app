import React, { useCallback, useEffect } from 'react'
import { Form, Row, Col, Select } from 'antd'
import { Modal } from "./index"
import styles from "./CustomModal.module.scss"
import { Button } from 'src/components/ui-kits/Button'
import { connect } from 'react-redux'
import storageActions from 'controllers/redux/actions/storageActions'
import IUser from 'src/interfaces/user'
import IProduct from 'src/interfaces/product'
import { copyObject, parseStringOptionValue } from 'src/utils/common'

const { Option } = Select;

interface ProductOptionModalProps {
    showModal: (status: boolean, data?: Partial<IProduct>) => void;
    modal: {
        status: boolean;
        data?: Partial<IProduct>
    };
    userInfo: IUser;
    showToast: (mess: string, type: string) => void;
    addToCart: <T>(data: T, id: number, option: Record<string, any>) => void;

};

const ProductOptionModal: React.FC<ProductOptionModalProps> = ({
    showModal = () => undefined,
    showToast = () => undefined,
    modal = null,
    addToCart = () => undefined,
    userInfo = null,
}): JSX.Element => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {};

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const handleSubmitModal = useCallback(() => {
        const colorVal = form.getFieldValue("color");
        const sizeVal = form.getFieldValue("size");
        if (colorVal && sizeVal && modal.data) {
            const [sizeName, sizePrice] = parseStringOptionValue(form.getFieldValue("size"));
            const sizeData = {
                name: sizeName,
                sub_price: +sizePrice
            }
            const [colorName, colorPrice] = parseStringOptionValue(form.getFieldValue("color"));
            const colorData = {
                name: colorName,
                sub_price: +colorPrice
            }
            const newData = copyObject(modal.data);
            delete newData.colors;
            delete newData.sizes;
            userInfo?.id && addToCart(newData, userInfo.id, {
                size: sizeData,
                color: colorData,
            })
            showModal(false);
            showToast(`You have added ${newData.name} to your shopping cart!`, "success");
        }
    }, [form.getFieldValue("size"), form.getFieldValue("color")])

    useEffect(() => {
        if (!modal.status) {
            const resetFormTimer = setTimeout(() => {
                form.resetFields();
                clearTimeout(resetFormTimer);
            }, 100);
        }
    }, [modal.status])

    return (
        <Modal modalTitle="AVAILABLE OPTIONS">
            <div className={styles["product-modal-container"]}>
                <Form
                    name="ProductOptionModal"
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    className={styles["product-modal-form"]}
                    labelCol={{
                        span: 24,
                        style: {
                          "textAlign": "center",
                          "fontSize": "12px"
                        }
                    }}
                >
                    <Form.Item
                        name="color"
                        label="COLOR "
                        rules={[
                            {
                                required: true,
                                message: 'Select your color',
                            },
                        ]}
                        initialValue=""
                        className={styles["product-modal-form__item"]}
                    >
                        <Select
                            onChange={(value) => {
                                form.setFieldsValue((option) => ({
                                    ...option,
                                    color: value
                                }))
                            }}
                            value={form.getFieldValue("color")}
                            style={{ width: "100%", textAlign: "left", backgroundColor: "#f6f6f6" }}
                            bordered={false}
                            dropdownStyle={{
                                backgroundColor: "#f6f6f6",
                            }}
                        >
                            <Option value="">--- Please Select ---</Option>
                            {modal.data?.colors?.length && modal.data.colors.map((item, idx) => (
                                <Option key={idx} value={`${item.name}_${item.sub_price}`}>{item.name} (+${item.sub_price})</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="size"
                        label="SIZE"
                        rules={[
                            {
                                required: true,
                                message: 'Select your size',
                            },
                        ]}
                        initialValue=""
                    >
                        <Select
                            onChange={(value) => {
                                form.setFieldsValue((option) => ({
                                    ...option,
                                    size: value
                                }))
                            }}
                            style={{ width: "100%", textAlign: "left", backgroundColor: "#f6f6f6" }}
                            dropdownStyle={{
                                backgroundColor: "#f6f6f6",
                            }}
                            bordered={false}
                            value={form.getFieldValue("size")}
                        >
                            <Option value="">--- Please Select ---</Option>
                            {modal.data?.sizes?.length && modal.data.sizes.map((item, idx) => (
                                <Option key={idx} value={`${item.name}_${item.sub_price}`}>{item.name} (+${item.sub_price})</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Row justify="center">
                        <Col span={24}>
                            <Button
                                handleClick={handleSubmitModal}
                                style={{
                                    padding: "18px 39px",
                                    fontSize: "12px",
                                    width: "fit-content",
                                    height: "50px",
                                    fontWeight: 700,
                                    boxSizing: "border-box",
                                    textTransform: "uppercase",
                                    margin: "0 auto",
                                }}
                            >
                                Add To Cart
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Modal>
    )
}

const mapStateToProps = state => ({
    modal: state.storage.modal,
    userInfo: state.storage.userInfo,
});

const mapDispatchToProps = {
    showModal: storageActions.showModal,
    addToCart: storageActions.addToCart,
    showToast: storageActions.showToast,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductOptionModal);