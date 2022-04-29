import React, { useCallback, useEffect, useState } from 'react'
import IProduct from 'src/interfaces/product'
import styles from './ProductInfo.module.scss'
import classNames from 'classnames'
import { Select, InputNumber, Rate, Form } from 'antd'
import { Button } from 'src/components/ui-kits/Button'
import { connect } from 'react-redux'
import storageActions from 'controllers/redux/actions/storageActions'
import IUser from 'src/interfaces/user'
import { useRouter } from 'next/router'
import endpoint from "src/utils/endpoints";
import { copyObject, parseStringOptionValue } from 'src/utils/common'

type CustomProps = {
    reviewsNumber: number;
    productCode: string;
}
type ParamsProps = Partial<IProduct> & CustomProps;
interface ProductInfoProps extends ParamsProps {
    userInfo: IUser;
    data: IProduct;
    addToCart: <T>(data: T, id: number, option: Record<string, any>) => void;
    showToast: (mess: string, type: string) => void;
}

const { Option } = Select;

const ProductInfo: React.FC<ProductInfoProps> = ({
    name,
    brand,
    productCode,
    availability,
    price,
    sizes,
    colors,
    reviewsNumber,
    rateStar,
    data,
    userInfo,
    addToCart = () => undefined,
    showToast = () => undefined,
}): JSX.Element => {
    const [quantity, setQuantity] = useState(1);
    const router = useRouter();
    const [form] = Form.useForm();

    const handleChangeQty = (value: number): void => {
        setQuantity(value);
    }

    const handleSubmitFormOption = useCallback((sizeParam: string, colorParam: string, quantity: number): void => {
        const [sizeName, sizePrice] = parseStringOptionValue(sizeParam);
        const sizeData = {
            name: sizeName,
            sub_price: +sizePrice
        }
        const [colorName, colorPrice] = parseStringOptionValue(colorParam);
        const colorData = {
            name: colorName,
            sub_price: +colorPrice
        }
        const newData = copyObject(data);
        delete newData.colors;
        delete newData.sizes;
        userInfo?.id && addToCart(newData, userInfo.id, {
            specificQty: quantity,
            size: sizeData,
            color: colorData,
        });
        showToast(`You have added ${newData.name} to your shopping cart!`, "success");
        const resetTimer = setTimeout(() => {
            setQuantity(1);
            form.resetFields();
            clearTimeout(resetTimer);
        }, 0)
    }, [form.getFieldValue("color"), form.getFieldValue("size"), quantity])

    const handleAddToCart = (): void => {
        if (!userInfo?.id && !userInfo) {
            router.push(`/${endpoint["login"]}`);
        } else {
            const colorVal = form.getFieldValue("color");
            const sizeVal = form.getFieldValue("size");
            if (colorVal && sizeVal) {
                handleSubmitFormOption(sizeVal, colorVal, quantity);
            }
        }
    }

    return (
        <div className={styles['content']}>
            <h2 className={classNames("font-h2", styles['content__name'])}>
                {name}
            </h2>

            <p className={styles['content__short-info']}>
                Brand: {brand}
            </p>
            <p className={styles['content__short-info']}>
                Product Code: {productCode}
            </p>
            <p className={styles['content__short-info']}>
                Availability: {availability ? "In Stock" : "Out of Stock"}
            </p>
            <p className={styles['content__price']}>
                ${price.toFixed(2)}
            </p>
            <hr className={styles['content__divider']} />
            <h3 className={classNames("font-h3", styles['content__options'])}>
                available options
            </h3>
            <Form
                name="ProductInfoForm"
                form={form}
                layout="vertical"
                autoComplete="off"
                onFinish={() => { }}
                onFinishFailed={(errorInfo: any) => console.log('Failed:', errorInfo)}
                className={styles["product-info-form"]}
            >
                <Form.Item
                    name="size"
                    label="SIZE "
                    rules={[
                        {
                            required: true,
                            message: 'Select your size',
                        },
                    ]}
                    initialValue=""
                    className={styles["product-info-form__item"]}
                >
                    <Select
                        className={styles['product-info-form__item--select']}
                        size="large"
                        dropdownStyle={{
                            backgroundColor: "#f6f6f6",
                        }}
                        style={{
                            width: "100%",
                            color: "#000"
                        }}
                        onChange={(value) => {
                            form.setFieldsValue((option) => ({
                                ...option,
                                size: value
                            }))
                        }}
                        value={form.getFieldValue("size")}
                    >
                        <Option value="">--- Please Select ---</Option>
                        {sizes.length && sizes.map((size, idx) => (
                            <Option
                                key={`${size.name}_${idx}`}
                                value={`${size.name}_${size.sub_price}`}
                            >
                                {`${size.name} +($${size.sub_price})`}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
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
                    className={styles["product-info-form__item"]}
                >
                    <Select
                        className={styles['product-info-form__item--select']}
                        size="large"
                        dropdownStyle={{
                            backgroundColor: "#f6f6f6",
                        }}
                        style={{
                            width: "100%",
                            color: "#000",
                        }}
                        onChange={(value) => {
                            form.setFieldsValue((option) => ({
                                ...option,
                                color: value
                            }))
                        }}
                        value={form.getFieldValue("color")}
                    >
                        <Option value="">--- Please Select ---</Option>
                        {colors.length && colors.map((color, idx) => (
                            <Option
                                key={`${color.name}_${idx}`}
                                value={`${color.name}_${color.sub_price}`}
                            >
                                {`${color.name} +($${color.sub_price})`}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* <Space> */}
                <div className={styles["product-info-form__submit"]}>
                    <InputNumber
                        size="middle"
                        keyboard={false}
                        min={1}
                        max={500}
                        style={{ width: 60 }}
                        defaultValue={1}
                        value={quantity}
                        onChange={handleChangeQty}
                        className={styles["product-info-form__submit--input-number"]}
                    />
                    {/* </Space> */}

                    <Form.Item style={{ marginBottom: 0}}>
                        <Button
                            handleClick={handleAddToCart}
                            style={{
                                padding: "18px 39px",
                                fontSize: "12px",
                                width: "fit-content",
                                height: "50px",
                                fontWeight: 700,
                                boxSizing: "border-box",
                                textTransform: "uppercase",
                                marginLeft: "10px",
                            }}
                        >
                            Add To Cart
                        </Button>
                    </Form.Item>
                </div>
            </Form>

            <div className={styles['content__rate']}>
                <Rate disabled defaultValue={rateStar} />
            </div>
            <div className={styles['content__review']}>
                <p>{reviewsNumber} reviews</p>
            </div>
            <hr className={styles['content__divider']} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.storage.userInfo,
    }
}

const mapDispatchToProps = {
    addToCart: storageActions.addToCart,
    showToast: storageActions.showToast,
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo);
