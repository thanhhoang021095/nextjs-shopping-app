import React from 'react'
import IProduct from 'src/interfaces/product'
import styles from "./SearchInput.module.scss"
import { Image } from 'src/components/ui-kits/CustomImage'
import { useRouter } from 'next/router'

interface SearchItemResultProps {
    data: IProduct;
}

const SearchItemResult: React.FC<SearchItemResultProps> = ({ data }) => {
    const router = useRouter();
    return (
        <div className={styles["search-item"]} onClick={() => {
            router.push(`/product-detail/${data.id}`)
        }}>
            <div className={styles["search-item__image"]}>
                <Image
                    src={data.image_cover}
                    width="100%"
                    height="100%"
                    alt="product_image-cover"
                    style={{
                        width: "60px",
                        height: "60px",
                    }}
                />
            </div>
            <div className={styles["search-item__info"]}>
                <p className={styles["search-item__info--name"]}>{data.name}</p>
                <p className={styles["search-item__info--price"]}>${data.price}</p>
            </div>
        </div>
    )
}

export default SearchItemResult