import React, { useState, useRef, useEffect, forwardRef } from 'react'
import styles from './SearchInput.module.scss'
import { Button, Input, Row, Col } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import api from 'controllers/baseApi'
import SearchItemResult from "./SearchItemResult"

interface SearchProps {
    style?: Record<string, any>;
    searchToolboxElm?: React.RefObject<HTMLElement>;
}

const SearchInput: React.FC<SearchProps> = ({
    style = {},
    searchToolboxElm
},): JSX.Element => {
    const [searchText, setSearchText] = useState("");
    const [searchHistory, setSearchHistory] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [focused, setFocused] = React.useState(false)

    const inputElm = useRef(null);
    const searchContainerElm = useRef(null);
    const searchResultElm = useRef(null);

    useEffect(() => {
        const checkIfClickedOutside = (e: any): void => {
            if (
                !searchResultElm.current.contains(e.target) &&
                !searchContainerElm.current.contains(e.target)
                && !searchToolboxElm?.current?.contains(e.target)
            ) {
                setSearchList([]);
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [])

    useEffect(() => {
        if (searchText) {
            api.post("search", {
                keyword: searchText
            }).then((data: any) => {
                setSearchList(data);
                setSearchHistory(data);
            });
        } else {
            setSearchList([]);
            setSearchHistory([]);
        }
    }, [searchText]);

    useEffect(() => {
        focused && setSearchList([...searchHistory]);
    }, [focused]);

    const handleSearch = (e: any): void => {
        const text: string = e.target.value;
        setSearchText(text);
    }

    const handleSubmitSearch = (): void => {
        inputElm?.current && inputElm.current.focus();
    }

    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    return (
        <div
            className={styles["search-container"]}
            style={style}
            ref={searchContainerElm}
        >
            <div
                className={styles["search-section"]}
            >
                <Row justify="space-between" align='middle'>
                    <Col 
                        xxl={20}
                        xl={20}
                        lg={16}
                        md={18}
                        sm={20} 
                        xs={16}
                    >
                        <Input
                            ref={inputElm}
                            size="large"
                            className={classNames(
                                styles["search-section__input"],
                            )}
                            placeholder="Search entire store here"
                            prefix={
                                <SearchOutlined
                                    className={styles["search-section__input--icon"]}
                                />
                            }
                            value={searchText}
                            onChange={handleSearch}
                            onFocus={onFocus}
                            onBlur={onBlur}
                        />
                    </Col>
                    <Col 
                        xxl={4}
                        xl={4}
                        lg={8}
                        md={6}
                        sm={4} 
                        xs={8}
                        className={styles["search-section__right-col"]}>
                        <Button
                            type="primary"
                            size="large"
                            className={styles["search-section__button"]}
                            onClick={handleSubmitSearch}
                        >
                            Search
                        </Button>

                    </Col>
                </Row>

                {/* Search Result List */}
                <div>
                    <Row>
                        <Col
                            xxl={20}
                            xl={20}
                            lg={16}
                            md={18}
                            sm={20} 
                            xs={16}
                        >
                            <div
                                className={styles["search-section__result"]}
                                ref={searchResultElm}
                            >
                                <div className={styles["search-section__list"]}>
                                    {searchList.length ? searchList.map((item) => (
                                        <SearchItemResult key={item._id} data={item} />
                                    )) : <></>}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default SearchInput;

