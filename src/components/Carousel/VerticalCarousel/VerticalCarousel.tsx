import React, { useEffect, useRef, useState, useLayoutEffect } from 'react'
import styles from './VerticalCarousel.module.scss'
import classNames from 'classnames';
import { UpOutlined, DownOutlined } from '@ant-design/icons'

interface VerticalCarouselProps {
    data: string[];
    renderProps: any;
    handleClick: any;
    activeItem: {
        id: string;
        img: string;
    };
    style?: Record<string, any>;
    genImgUniqueId?: (idx: number) => string;
}

const VerticalCarousel: React.FC<VerticalCarouselProps> = ({
    data,
    renderProps,
    handleClick,
    activeItem,
    style = {},
    genImgUniqueId = () => ""
}): JSX.Element => {
    const [scrollVal, setScrollVal] = useState(0);

    const parentElm = useRef(null);
    const containerElm = useRef(null);
    const scrollElm = useRef(null);

    const handleChooseUpItem = (): void => {
        const elmHeightVal = scrollElm.current.clientHeight
        if (scrollVal <= 0) {
            if (Math.abs(scrollVal) > elmHeightVal) {
                setScrollVal(scrollVal + elmHeightVal);
            } else {
                setScrollVal(0);
            }
        }
    }

    const handleChooseDownItem = (): void => {
        const scrollHeightVal: number = parentElm.current.clientHeight;
        const containerHeightVal: number = containerElm.current.clientHeight;
        const elmHeightVal = scrollElm.current.clientHeight
        const downVal = scrollHeightVal - containerHeightVal - Math.abs(scrollVal);
        if (downVal >= 0) {
            if (downVal - elmHeightVal >= 0) {
                setScrollVal(scrollVal - elmHeightVal);
            } else {
                setScrollVal(scrollVal - downVal);
            }
        }
    }

    return (
        <div
            className={styles["vertical-carousel"]}
            style={style}
        >
            <section className={styles["vertical-carousel__outer"]}>
                <div className={styles["vertical-carousel__outer--wrapper"]}>
                    <button
                        className={styles["carousel-button"]}
                        onClick={handleChooseUpItem}
                    >
                        <UpOutlined />
                    </button>

                    <div className={styles["carousel-content"]}
                        ref={containerElm}
                    >
                        <div
                            className={styles["carousel-slide"]}
                        >
                            <div
                                className={styles["carousel-slide__inner"]}
                                ref={parentElm}
                            >
                                {data.length && data.map((item, idx) => (
                                    <div
                                        ref={idx == 0 ? scrollElm : null}
                                        className={classNames(
                                            styles["carousel-item"],
                                            { [styles["last-item"]]: idx === data.length - 1 },
                                            { [styles["first-item"]]: idx === 0 },
                                            { [styles["active-item"]]: item === activeItem.img && genImgUniqueId(idx) == activeItem.id }
                                        )}
                                        key={idx}
                                        style={{
                                            transform: `translateY(${scrollVal}px)`,
                                            transition: "all .3s ease",
                                            scrollBehavior: "smooth"
                                        }}
                                        onClick={() => handleClick({
                                            id: genImgUniqueId(idx),
                                            img: item
                                        })}
                                    >
                                        {renderProps(item)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        className={styles["carousel-button"]}
                        onClick={handleChooseDownItem}
                    >
                        <DownOutlined />
                    </button>
                </div>
            </section>
        </div>
    )
}

export default VerticalCarousel;