import { Divider, Stack, Typography, IconButton, Checkbox,Chip } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AutorenewIcon from '@mui/icons-material/Autorenew';

const DeadlineRow = (props) => {
    return(
        <div className='deadlines-row' style={{marginBottom: '20px', background: 'white'}}>
            <Stack spacing={2} 
                direction="row" 
                sx={{ padding: '10px', alignItems: 'center', border: 'solid #bebebe 2px', borderRadius: '5px'}}
                divider={<Divider orientation="vertical" flexItem sx={{width: '0.5px'}} style={{margin: '0px'}}/>}
                >
                <Checkbox color="secondary" ></Checkbox> 

                <Typography sx={{width: '18%'}}> <b>{props.data.action}</b> </Typography>

                <Typography style={{margin: '0px'}} sx={{width: '10%', textAlign: 'center'}}> {props.data.type} </Typography>

                <Typography style={{marginLeft: '16px'}} noWrap  sx={{width: '22%', margin: '0px'}}>
                <ul style={{paddingLeft: '20px'}}>
                    <li> {props.data.workName}</li>
                    <li> Khách hàng: {props.data.customerName}</li>
                </ul>
                </Typography>

                <div style={{width: '12%',margin: '0px', display: 'flex', justifyContent: 'center'}}>
                <Chip  style={{ maxWidth: 150 }} sx={{background: "#ff6961"}} label={'Hạn chót: ' + props.data.deadline}></Chip>
                </div>

                <Typography style={{marginLeft: '16px'}} noWrap component="div" sx={{width: '20%', margin: '0px'}}>
                <ul style={{paddingLeft: '20px'}}>
                    <li>Số đơn: {props.data.paperId}</li>
                    <li>Ngày nộp đơn: {props.data.paperSubmitDate}</li>
                </ul>
                </Typography>

                <div style={{textOverflow: "ellipsis", width: '8%', margin: '0px', display: 'flex', justifyContent: 'center'}}>
                    <Typography sx={{margin: '0px', textAlign: 'center'}}> Số VBBH: {props.data.gcnId} </Typography>
                </div>

                <Stack direction="row" style={{margin: '0px'}} sx={{width: '5%', display: 'flex', justifyContent: 'center'}}>
                    <IconButton style={{padding: '4px'}} aria-label="edit" onClick={(e) => {e.stopPropagation();props.handleEditButton()}}><ModeEditIcon /></IconButton>
                    <IconButton style={{padding: '4px'}} aria-label="delete" onClick={(e) => {e.stopPropagation();props.handleDeleteButton();props.getNewStatus()}}><AutorenewIcon /></IconButton>
                </Stack>
            </Stack>
        </div>
    )
}

export default DeadlineRow;