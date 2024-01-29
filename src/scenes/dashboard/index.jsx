import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme'
import { mockTransactions } from '../../data/mockData'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import EmailIcon from '@mui/icons-material/Email'
import PointOfSaleIcon from '@mui/icons-material/PointOfSale'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import TrafficIcon from '@mui/icons-material/Traffic'
import Header from '../../components/Header'
import LineChart from '../../components/LineChart'
import GeographyChart from '../../components/GeographyChart'
import BarChart from '../../components/BarChart'
import StatBox from '../../components/StatBox'
import ProgressCircle from '../../components/ProgressCircle'

// New Icons
import ComputerIcon from '@mui/icons-material/Computer'
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft'
import SwitchRightIcon from '@mui/icons-material/SwitchRight'

// Components
import WepaTable from '../table/WepaTable'

const Dashboard = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        // border="solid 5px red"
      >
        <Header title="NMSU Lab Crabs" subtitle="Automated WEPA Tracker" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        border="solid 5px red"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="120px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Location"
            subtitle="HJLC Petes Place BC309"
            // progress="0.75"
            // increase="+14%"
            icon={
              <ComputerIcon
                sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          // border="solid 5px red"
        >
          {/* WEPA TABLE HERE   */}
          <WepaTable></WepaTable>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          // border="solid 5px red"
        >
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          // border="solid 5px green"
          p="30px"
        >
          <Typography
            textAlign="center"
            // border="solid 5px red"
            variant="h5"
            fontWeight="600"
          >
            TBD
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <Typography
              variant="h5"
              // border="solid 5px yellow"
              color={colors.greenAccent[500]}
              sx={{ mt: '15px' }}
            >
              .
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
