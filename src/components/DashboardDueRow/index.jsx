import { ArrowRight, Reply } from "@mui/icons-material";
import { Typography, Grid, Chip } from "@mui/material";
import '../../assets/scss/_colors.scss'
import getAllWork from "../../apis/work/getAllWork";
import getCustomer from "../../apis/customer/getCustomer";
import getWork from "../../apis/work/getWork";
import LoadingDialog from "../LoadingDialog";
import InfoDialog from "../InfoDialog";
import { useRef, useState } from "react";

const DashboardDueRow = (props) => {
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

        <div onClick={handleClick} style={{cursor: 'pointer'}}>

        <Grid container spacing={1} sx={{background:'none',height: '50px',display:'flex', alignItems: 'center'}}>
        <Grid item md={0.5}>
            {/* <ArrowRight fontSize='small'/> */}
            {/* <Divider  orientation="vertical" flexItem/> */}
            {props.data?.action?.includes('Duy trì hiệu lực') ?  <ArrowRight fontSize='small' sx={{borderRadius: '50%',background: '#caebff'}}/>
            : <Reply fontSize="small" sx={{borderRadius: '50%',background: '#fbcca1'}}/>}
        </Grid>
        <Grid item md={2}>
            <Typography className='dashboard-due-tab-text' variant='body2'> <b>{props.data.action}</b></Typography>
        </Grid>
        <Grid item md={2}>
            <Chip sx={{background: 
            props.data.type === 'Nhãn hiệu' ? '#a1a5fb' : 
            props.data.type === 'Sáng chế' ? '#fba1a1' :
            props.data.type === 'KDCN' ? '#c7c6ff' :
            props.data.type === 'Li xăng - Chuyển nhượng' ? "#defba1" : 
            props.data.type === 'Cấp lại' ? "#f9a1fb":
            props.data.type === 'Sửa đổi' ? "#737373": 
            props.data.type === 'Gia hạn' ? "#caebff" : "#fbf2a1"}} 
            label={props.data.type}/>
        </Grid>
        <Grid item md={3}>
            <Typography className='dashboard-due-tab-text' variant='body2' noWrap>{props.data.customerName} </Typography>
        </Grid>
        <Grid item md={2}>
            <Typography className='dashboard-due-tab-text' variant='body2' noWrap>{props.data.workName} </Typography>
        </Grid>
        <Grid item md={1} sx={{display: 'flex', justifyContent:'center'}}>
            <Typography className='dashboard-due-tab-text dashboard-due-tab-text-due' variant='body2' sx={{color: 'red'}} noWrap> <b>{props.data.daysLeft} </b></Typography>
        </Grid>
        <Grid item md={1.5}>
            <Typography className='dashboard-due-tab-text' variant='body2' noWrap> {props.data.deadline} </Typography>
        </Grid>
        </Grid>
        </div>
        </>
    )
}
export default DashboardDueRow;