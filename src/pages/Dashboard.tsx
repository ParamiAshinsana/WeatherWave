// import React from "react";
// import { Grid, Paper } from "@mui/material";
// import CurrentWeatherCard from '../components/CurrentWeatherCard';
// import MapImageCard from '../components/MapImageCard';
// import PopularCitiesCard from '../components/PopularCitiesCard';
// import ForecastCard from '../components/ForecastCard';
// import SummaryChartCard from '../components/SummaryChartCard';
//
//
// const Dashboard = () => {
//     return (
//         <Grid container spacing={2} sx={{ p: 2 }}>
//             {/* Row 1 */}
//             <Grid container item spacing={2}>
//                 <Grid item xs={3}>
//                     <Paper elevation={3} sx={{ p: 2, height: "150px" }}> <CurrentWeatherCard />
//                     </Paper>
//                 </Grid>
//                 <Grid item xs={6}>
//                     <Paper elevation={3} sx={{ p: 2, height: "150px" }}><MapImageCard />
//                     </Paper>
//                 </Grid>
//                 <Grid item xs={3}>
//                     <Paper elevation={3} sx={{ p: 2, height: "150px" }}><PopularCitiesCard />
//                     </Paper>
//                 </Grid>
//             </Grid>
//
//             {/* Row 2 */}
//             <Grid container item spacing={2}>
//                 <Grid item xs={3}>
//                     <Paper elevation={3} sx={{ p: 2, height: "150px" }}><ForecastCard />
//                     </Paper>
//                 </Grid>
//                 <Grid item xs={9}>
//                     <Paper elevation={3} sx={{ p: 2, height: "150px" }}><SummaryChartCard />
//                     </Paper>
//                 </Grid>
//             </Grid>
//         </Grid>
//     );
// };
//
// export default Dashboard;








import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import CurrentWeatherCard from '../components/CurrentWeatherCard';
import MapImageCard from '../components/MapImageCard';
// import PopularCitiesCard from '../components/PopularCitiesCard';
// import ForecastCard from '../components/ForecastCard';
// import SummaryChartCard from '../components/SummaryChartCard';

const Dashboard = () => {
    const glassStyle = {
        p: 2,
        height: 200,
        backdropFilter: 'blur(16px) saturate(180%)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.125)',
        borderRadius: '12px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        color: '#ffffff'
    };
    return (
        <Box sx={{ padding: 2 ,border: '2px solid #39e01f'}}>
            {/* First Row - 3 cards */}
            <Grid container spacing={2} sx={{ marginBottom: 2,border: '2px solid #bfd9db' }}>
                {/* Card 1 */}
                <Grid item xs={12} sm={4} md={3}>
                    <Paper elevation={3} sx={{ ...glassStyle,p: 2, height: 200, minWidth: 350,border: '1px solid #bfd9db' }}>
                        <CurrentWeatherCard />
                    </Paper>
                </Grid>

                {/* Card 2 */}
                <Grid item xs={12} sm={8} md={6}>
                    <Paper elevation={3} sx={{  height: 200, minWidth: 400 ,border: '2px solid #e62b0e'}}>
                        <MapImageCard />
                    </Paper>
                </Grid>

                {/* Card 3 */}
                <Grid item xs={12} sm={4} md={3}>
                    <Paper elevation={3} sx={{ p: 2, height: 200, minWidth: 350 }}>
                        <Typography variant="h6">Card 3</Typography>
                        <Typography>Some details for card 3</Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Second Row - 2 cards */}
            <Grid container spacing={2}>
                {/* Card 4 */}
                <Grid item xs={12} sm={4} md={3}>
                    <Paper elevation={3} sx={{ p: 2, height: 200, minWidth: 500 }}>
                        <Typography variant="h6">Card 4</Typography>
                        <Typography>Some details for card 4</Typography>
                    </Paper>
                </Grid>

                {/* Card 5 */}
                <Grid item xs={12} sm={8} md={9}>
                    <Paper elevation={3} sx={{ p: 2, height: 200 , minWidth: 500}}>
                        <Typography variant="h6">Card 5</Typography>
                        <Typography>Some details for card 5</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
// import React from "react";
// import { Grid, Paper } from "@mui/material";
// import CurrentWeatherCard from '../components/CurrentWeatherCard';
// import MapImageCard from '../components/MapImageCard';
// import PopularCitiesCard from '../components/PopularCitiesCard';
// import ForecastCard from '../components/ForecastCard';
// import SummaryChartCard from '../components/SummaryChartCard';
//
// const Dashboard = () => {
//     return (
//         <Grid container spacing={2} sx={{ p: 2 }}>
//             {/* Row 1 */}
//             <Grid container item spacing={2}>
//                 <Grid item xs={12} sm={3}>
//                     <Paper elevation={3} sx={{ p: 2, height: '150px' }}>
//                         <CurrentWeatherCard />
//                     </Paper>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <Paper elevation={3} sx={{ p: 2, height: '150px' }}>
//                         <MapImageCard />
//                     </Paper>
//                 </Grid>
//                 <Grid item xs={12} sm={3}>
//                     <Paper elevation={3} sx={{ p: 2, height: '150px' }}>
//                         <PopularCitiesCard />
//                     </Paper>
//                 </Grid>
//             </Grid>
//
//             {/* Row 2 */}
//             <Grid container item spacing={2}>
//                 <Grid item xs={12} sm={3}>
//                     <Paper elevation={3} sx={{ p: 2, height: '150px' }}>
//                         <ForecastCard />
//                     </Paper>
//                 </Grid>
//                 <Grid item xs={12} sm={9}>
//                     <Paper elevation={3} sx={{ p: 2, height: '150px' }}>
//                         <SummaryChartCard />
//                     </Paper>
//                 </Grid>
//             </Grid>
//         </Grid>
//     );
// };
//
// export default Dashboard;