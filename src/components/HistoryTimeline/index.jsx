import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { timelineItemClasses } from '@mui/lab';
  import dayjs from 'dayjs';

export default function HistoryTimeline(props) {
    const historyArray = props.itemArray.sort((a, b) => a.date - b.date);
  return (
    <Timeline>
        {historyArray.map((item, index) => {
          return(
                <Timeline key={'history-timeline-' + index} position="alternate" style={{padding: 0}} sx={{
                  [`& .${timelineItemClasses.root}:before`]: {
                    flex: 0,
                    padding: 0,
                  },
                }}>
                  <TimelineItem style={{padding: 0}} sx={{padding: 0}}>
                    <TimelineSeparator>
                      <TimelineDot sx={{color: 'black'}} />
                      {index < historyArray.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>{item.action} : {item.date ? dayjs(item.date).format('DD/MM/YYYY') : 'Không có'}</TimelineContent>
                  </TimelineItem>
                </Timeline>
          )
        })
        }
    </Timeline>
  );
}