import React from 'react';
import clsx from 'clsx';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

import {
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
    lighten,
} from '@material-ui/core';

const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
        },
        highlight:
            theme.palette.type === 'light'
                ? {
                    color: theme.palette.secondary.main,
                    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
                }
                : {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.secondary.dark,
                },
        title: {
            flex: '1 1 100%',
        },
    }),
);

type EnhancedTableToolbarProps = {
    unselect: () => void,
    numSelected: number,
    selected: number[],
    editingId: number | null,
    tableName: string,
    tooltipsClicks: {
        delete: (ids: number[]) => void,
        add: () => void,
        edit: (id: number) => void,
        save: () => void,
        addSave: () => void,
    }
}
  
const EnhancedTableToolbar: React.FC<EnhancedTableToolbarProps> = ({
    unselect,
    selected,
    tableName,
    numSelected,
    tooltipsClicks,
    editingId,
}) => {
    const classes = useToolbarStyles();
  
    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    {tableName}
                </Typography>
            )}
            {numSelected > 1 ? (
                <Tooltip
                    title="Delete"
                    onClick={() => {
                        tooltipsClicks.delete(selected);
                        unselect();
                    }}
                >
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : numSelected === 1 ? (
                <>
                    {editingId !== null 
                    ?   <Tooltip
                            title="Save"
                            onClick={() => {
                                tooltipsClicks.save();
                            }}
                        >
                            <IconButton aria-label="save">
                                <SaveIcon />
                            </IconButton>
                        </Tooltip>
                    :   <Tooltip
                            title="Edit row"
                            onClick={() => {
                                tooltipsClicks.edit(selected[0]);
                            }}
                        >
                            <IconButton aria-label="edit">
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    }
                    <Tooltip
                        title="Delete"
                        onClick={() => {
                            tooltipsClicks.delete(selected);
                            unselect();
                        }}
                    >
                        <IconButton aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </>
            ) : editingId !== null ? (
                <Tooltip
                    title="Save new row"
                    onClick={() => {
                        tooltipsClicks.addSave();
                    }}
                >
                    <IconButton aria-label="save">
                        <SaveIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip 
                    title="Add row"
                    onClick={() => {
                        tooltipsClicks.add();
                    }}
                >
                    <IconButton aria-label="add">
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

export default EnhancedTableToolbar;
