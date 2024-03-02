import { ArrowRight, Reply } from "@mui/icons-material";
import { Typography, Grid, Chip } from "@mui/material";
import '../../assets/scss/_colors.scss'
import getAllWork from "../../apis/work/getAllWork";
import getCustomer from "../../apis/customer/getCustomer";
import getWork from "../../apis/work/getWork";
import LoadingDialog from "../LoadingDialog";
import InfoDialog from "../InfoDialog";
import { useRef, useState } from "react";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { IconButton } from '@mui/material';
import ConfirmDialog from '../../components/ConfirmDialog';
import changeWorkStatus from '../../apis/work/changeWorkStatus';

const DashboardDueRow = (props) => {

    const fetchData = async (reload) => {
        if (reload || !sessionStorage.getItem("serviceData")){
            const data = await getAllWork();
            sessionStorage.setItem('serviceData', JSON.stringify(data));
        }
      };

    const fixDashboardForThisWork = async (workId) => {
        const dashboardData = JSON.parse(sessionStorage.getItem("dashboardData"));
    
        var dueRows = dashboardData.dueRows;
        var dueCards = dashboardData.dueCards;
        var pendingRows = dashboardData.pendingRows;
    
        for (let i=0; i<2; i++){
          for (let i=0;i<dueCards.length;i++){
            if (dueCards[i].workId === workId){
              dueCards.splice(i,1);
              break;
            }
          }
        }
    
        for (let i=0; i<2; i++){
          for (let i=0;i<dueRows.length;i++){
            if (dueRows[i].workId === workId){
              dueRows.splice(i,1);
              break;
            }
          }
        }
    
        for (let i=0; i<2; i++){
          for (let i=0;i<pendingRows.length;i++){
            if (pendingRows[i].workId === workId){
              pendingRows.splice(i,1);
              break;
            }
          }
        }
    
        const data = { dueRows: dueRows.sort((a, b) => {return a.daysLeft - b.daysLeft}), 
        pendingRows: pendingRows.sort((a, b) => {return a.daysLeft - b.daysLeft;}), 
        dueCards: dueCards.sort((a, b) => {return a.daysLeft - b.daysLeft;}) }
    
        sessionStorage.setItem("dashboardData", JSON.stringify(data));
        props.reloadData();
      }

    const [isShowingConfirm, setIsShowingConfirm] = useState(false)
    const toggleConfirm = () => {
      setIsShowingConfirm(!isShowingConfirm)
    }

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
        <Grid container sx={{background:'none',height: '50px',display:'flex', alignItems: 'center'}}>
            <Grid item md={11}>
                <div onClick={handleClick} style={{cursor: 'pointer'}}>

                <Grid container spacing={1} sx={{background:'none',height: '50px',display:'flex', alignItems: 'center'}}>
                <Grid item md={0.5}>
                    {props.data?.action?.includes('Duy trì hiệu lực') ?  <ArrowRight fontSize='small' sx={{borderRadius: '50%',background: '#caebff'}}/>
                    : <Reply fontSize="small" sx={{borderRadius: '50%',background: '#fbcca1'}}/>}
                </Grid>
                <Grid item md={2}>
                    <Typography className='dashboard-due-tab-text' variant='body2'> <b>{props.data.action}</b></Typography>
                </Grid>
                <Grid item md={2.25}>
                    <Chip sx={{background: "#fbf2a1"}} label={props.data.type}/>
                </Grid>
                <Grid item md={2.25}>
                    <Typography className='dashboard-due-tab-text' variant='body2' noWrap>{props.data.customerName} </Typography>
                </Grid>
                <Grid item md={2}>
                    <Typography className='dashboard-due-tab-text' variant='body2' noWrap>{props.data.workName} </Typography>
                </Grid>
                <Grid item md={1.5} sx={{display: 'flex', justifyContent:'center'}}>
                    <Typography className='dashboard-due-tab-text dashboard-due-tab-text-due' variant='body2' sx={{color: 'red'}} noWrap> <b>{props.data.daysLeft} </b></Typography>
                </Grid>
                <Grid item md={1.5}>
                    <Typography className='dashboard-due-tab-text' variant='body2' noWrap> {props.data.deadline} </Typography>
                </Grid>
                </Grid>
                </div>
            </Grid>

            <Grid item md={1}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <IconButton onClick={async (e) => {e.stopPropagation();
                                            setIsLoadingDialog(true);
                                            const w = await getWork(props.data.workId)
                                            thisWork.current = w
                                            setIsLoadingDialog(false);
                                            toggleConfirm()}}><AutorenewIcon /></IconButton>
            </div>
            </Grid>
        </Grid>

        <ConfirmDialog
            isShowing={isShowingConfirm}
            hide={toggleConfirm}
            handleConfirm={async () => {
            toggleConfirm();
            setIsLoadingDialog(true)
            const res = await changeWorkStatus(thisWork.current._id, 'Hoàn thành');
            if (res){
                setIsLoadingDialog(false);
                fixDashboardForThisWork(thisWork.current._id);
                fetchData(true);
            }
            }}
            height={'28%'}
            type={'đơn hàng'}
            name={`${thisWork.current.name} (${thisWork.current.customerName})`}
            newStatus={'Hoàn thành'}
            />
        </>
    )
}
export default DashboardDueRow;