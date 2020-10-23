import axios from 'axios';
import { RowsType } from './components/EnhancedTable';

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
}

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
}

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
}

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
}

export {
    getAllTables,
    getTableData,
    deleteRows,
    refreshDB,
}
