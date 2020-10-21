import React from 'react';
import { Button } from '@material-ui/core';

interface IProps {
    clearTable: () => void,
    className?: string,
}

const DropDatabase: React.FC<IProps> = ({clearTable, className}) => {
    const [emptyFlag, setEmptyFlag] = React.useState(false);

    const handleDropClick = () => {
        clearTable();
        setEmptyFlag(!emptyFlag);
    }

    const handleRecoverClick = () => {
        setEmptyFlag(!emptyFlag);
    }

    return (
        <Button
            className={className}
            size="large"
            color={!emptyFlag ? 'secondary' : 'primary'}
            variant="contained"
            onClick={!emptyFlag ? handleDropClick : handleRecoverClick}
        >
            {!emptyFlag ? 'Drop database' : 'Recover database'}
        </Button>
    );
}

export { DropDatabase }
