import Card from '../../components/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import {Pagination} from "@mui/material"
import { useState } from 'react';
import { createTheme } from '@mui/material/styles';
import './index.scss'
import dayjs from 'dayjs';
import { useEffect } from 'react';

const DeadlineTab = (props) => {

    const [page, setPage] = useState(1); 
    const handleChange = (event, value) => { 
        setPage(value); 
    }; 

    const renderCard = (list) => {
        return list.slice((page-1) * cardPerPage, (page-1) * cardPerPage + cardPerPage).map((item) => (
                <Grid item md={4} style={{ height: '260px' }}>
                <div class='deadline-card-wrapper'>
                <Card>
                    <p style={{fontSize: '18px', color:theme.palette.purpleblue, top:'5px', position:'absolute'}}><b> {item.name} </b></p>
                    <hr style={{borderWidth:'0.5', background:'#dfe8f5', width: '90%', position:'absolute', top:'30px'}}></hr>
                    <p className='deadline-card-field' style={{top:'65px'}}>Loại đơn:</p>
                    <p className='deadline-card-value' style={{top:'65px'}}> {item.type}</p>
                    <p className='deadline-card-field' style={{top:'100px'}}>Việc cần làm: </p>
                    <div className='deadline-card-value' style={{top:'106px'}}>
                        <Chip  style={{ backgroundColor: item.action.includes("từ chối") ? theme.palette.greyblue : theme.palette.green, color:'black' }} color='primary' label={item.action}></Chip>
                    </div>
                    <p className='deadline-card-field' style={{top:'135px'}}>Deadline: </p>
                    <p className='deadline-card-value' style={{top:'135px'}}> {dayjs(item.deadline).format('DD/MM/YYYY')}</p>
                    <p className='deadline-card-field' style={{top:'170px'}}>Còn:</p>
                    <p className='deadline-card-value' style={{top:'170px',color: item.due > 60 ? 'green' : (item.due > 30 ? 'orange' : 'red')}}> <b>{item.due} ngày</b></p>
                </Card>
                </div>
                </Grid>
        ))
    }

    return(
    <div id='deadline-tab-wrapper'>
        <Grid justifyContent={"center"} alignItems={"center"} container columns={{xs:12, md:12}} spacing={1}>
            {renderCard(props.deadlineList)}
        </Grid>
        <Pagination style={{position:'absolute', bottom: '20px', right:'20px'}} count={Math.ceil(props.deadlineList.length/cardPerPage)} page={page} onChange={handleChange} /> 
    </div>
    )
}

export default DeadlineTab;

const theme = createTheme({
    palette: {
      vintageblue: '#6c7a99',
      greyblue: '#dfe8f5',
      purpleblue:'#418bff',
      green: '#1bd3e4'
  }
});

const cardPerPage = window.innerHeight < 700 ? 6 : 9;
