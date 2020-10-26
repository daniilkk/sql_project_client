import React from 'react';

import { createStyles, makeStyles } from '@material-ui/core/styles';

import {
    Container,
    CssBaseline,
    Button,
    Box,
} from '@material-ui/core';

import { EnhancedTable } from '../../components/EnhancedTable';
import { Select } from '../../components/Select';

import { getAllRequests, query} from '../../controllers';
import { transformAllRequests,  transformTableData } from '../../transfromers';
import { TableDataType, MenuItemsType } from '../Main';

const useStyles = makeStyles(() =>
    createStyles({
        requestControl: {
            margin: '50px 0',
            position: 'relative',
        },
        button: {
            margin: '12px 0 0 100px',
        },
    }),
);

const emptyTable: TableDataType = {rows: [], columns: undefined};

const Special: React.FC = () => {
    const classes = useStyles();
    
    const [selectedRequest, setSelectedRequest] = React.useState<string>('Player');
    const [requestTypesMenuItems, setRequestTypesMenuItems] = React.useState<MenuItemsType>([]);

    const [tableData, setTableData] = React.useState<TableDataType>(emptyTable);
    const [tableName, setTableName] = React.useState<string>('Player');

    React.useEffect(() => {
        getAllRequests().then( (res) => {
            setRequestTypesMenuItems(transformAllRequests(res));
        });
    }, []);

    const handleSelectTable = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedRequest(event.target.value as string);
    };

    const requestTable = () => {
        query(selectedRequest).then( (res) => {
            setTableData(transformTableData(res));
            setTableName(selectedRequest);
        });
    };

    return (
        <>
            <CssBaseline />
            <Container maxWidth="md">
                <Box
                    className={classes.requestControl}
                >
                    <Select 
                        menuItems={requestTypesMenuItems}
                        value={selectedRequest}
                        label="Request"
                        handleSelectChange={handleSelectTable}
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
                </Box>
                <EnhancedTable columns={tableData.columns} rowsProp={tableData.rows} tableName={tableName} requestTable={requestTable}/>
            </Container>
        </>
    );
}

export { Special };
