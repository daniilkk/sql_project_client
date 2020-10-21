import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import {
    Container,
    CssBaseline,
    Button,
    Box,
} from '@material-ui/core';

import { DataTable } from '../../components/DataTable';
import { Select } from '../../components/Select';
import { DropDatabase } from '../../components/DropDatabase';

const useStyles = makeStyles(() =>
    createStyles({
        requestControl: {
            margin: '50px 0',
            position: 'relative',
        },
        button: {
            margin: '12px 0 0 100px',
        },
        dropDatabaseButton: {
            position: 'absolute',
            right: '0',
            marginTop: '12px',
        },
    }),
);

function createData(name: string, calories: number, fat: number, carbs: number, protein: number, lol: number) {
    return { name, calories, fat, carbs, protein, lol };
}
    
const rows = [
    createData('Frozen yoghurt',     159, 6.0,  24, 4.0, 12),
    createData('Ice cream sandwich', 237, 9.0,  37, 4.3, 12),
    createData('Eclair',             262, 16.0, 24, 6.0, 123),
    createData('Cupcake',            305, 3.7,  67, 4.3, 123),
    createData('Gingerbread',        356, 16.0, 49, 3.9, 123123),
    createData('Ecladir',            262, 16.0, 24, 6.0, 123),
    createData('Cupcafke',           305, 3.7,  67, 4.3, 123),
    createData('Gingesrbread',       356, 16.0, 49, 3.9, 123123),
];

const columns = [
    { name: 'name',      type: 'string' },
    { name: 'calories',  type: 'number' },
    { name: 'fat',       type: 'number' },
    { name: 'carbs',     type: 'number' },
    { name: 'protein',   type: 'number' },
    { name: 'lol',       type: 'number' },
];

const menuItems = [
    {text: 'Frex', value: 'player'},
    {text: 'Frul', value: 'frul'},
    {text: 'Hobot', value: 'hobot'},
    {text: 'Huy', value: 'huy'},
    {text: 'Drap', value: 'trap'},
    {text: 'Shprot', value: 'shprot'},
    {text: 'Drap', value: 'drap'},
];

const emptyTable = {rows: undefined, columns: undefined};

interface ITableData {
    columns?: {name: string, type: string}[],
    rows?: {[key: string]: number | string}[],
}

const SelectAll: React.FC = () => {
    const classes = useStyles();
    const [tableType, setTableType] = React.useState('player');
    const [tableData, setTableData] = React.useState<ITableData>(emptyTable);

    const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setTableType(event.target.value as string);
    };

    const requestTable = () => {
        console.log(tableType);
        setTableData({rows, columns});
    };

    const clearTable = () => {
        setTableData(emptyTable);
    }

    return (
        <>
            <CssBaseline />
            <Container maxWidth="md">
                <Box
                    className={classes.requestControl}
                >
                    <Select 
                        menuItems={menuItems}
                        value={tableType}
                        label="Table"
                        handleSelectChange={handleSelectChange}
                    />
                    <Button
                        size="large"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={requestTable}
                    >
                        Select
                    </Button>
                    <DropDatabase clearTable={clearTable} className={classes.dropDatabaseButton}/>
                </Box>
                <DataTable {...tableData} />
            </Container>
        </>
    );
}

export { SelectAll };
