import React, { useState, useRef, useEffect, forwardRef } from 'react'
import styles from './SearchInput.module.scss'
import { Button, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import api from 'controllers/baseApi'
import SearchItemResult from "./SearchItemResult"

interface SearchProps {
    isSearching: boolean;
    style?: Record<string, any>;
    setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
    searchToolboxElm?:  React.RefObject<HTMLElement>;
}

const SearchInput: React.FC<SearchProps> = ({ 
    isSearching, 
    style = {},
    setIsSearching,
    searchToolboxElm
 }, ): JSX.Element => {
    const [searchText, setSearchText] = useState("");
    const [inputWidth, setInputWidth] = useState("100%");
    const [searchList, setSearchList] = useState([]);
    const inputElm = useRef(null);
    const searchContainerElm = useRef(null);
    const searchResultElm = useRef(null);

    useEffect(() => {
        if (isSearching && inputElm?.current) {
            inputElm.current.focus();
            setInputWidth(inputElm.current.input.offsetParent.clientWidth);
        }
    }, []);

    useEffect(() => {
        const checkIfClickedOutside = (e: any): void => {
            if (isSearching && 
                !searchResultElm.current.contains(e.target) &&
                !searchContainerElm.current.contains(e.target) &&
                !searchToolboxElm.current.contains(e.target)
            ) {
                setIsSearching(stateSearch => !stateSearch);
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isSearching])

    useEffect(() => {
        if (searchText) {
            api.post("search", {
                keyword: searchText
            }).then((data: any) => setSearchList(data));
        } else {
            setSearchList([]);
        }
    }, [searchText])

    const handleSearch = (e: any): void => {
        const text: string = e.target.value;
        setSearchText(text);
    }

    const handleSubmitSearch = (): void => {
        if (searchText) {
        }
    }

    return (
        <div
            className={styles["search-container"]}
            style={style}
            ref={searchContainerElm}
        >
            <div
                className={styles["search-section"]}
                style={style}
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
                />

                <Button
                    type="primary"
                    size="large"
                    className={styles["search-section__button"]}
                    onClick={handleSubmitSearch}
                >
                    Search
                </Button>

                {/* Search Result List */}
                <div 
                    className={styles["search-section__result"]}
                    style={{ width: inputWidth }}
                    ref={searchResultElm}
                >
                    <div className={styles["search-section__list"]}>
                        {searchList.length ? searchList.map((item) => (
                            <SearchItemResult key={item._id} data={item} />
                        )) : <></>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchInput;

