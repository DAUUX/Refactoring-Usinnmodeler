import React from 'react';
import Popover from '@mui/material/Popover';
import { Card, Grid} from '@mui/material';
import navigation from "./navigation.png";
import transition from "./transition.png";
import unsucessFeedback from "./unsucessFeedback.png"
import sucessFeedback from "./sucessFeedback.png";
import query from "./query.png";
import cancel from "./cancel.png";
import { useModeler } from "../../../../context/modelerContext";

function TypeNavigations({close, anchor}) {
    const open = Boolean(anchor);
    const id = open ? 'simple-popover' : undefined;

    const {setCurrentEdge} = useModeler()
    

    const onSelect = (typeEdge) => {
        setCurrentEdge(typeEdge);
        close();
    }

    const renderPointer = () => {
        return(
            <Grid container flexDirection={'column'}>
                <Grid container justifyContent="space-between" alignItems="center" style={{cursor: 'pointer'}} onClick={() => onSelect("navigation")}>
                    <Card sx={{ width: 20, margin: 1 }}>
                        <img
                            component="img"
                            height={10}
                            width={20}
                            src={navigation}
                        />
                    </Card>
                    <span style={{ marginLeft: '1px', marginRight: '10px', fontSize: 12 }}>Navegação</span>
                </Grid>
                <Grid container justifyContent="space-between" alignItems="center" onClick={() => onSelect("transition")}>
                    <Card sx={{ width: '20', margin: 1 }}>
                        <img
                            component="img"
                            height={10}
                            width={20}
                            src={transition}
                        />
                    </Card>
                    <span style={{ marginLeft: '1px', marginRight: '10px', fontSize: 12 }}>Transição do Usuário</span>
                </Grid>
                <Grid container justifyContent="space-between" alignItems="center" onClick={() => onSelect("unsucess-feedback")}>
                    <Card sx={{ width: '20', margin: 1 }}>
                        <img
                            component="img"
                            height={10}
                            width={20}
                            src={unsucessFeedback}
                        />
                    </Card>
                    <span style={{ marginLeft: '1px', marginRight: '10px', fontSize: 12 }}>Feedback do Insucesso</span>
                </Grid>
                <Grid container justifyContent="space-between" alignItems="center" onClick={() => onSelect("sucess-feedback")}>
                    <Card sx={{ width: '20', margin: 1 }}>
                        <img
                            component="img"
                            height={10}
                            width={20}
                            src={sucessFeedback}
                        />
                    </Card>
                    <span style={{ marginLeft: '1px', marginRight: '10px', fontSize: 12 }}>Feedback do Sucesso</span>
                </Grid>
                <Grid container justifyContent="space-between" alignItems="center" onClick={() => onSelect("query-data")}>
                    <Card sx={{ width: '20', margin: 1 }}>
                        <img
                            component="img"
                            height={10}
                            width={20}
                            src={query}
                        />
                    </Card>
                    <span style={{ marginLeft: '1px', marginRight: '10px', fontSize: 12 }} >Query de dados</span>
                </Grid>
                <Grid container justifyContent="space-between" alignItems="center" onClick={() => onSelect("cancel-transition")}>
                    <Card sx={{ width: '20', margin: 1 }}>
                        <img
                            component="img"
                            height={10}
                            width={20}
                            src={cancel}
                        />
                    </Card>
                    <span style={{ marginLeft: '1px', marginRight: '10px', fontSize: 12 }}>Transição de Cancelamento</span>
                </Grid>
            </Grid>
        );
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