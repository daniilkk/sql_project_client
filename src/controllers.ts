import axios from 'axios';
import { RowsType, RowType } from './components/EnhancedTable';

const instance = axios.create({
    baseURL: 'http://134.209.94.17:5000/',
    timeout: 1000,
    responseType: "json",
    headers: {
        'content-type': 'text/plain',
    },
});

export type getAllTablesResponseType = string[];

const getAllTables = async () => {
    try {
        const response = await instance.get<getAllTablesResponseType>('/get_all_tables');
        return response.data;
    } catch (error) {
        console.dir(error);
    } 
};

export type getTableDataResponseType = {
    columns?: string[],
    rows: RowsType,
}

const getTableData = async (table: string) => {
    try {
        const response = await instance.post<getTableDataResponseType>('/show_table', {
            table,
        });
        return response.data;
    } catch (error) {
        console.dir(error);
    } 
};

export type deleteRowsResponseType = {
    'status': 'ok',
}

const deleteRows = async (ids: number[], table: string) => {
    try {
        const response = await instance.post<deleteRowsResponseType>('/delete_rows', {
            ids,
            table,
        });
        return response.data;
    } catch (error) {
        console.dir(error);
    } 
};

export type updateRowResponseType = {
    'status': 'ok',
}

const updateRow = async (table: string, id: number, newRowData: RowType) => {
    try {
        const response = await instance.post<updateRowResponseType>('/update_row', {
            table,
            values: {
                id,
                ...newRowData,
            }
        });
        return response.data;
    } catch (error) {
        console.dir(error);
    } 
};

export type insertRowResponseType = {
    'status': 'ok',
}

const insertRow = async (table: string, newRowData: RowType) => {
    try {
        const response = await instance.post<updateRowResponseType>('/insert_row', {
            table,
            values: {...newRowData}
        });
        return response.data;
    } catch (error) {
        console.dir(error);
    } 
};

export type refreshDBResponseType = {
    'status': 'ok',
}

const refreshDB = async () => {
    try {
        const response = await instance.get<deleteRowsResponseType>('/refresh_db');
        return response.data;
    } catch (error) {
        console.dir(error);
    } 
};

const search = async (table: string, column: string, request: string) => {
    try {
        const response = await instance.post<getTableDataResponseType>('/search', {
            table,
            column,
            request,
        });
        return response.data;
    } catch (error) {
        console.dir(error);
    } 
};

const query = async (proc: string) => {
    try {
        const response = await instance.post<any>('/query', {
            proc,
        });
        return response.data;
    } catch (error) {
        console.dir(error);
    } 
};

export type getAllRequestsResponseType = {
    text: string,
    proc_name: string,  
}[]

const getAllRequests = async () => {
    try {
        const response = await instance.get<getAllRequestsResponseType>('/get_all_query');
        return response.data;
    } catch (error) {
        console.dir(error);
    } 
};

export {
    getAllTables,
    getTableData,
    deleteRows,
    updateRow,
    insertRow,
    refreshDB,
    search,
    query,
    getAllRequests,
}
