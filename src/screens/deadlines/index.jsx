import DeadlineRow from '../../components/DeadlineRow';
import './index.scss'
import { Typography, Stack, Chip, Badge } from '@mui/material';
import TaskIcon from '@mui/icons-material/Task';

const DeadlineScreen = (props) => {
    return (
        <div id='deadline-screen'>
            <Typography variant="h5" style={{width: '95%'}} sx={{color: '#555555',padding: '20px', paddingLeft: '30px'}}> <b>Công việc sắp đến hạn</b> </Typography>

            <div style={{height: '78%', display: 'flex', justifyContent:'center'}}>
            <Stack sx={{padding: '20px', paddingTop: '0px', width: '96%', margin: '0px', overflow: 'auto', borderRadius: '5px', maxHeight: '100%'}}>
                <DeadlineRow data={
                    {action: 'Duy trì hiệu lực năm thứ 7', 
                    type: "Thẩm định nhãn hiệu", 
                    workName: "Tên đơn hàng đơn hàng", 
                    customerName: "Cty An Hiển", 
                    deadline: "27/8/2024",
                    paperId: "SD4-12-2003",
                    paperSubmitDate: "20/4/2003",
                    gcnId: "12394"}
                    }></DeadlineRow>
                <DeadlineRow data={
                    {action: 'Trả lời thông báo', 
                    type: "Li xăng - chuyển nhượngggggggg", 
                    workName: "Tên đơn hàng", 
                    customerName: "Bánh bao Hà Phát", 
                    deadline: "27/08/2024",
                    paperId: "4-45-2022",
                    paperSubmitDate: "20/4/2003",
                    gcnId: "12394"}
                    }></DeadlineRow>
            </Stack>
            </div>

            <div style={{height: '3%', width: '95%', display: 'flex', justifyContent: 'right', padding: '25px'}}>
                {/* <Chip sx={{background: '#fbf2a1'}} label={'Tổng: ' + 7}></Chip> */}
                <div style={{background: '#fbf2a1', display: 'flex', flexDirection: 'row',  border: 'none', borderRadius: '20px', width: '10%', height: '35px', justifyContent: 'center', alignItems: 'center'}}>
                <Badge color="error" badgeContent={7} size="large">
                    <Typography> <b>TỔNG: </b>   </Typography>
                    <TaskIcon sx={{background: "fbf2a1"}}></TaskIcon>
                </Badge>
                </div>
            </div>

        </div>
    )
}

export default DeadlineScreen;