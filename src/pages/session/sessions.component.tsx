
import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {useUserStyles} from './sessions.style';
import {useParams} from 'react-router-dom';
import {environment} from '../../core/configs/app.config';


function SessionComponent() {
    const [searchField, setSearchField] = useState('');
    const [current, setCurrent] = useState<number>(1);
    //const {data, isLoading} = useGetUser(searchField, current);
    const {list, title} = useUserStyles();

    const { id } = useParams<{ id: string }>();

    return (
        <div>
            {environment.applicationDomain}
            {id}

        </div>
    );
}

export default SessionComponent;
