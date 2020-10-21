import React from 'react';

import { 
    createStyles, 
    FormControl, 
    InputLabel, 
    makeStyles, 
    MenuItem, 
    Select as MUISelect,
    Theme 
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

interface IProps {
    menuItems: {
        value: string,
        text: string,
    }[],
    value: string,
    label: string,
    handleSelectChange: (event: React.ChangeEvent<{ value: unknown }>) => void,
}

const Select: React.FC<IProps> = ({ menuItems, handleSelectChange, value, label }) => {
    const classes = useStyles();

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="label">{label}</InputLabel>
            <MUISelect
                labelId="label"
                id="select"
                value={value}
                onChange={handleSelectChange}
                label="Table"
            >   
                {menuItems.map( ({ value, text }) => (
                    <MenuItem value={value} key={value}>{text}</MenuItem>
                ))}
            </MUISelect>
        </FormControl>
    );
}

export { Select };
