import { Box, Typography, Grid, Divider } from "@mui/material"
import Link from '@mui/material/Link';
import './index.scss'
import DashboardDueRow from "../DashboardDueRow";
import { useNavigate } from "react-router-dom";

const DashboardDueTab = (props) => {
    let navigate = useNavigate();

    return(
        <Box sx={{backgroundColor: 'none', maxHeight: props.maxHeight,borderRadius: '5px', overflow: 'auto'}}>
            <div style={{padding: '15px'}}>
                <Grid container sx={{height: '40px'}}>
                    <Grid item md={10}>
                        <Typography sx={{color: '#555555'}}><b style={{color:'black'}}>Đến hạn:</b> (Việc cần làm, loại đơn, tên khách hàng, tên đơn, số ngày còn lại, hạn chót)</Typography>
                    </Grid>
                    <Grid item md={2} sx={{display:'flex', justifyContent:'right'}}>
                        <Link component="button" onClick={() => navigate('/deadlines')}>Xem tất cả</Link>
                    </Grid> 
                </Grid>

                {
                    props.data.map((item) => (
                        <>
                            <DashboardDueRow reloadData={props.reloadData}  data={item}/>
                            <Divider/>
                        </>
                    ))
                }

            </div>
        </Box>
    )
}

export default DashboardDueTab