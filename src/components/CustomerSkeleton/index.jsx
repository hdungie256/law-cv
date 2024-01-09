import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

const CustomerSkeleton = (props) => {
    const renderRows = (numRows) => {
        const rows = [];
        for (let i=0; i<numRows; i++){
            rows.push(
            <Grid item md={12}>
            <Grid container spacing={3}>
                <Grid item md={3}>
                    <Skeleton animation="wave" variant="text" sx={{ fontSize: '2rem' }} width={'100%'} />
                </Grid>
                <Grid item md={3}>
                    <Skeleton animation="wave" variant="text" sx={{ fontSize: '2rem' }} width={'100%'} />
                </Grid>
                <Grid item md={3}>
                    <Skeleton animation="wave" variant="text" sx={{ fontSize: '2rem' }} width={'100%'} />
                </Grid>
                <Grid item md={3}>
                    <Skeleton  animation="wave"variant="text" sx={{ fontSize: '2rem' }} width={'100%'} />
                </Grid>
            </Grid>
        </Grid>)
        }
        return rows;
    }
    return (
        <div id='customer-skeleton' style={{height: '100%'}}>
            <Grid container rowSpacing={-1}>
                <Grid item md={0.3}>

                </Grid>
                <Grid item md={11}>
                    <Grid container>
                    <Grid item md={12}>
                    <Grid container>
                        <Grid item md={10}>
                            <Skeleton animation="wave" variant="text" sx={{ fontSize: '4rem' }} width={'40%'} />
                        </Grid>
                        <Grid item md={2}>
                            <Skeleton animation="wave" variant="text" sx={{ fontSize: '4rem' }} width={'100%'} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={12}>
                    <Skeleton animation="wave" variant="text" sx={{ fontSize: '5rem' }} width={'100%'} />
                </Grid>
                <Grid container rowSpacing={4}>
                    {renderRows(props.numRows)}
                </Grid>
                <Grid item md={12}>
                    <Grid container spacing={1}>
                        <Grid item md={10.4}></Grid>
                        <Grid item md={1}>
                            <Skeleton animation="wave" variant="text" sx={{ fontSize: '2rem' }} width={'100%'}></Skeleton>
                        </Grid>
                        <Grid item md={0.3}>
                            <Skeleton animation="wave" variant="text" sx={{ fontSize: '2rem' }} width={'100%'}></Skeleton>
                        </Grid>
                        <Grid item md={0.3}>
                            <Skeleton animation="wave" variant="text" sx={{ fontSize: '2rem' }} width={'100%'}></Skeleton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
                </Grid>
                <Grid item md={0.7}>
                </Grid>
            </Grid>
        </div>
    )
}

export default CustomerSkeleton;