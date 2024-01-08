import Title from '../../components/Title'
import './index.scss'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import { TabContext, TabPanel } from '@mui/lab';
import * as React from 'react';
import Card from '../../components/Card';
import Chip from '@mui/material/Chip';
import { createTheme } from '@mui/material/styles';

const DashBoardScreen= () =>{
    const [tab, setTab] = useState('1')
    const handleChangeTab = (event, newValue) => {
        setTab(newValue);
      };
    return(
        <div id='dashboard-screen'>
            <Title className='title' title='Dashboard'/>
                <div id='dashboard-tab-wrapper'>
                <TabContext value={tab}>
                    <Tabs
                        value={tab}
                        onChange={handleChangeTab}
                        textColor={theme.palette.vintageblue}
                        indicatorColor={theme.palette.vintageblue}
                        sx={{ "& .MuiTabs-indicator": { backgroundColor: "#6c7a99" }, "& .MuiTab-textColorInherit": { color: "#6c7a99" } }}
                        >
                        <Tab value="1" label="Thời hạn"/>
                        <Tab value="2" label="Đơn chưa có kết quả" />
                    </Tabs>
                    <TabPanel value='1'> 
                        <div class='deadline-card-wrapper'>
                        <Card>
                            <p style={{fontSize: '18px', color:theme.palette.purpleblue, top:'5px', position:'absolute'}}><b> Tên công ty </b></p>
                            <hr style={{borderWidth:'0.5', background:'#dfe8f5', width: '90%', position:'absolute', top:'30px'}}></hr>
                            <p className='deadline-card-field' style={{top:'65px'}}>Loại đơn:</p>
                            <p className='deadline-card-value' style={{top:'65px'}}> Nhãn hiệu</p>
                            <p className='deadline-card-field' style={{top:'100px'}}>Việc cần làm: </p>
                            <div className='deadline-card-value' style={{top:'106px'}}>
                                <Chip  style={{ backgroundColor: theme.palette.greyblue, color:'black' }} color='primary' label='Trả lời thông báo thiếu sót'></Chip>
                            </div>
                            <p className='deadline-card-field' style={{top:'135px'}}>Deadline: </p>
                            <p className='deadline-card-value' style={{top:'135px'}}> 15/10/2023</p>
                            <p className='deadline-card-field' style={{top:'170px'}}>Còn:</p>
                            <p className='deadline-card-value' style={{top:'170px',color:'red'}}> <b>15 ngày</b></p>
                        </Card>
                        </div>
                    </TabPanel>
                    <TabPanel value='2'> Kết quả</TabPanel>
                </TabContext>
            </div>
        </div>
    )
}
export default DashBoardScreen;

const theme = createTheme({
    palette: {
      vintageblue: '#6c7a99',
      greyblue: '#dfe8f5',
      purpleblue:'#418bff',
  }
});