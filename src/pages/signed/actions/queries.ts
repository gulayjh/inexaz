import {useQuery} from 'react-query';
import {getSessions} from './table.service';

export const useGetSession = (searchFin: string, current: number, signed: boolean) => {
    return useQuery<any[], Error>(['employeeCompanies', [searchFin, current, signed]], () => {
        return getSessions(searchFin, current, signed);
    }, {staleTime: Infinity, retry: false});
};
