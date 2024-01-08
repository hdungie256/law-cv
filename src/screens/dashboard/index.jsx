import './index.scss'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import { TabContext, TabPanel } from '@mui/lab';
import * as React from 'react';
import DeadlineTab from '../../components/DeadlineTab';
import { createTheme } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import RuleIcon from '@mui/icons-material/Rule';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const DashBoardScreen= () =>{
    const [tab, setTab] = useState('1')
    const handleChangeTab = (event, newValue) => {
        setTab(newValue);
      };

    return(
        <div id='dashboard-screen'>
                <div id='dashboard-tab-wrapper'>
                <TabContext value={tab}>
                    <Tabs
                        value={tab}
                        onChange={handleChangeTab}
                        textColor={theme.palette.vintageblue}
                        indicatorColor={theme.palette.vintageblue}
                        sx={{ "& .MuiTabs-indicator": { backgroundColor: "#6c7a99" }, 
                        "& .MuiTab-textColorInherit": { color: "#6c7a99" },
                        height: "60px",
                         }}
                        >
                        <Tab icon={<SendIcon />} iconPosition="start" value="1" label="Trả lời thông báo"/>
                        <Tab icon={<ReceiptLongIcon />} iconPosition="start" value="2" label="Duy trì hiệu lực"/>
                        <Tab icon={<RuleIcon />} iconPosition="start" value="3" label="Đơn chưa có kết quả" />
                    </Tabs>

                    <TabPanel value='1'> 
                        <DeadlineTab/>
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