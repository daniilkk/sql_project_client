import { getAllRequestsResponseType, getAllTablesResponseType, getTableDataResponseType } from "./controllers";
import { MenuItemsType, TableDataType } from "./pages/Main";


const transformMenuItems = (menuItems?: getAllTablesResponseType): MenuItemsType => {
    if (!menuItems) return [];

    return menuItems.map( (menuItem) => ({
        text: menuItem,
        value: menuItem,
    }));
}

const emptyTable = {rows: [], columns: undefined};

const transformTableData = (getTableDataResponse?: getTableDataResponseType) => {
    if (!getTableDataResponse) return emptyTable;

    return {
        rows: getTableDataResponse.rows,
        columns: getTableDataResponse.columns?.map( (columnName) => ({
            name: columnName,
            type: typeof columnName,
        }))
    };
}

const transformAutocompleteOptions = (column: string, tableData?: TableDataType) => {
    if (!tableData) return [];
    const options = tableData.rows.map( (row) => String(row[column]) );

    return Array.from(new Set(options));
}

const transformAllRequests = (res?: getAllRequestsResponseType) => {
    if (!res) return [];

    return res.map( ({text, proc_name}) => ({
        text,
        value: proc_name,
    }));
}

export {
    transformMenuItems,
    transformTableData,
    transformAutocompleteOptions,
    transformAllRequests
}
