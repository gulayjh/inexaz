import React, {useCallback, useState, useEffect} from 'react';
import {ISearchProps} from './search';
import {Form, Input} from 'antd';
import {useSearchStyles} from './search.style';
import {SearchIcon} from '../../../assets/images/icons/sign';

function SearchComponent({placeholder, handleSearch, searchText}: ISearchProps) {
    const {search, button} = useSearchStyles();
    const [searchField, setSearchField] = useState(searchText);

    const handleSearchField = useCallback(
        (e: any) => {
            setSearchField(e.target.value);
        },
        [searchField],
    );

    const handleSubmit = useCallback(
        () => {
            handleSearch(searchField);
        },
        [searchField],
    );

    useEffect(() => {
            handleSearch(searchField);

    }, [searchField]);


    return (
        <Form.Item className={search}>
            <Input placeholder={placeholder} onInput={handleSubmit} autoFocus={false}
                   suffix={<span className={button} onClick={handleSubmit}> <SearchIcon/>
            </span>} onChange={handleSearchField} value={searchField}/>
        </Form.Item>
    )
        ;
}

export default SearchComponent;
