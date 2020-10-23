import { getAllTablesResponseType, getTableDataResponseType } from "./controllers";


const transformMenuItems = (menuItems?: getAllTablesResponseType) => {
    if (!menuItems) return [];

    return menuItems.map( (menuItem) => ({
        text: menuItem,
        value: menuItem,
    }));
}

const emptyTable = {rowsProp: [], columns: undefined};

const transformTableData = (tableData?: getTableDataResponseType) => {
    if (!tableData) return emptyTable;

    return {
        rowsProp: tableData.rows,
        columns: tableData.columns?.map( (columnName) => ({
            name: columnName,
            type: typeof columnName,
        }))
    };
}

export {
    transformMenuItems,
    transformTableData,
}