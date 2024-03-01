import { Box, Typography, Grid, Divider } from "@mui/material"
import Link from '@mui/material/Link';
import './index.scss'
import DashboardLeftRow from "../DashboardLeftRow";

const DashboardLeftTab = (props) => {
    return(
        <Box sx={{backgroundColor: 'none', maxHeight: props.maxHeight,borderRadius: '5px', overflow: 'auto'}}>
            <div style={{padding: '15px'}}>
                <Grid container sx={{height: '40px'}}>
                    <Grid item md={10}>
                        <Typography  sx={{color: '#555555'}}><b sx={{color: 'black'}}>Chưa có kết quả:</b>  (Tên đơn, loại đơn, tên khách hàng, số ngày quá hạn, ngày nộp đơn) </Typography>
                    </Grid>
                    <Grid item md={2} sx={{display:'flex', justifyContent:'right'}}>
                        <Link>Xem tất cả</Link>
                    </Grid> 
                </Grid>

                
                {
                    props.data.map((item) => (
                        <>
                            <DashboardLeftRow reloadData={props.reloadData} data={item}/>
                            <Divider/>
                        </>
                    ))
                }
            </div>
        </Box>
    )
}

export default DashboardLeftTab