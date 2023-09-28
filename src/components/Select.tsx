
import { useSelectorStore } from '@/hooks';
import { Button, Chip, Color, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export const ComponentSelect = React.memo((
    {
        label,
        labelChip,
        title,
        onPressed,
        items = [],
        select = 'id',
        error = false,
        helperText,
        name,
        value,
        color
    }:
        {
            label: string | any,
            labelChip: any,
            title: string,
            onPressed: any,
            items?: any,
            select?: string,
            error?: boolean,
            helperText?: string,
            name?: string,
            value?: any,
            color?: any
        }) => {
    const { deselectOne } = useSelectorStore();
    const { selection = [] } = useSelector((state: any) => state.selections);

    const generateLabel = (data: Array<number>) => {
        return labelChip.map((key: number) => data[key]).join('-');
    };
    return (
        <>
            <>
                <div style={{ position: 'relative', paddingTop: '5px', marginBottom: '10px' }}>
                    <span
                        style={{
                            position: 'absolute',
                            top: -8,
                            left: 2,
                            backgroundColor: 'white',
                            padding: '2px',
                            zIndex: 1,
                        }}
                    >
                        {label}
                    </span>
                    <Button
                        variant="outlined"
                        color={error ? 'error' : 'primary'}
                        onClick={onPressed}
                        style={{
                            width: '100%',
                            paddingTop: '5px',
                            paddingBottom: '5px',
                            color: 'black',
                            textTransform: 'none',
                            zIndex: 0,
                            backgroundColor: color
                        }}
                    >
                        {title}
                    </Button>
                </div>
                {
                    items.length > 0 ?
                        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '8px' }}>
                            {[...items.filter((e: any) => selection.includes(e[select]))].map((data) => {
                                return (
                                    <Chip
                                        key={data.id}
                                        color="primary"
                                        label={generateLabel(data)}
                                        style={{ margin: '1px' }}
                                        onDelete={() => {
                                            deselectOne(data[select])
                                        }}
                                    />
                                );
                            })}
                        </div>
                        : <></>
                }
                {error && (
                    <Typography style={{ color: 'red', fontSize: '0.8rem', padding: '2px' }} >{helperText}</Typography>
                )}
            </>
        </>
    )
})
