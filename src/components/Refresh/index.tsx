import React from 'react';
import { Button } from '@material-ui/core';

interface IProps {
    onClick: () => void,
    className?: string,
}

const Refresh: React.FC<IProps> = ({onClick, className}) => {
    return (
        <Button
            className={className}
            size="large"
            color="secondary"
            variant="contained"
            onClick={onClick}
        >
            Refresh database
        </Button>
    );
}

export { Refresh }
