import { Pause } from "@mui/icons-material";
import { Typography, Grid, Chip } from "@mui/material"
import { useState, useRef } from "react";
import InfoDialog from "../InfoDialog";
import getWork from "../../apis/work/getWork";
import getAllWork from "../../apis/work/getAllWork";
import getCustomer from "../../apis/customer/getCustomer";
import LoadingDialog from "../LoadingDialog";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { IconButton } from '@mui/material';

const DashboardLeftRow = (props) => {
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
        setIsLoadingDialog(true)
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
        setIsLoadingDialog(false)
        toggleInformation();
    }

    return(
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

        <Grid container sx={{background:'none',height: '50px',display:'flex', alignItems: 'center'}}>
            <Grid item md={11}>
                <div onClick={handleClick} style={{cursor: 'pointer'}}>
                <Grid container sx={{background:'none',height: '50px',display:'flex', alignItems: 'center'}}>
                <Grid item md={0.5}>
                    <Pause fontSize="small" sx={{borderRadius: '50%', background: '#defba1'}}/>
                </Grid>
                <Grid item md={2.5}>
                    <Typography noWrap className='dashboard-left-tab-text' variant='body2'> <b> {props.data.workName} </b></Typography>
                </Grid>
                <Grid item md={2}>
                    <Chip sx={{background:'#fbf2a1'}} label={props.data.type}/>
                </Grid>
                <Grid item md={2.5}>
                    <Typography className='dashboard-left-tab-text' variant='body2' noWrap> {props.data.customerName} </Typography>
                </Grid>
                <Grid item md={1.5} sx={{display: 'flex', justifyContent:'center'}}>
                    <Typography className='dashboard-left-tab-text dashboard-left-tab-text-days' variant='body2' sx={{color: 'red'}} noWrap> <b>{props.data.daysLeft} </b></Typography>
                </Grid>
                <Grid item md={1.5}>
                    <Typography className='dashboard-left-tab-text' variant='body2' noWrap> {props.data.deadline} </Typography>
                </Grid>
                </Grid>
                </div>
            </Grid>

            <Grid item md={1}>
                {/* <div style={{display: 'flex', flexDirection: 'row'}}>
                    <IconButton><ModeEditIcon /></IconButton>
                    <IconButton><AutorenewIcon /></IconButton>
                </div> */}
            </Grid>


        </Grid>
        </>
    )
}
export default DashboardLeftRow;