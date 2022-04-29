import React from "react";
import Image from 'next/image';
import styles from './CustomImage.module.scss'
interface CustomImageProps {
    width?: string;
    height?: string;
    src: string;
    layout?: any;
    alt?: string;
    style?: any;
    isHasOverlay?: boolean;
}

const CustomImage: React.FC<CustomImageProps> = ({
    width = "100%",
    height = "100%",
    src = "",
    layout = "",
    alt = "",
    style = {},
    isHasOverlay = false
}): JSX.Element => {
    return (
        <img
            className={styles["image"]}
            src={src}
            width={width}
            height={height}
            alt={alt}
            style={style}
        />
    )
}

export default CustomImage;