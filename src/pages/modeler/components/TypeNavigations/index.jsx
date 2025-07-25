/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import Popover from '@mui/material/Popover';
import { Card, Grid} from '@mui/material';
import navigation from "./navigation.png";
import transition from "./transition.png";
import unsucessFeedback from "./unsucessFeedback.png"
import sucessFeedback from "./sucessFeedback.png";
import query from "./query.png";
import cancel from "./cancel.png";
import { useTranslation } from 'react-i18next';

function TypeNavigations({ close, anchor, edges, setUltimaseta }) {
    const open = Boolean(anchor);
    const id = open ? 'simple-popover' : undefined;
    const { t } = useTranslation();

    const onSelect = (typeEdge) => {
        setUltimaseta(typeEdge); 
        close(); 
    };

    const edgeTypes = {
        'transition': 
            <Grid container justifyContent="space-between" alignItems="center" onClick={() => onSelect("transition")}>
                <Card sx={{ width: '20', margin: 1 }}>
                    <img
                        component="img"
                        height={10}
                        width={20}
                        src={transition}
                    />
                </Card>
                <span style={{ marginLeft: '1px', marginRight: '10px', fontSize: 12 }}>{t("Transição do Usuário")}</span>
            </Grid>
        ,
        'navigation': 
            <Grid container justifyContent="space-between" alignItems="center" style={{cursor: 'pointer'}} onClick={() => onSelect("navigation")}>
                <Card sx={{ width: 20, margin: 1 }}>
                    <img
                        component="img"
                        height={10}
                        width={20}
                        src={navigation}
                    />
                </Card>
                <span style={{ marginLeft: '1px', marginRight: '10px', fontSize: 12 }}>{t("Navegação")}</span>
            </Grid>, 
        'sucess-feedback': 
            <Grid container justifyContent="space-between" alignItems="center" onClick={() => onSelect("sucess-feedback")}>
                <Card sx={{ width: '20', margin: 1 }}>
                    <img
                        component="img"
                        height={10}
                        width={20}
                        src={sucessFeedback}
                    />
                </Card>
                <span style={{ marginLeft: '1px', marginRight: '10px', fontSize: 12 }}>{t("Feedback do Sucesso")}</span>
            </Grid>, 
        'unsucess-feedback': 
            <Grid container justifyContent="space-between" alignItems="center" onClick={() => onSelect("unsucess-feedback")}>
                <Card sx={{ width: '20', margin: 1 }}>
                    <img
                        component="img"
                        height={10}
                        width={20}
                        src={unsucessFeedback}
                    />
                </Card>
                <span style={{ marginLeft: '1px', marginRight: '10px', fontSize: 12 }}>{t("Feedback do Insucesso")}</span>
            </Grid>, 
        'cancel-transition': 
            <Grid container justifyContent="space-between" alignItems="center" onClick={() => onSelect("cancel-transition")}>
                <Card sx={{ width: '20', margin: 1 }}>
                    <img
                        component="img"
                        height={10}
                        width={20}
                        src={cancel}
                    />
                </Card>
                <span style={{ marginLeft: '1px', marginRight: '10px', fontSize: 12 }}>{t("Transição de Cancelamento")}</span>
            </Grid>, 
        'query-data': 
            <Grid container justifyContent="space-between" alignItems="center" onClick={() => onSelect("query-data")}>
                <Card sx={{ width: '20', margin: 1 }}>
                    <img
                        component="img"
                        height={10}
                        width={20}
                        src={query}
                    />
                </Card>
                <span style={{ marginLeft: '1px', marginRight: '10px', fontSize: 12 }} >{t("Query de dados")}</span>
            </Grid> 
    }

    const renderPointer = () => {
        return(
            <Grid container flexDirection={'column'}>
                {
                    edges.map((edge, index) => (
                        <div key={index}>
                            {edgeTypes[edge]}
                        </div>
                    ))
                }
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
                timeout: 200,
            }}>
            {renderPointer()}
        </Popover>
    );
}

export default TypeNavigations;