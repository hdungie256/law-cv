import DeadlineRow from '../../components/DeadlineRow';
import './index.scss'
import { Typography, Stack } from '@mui/material';

const DeadlineScreen = (props) => {
    return (
        <div id='deadline-screen'>
            <Typography variant="h5" style={{width: '95%'}} sx={{color: '#555555',padding: '20px'}}> <b>Công việc sắp đến hạn</b> </Typography>

            <div style={{height: '85%', display: 'flex', justifyContent:'center'}}>
            <Stack sx={{padding: '20px', paddingTop: '0px', width: '98%', margin: '0px', overflow: 'auto', borderRadius: '5px', maxHeight: '100%'}}>
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
        </div>
    )
}

export default DeadlineScreen;