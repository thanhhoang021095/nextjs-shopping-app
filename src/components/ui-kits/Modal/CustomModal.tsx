import React, { ReactElement, useEffect, useState } from 'react'
import styles from "./CustomModal.module.scss"
import { Modal, Typography, Space } from 'antd'

import { connect } from "react-redux"
import storageActions from 'controllers/redux/actions/storageActions'

const { Title } = Typography;

type modalData = Record<string, any>;

interface CustomModalProps {
    showToast?: (mess: string, type: string) => void;
    cbSubmitModal?: () => void;
    modal: {
        status: boolean,
        data: modalData
    };
    modalTitle: string;
    showModal: (status: boolean, data?: modalData) => void;
    children: ReactElement
}

const CustomModal: React.FC<CustomModalProps> = ({
    showModal = () => undefined,
    cbSubmitModal = () => undefined,
    modal = null,
    modalTitle = "",
    children
}): JSX.Element => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    const handleSubmitModal = (): void => {
        cbSubmitModal()
    }

    const handleCancelModal = (): void => {
        showModal(false);
    }
    return ( isMounted &&
        <Modal
            centered
            forceRender
            closable
            visible={modal.status}
            footer={null}
            onOk={handleSubmitModal}
            onCancel={handleCancelModal}
            className={styles["custom-modal"]}
        >
            <>
                <Space align='center' className={styles["custom-modal__title"]}>
                    <Title level={4}>{modalTitle}</Title>
                </Space>
                {children}
            </>
        </Modal>
    )
}

const mapStateToProps = state => ({
    modal: state.storage.modal
})

const mapDispatchToProps = {
    showModal: storageActions.showModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomModal);
