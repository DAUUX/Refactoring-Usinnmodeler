import React from 'react';
import Popover from '@mui/material/Popover';
import { Card, CardMedia } from '@mui/material';
import navigation from "./block_end.gif";


function TypeNavigations({nodeName, onChange, close, onClick, anchor}) {
    const open = Boolean(anchor);
    const id = open ? 'simple-popover' : undefined;
    
    const renderPointer = () => {
        switch (nodeName) {
            case "OpenPointDiagram":
                return(
                    <Card sx={{ width: 20, margin: 1, marginLeft:2, marginRight: 2 }}>
                        <CardMedia
                            component="img"
                            height="25"
                            image={navigation}
                        />
                    </Card>
                );
            default:
                break;
        }
    }

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchor}
            onClose={() => close()}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            TransitionProps={{
                timeout: 1000,
            }}
            >
           {renderPointer()}
        </Popover>
    );
}

export default TypeNavigations;