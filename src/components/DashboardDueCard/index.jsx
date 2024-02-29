import * as React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Reply } from '@mui/icons-material';
import getAllWork from "../../apis/work/getAllWork";
import getCustomer from "../../apis/customer/getCustomer";
import getWork from "../../apis/work/getWork";
import LoadingDialog from "../LoadingDialog";
import InfoDialog from "../InfoDialog";
import { useRef, useState } from "react";

const DashboardDueCard = (props) => {
    const [isLoadingDialog, setIsLoadingDialog] = useState(false)
    const [isShowingInfo, setIsShowingInfo] = useState(false);
    const sameVBBH = useRef([{gcnId: null}])
    const gcnIdForDialog = useRef('')

    const thisCustomer = useRef({})
    const thisWork = useRef({})

    const toggleInformation = () => {
      setIsShowingInfo(!isShowingInfo);
    };

    const handleClick = async () => {
        setIsLoadingDialog(true);
        const w = await getWork(props.data.workId)
        thisCustomer.current = await getCustomer(w.customerId)
        thisWork.current = w; 
        if (w.gcnId){
            const workWithSameVBBH = await getAllWork(w.gcnId)
            sameVBBH.current = workWithSameVBBH;
            gcnIdForDialog.current = w.gcnId
        }
        else{
            sameVBBH.current = [w]
            gcnIdForDialog.current = ''
        }
        setIsLoadingDialog(false);
        toggleInformation();
    };
    return (
        <>
        <LoadingDialog isShowing={isLoadingDialog}/>

        { isShowingInfo && <InfoDialog
            isShowing={isShowingInfo}
            hide={toggleInformation}
            customer={thisCustomer.current}
            customerId={thisCustomer.current._id}
            workValues={sameVBBH.current}
            workId={thisWork.current._id}
            gncId={gcnIdForDialog.current}
        />}

        <Box sx={{ textOverflow: 'ellipsis' }} style={{width:'90%', padding: '5px', marginTop: 0, marginBottom: '15px', height: '60px', border: '3px solid #f5f5f5', borderRadius: '10px', background: 'none', display: 'flex', alignItems: 'center'}}>
            <div style={{height: '100%', width: '100%', background: 'none', cursor: 'pointer'}} onClick={handleClick}>
            <Grid container spacing={1}>
                <Grid item md={2}>
                    <div style={{width:'100%', height:'58px', borderRadius:'10px', alignItems:'center', display: 'flex', justifyContent: 'center', backgroundColor:'#fbf2a1'}}> 
                        <Reply/> 
                    </div>
                </Grid>
                <Grid item md={10}>
                    <Typography variant='caption'> {props.data.action}</Typography>
                    <Typography noWrap variant='body2' style={{ textOverflow: 'ellipsis' }} > <b> {props.data.customerName} </b></Typography>
                    <Typography variant='caption'> {props.data.deadline} </Typography>
                </Grid>
            </Grid>
            </div>
        </Box>
        </>
    )
}

export default DashboardDueCard;