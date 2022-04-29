import React from 'react'
import { Breadcrumb } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import styles from "./Breadcrumb.module.scss"
import Link from 'next/link'

interface CustomBreadcrumbProps {
  list: {
    name: string;
    link: string;
  }[];
}

const CustomBreadcrumb:React.FC<CustomBreadcrumbProps> = ({ list = [] }):JSX.Element => {
  
  return (
    <div className={styles['custom-breadcrumb']}>
    <Breadcrumb separator=">">
        <Breadcrumb.Item>
          <Link href="/">
            <HomeOutlined />
          </Link>
        </Breadcrumb.Item>

        {list.length && list.map((item, idx) => 
          <Breadcrumb.Item key={idx}>
            {idx !== list.length ? 
              <Link href={`/${item.link}`}>
                {item.name}
              </Link>
              : 
              <>
                {item.name}
              </>
            }
          </Breadcrumb.Item>
        )}
    </Breadcrumb>
  </div>
  )
}

export default CustomBreadcrumb