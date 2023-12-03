import { Box, Stack, Typography, Button } from '@mui/material';
import { COLORS } from './color';
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet,faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";

function Profile() {
    return (
      <Stack flexGrow={1} direction={'row'} justifyContent={'space-around'}>
        <Stack direction={'column'} alignItems={'flex-start'}>
          <Image src='https://www.cryptonomist.gr/wp-content/uploads/2022/01/FIW6rBzWUAMUzq1.jpeg' width={279} height={279}></Image>
          <Stack flexGrow={1} alignItems={'flex-start'} justifyContent={'space-evenly'}>
            <Typography color={COLORS.gray} fontSize={'20px'} fontWeight={400}>x0622xxxxxxxxx</Typography>
            <Typography fontSize={'32px'} fontWeight={600}>Pigeon</Typography>
            <Typography fontSize={'20px'} fontWeight={400}>Score : 4.5</Typography>
            <Stack direction={'row'} justifyContent={'space-around'}>
              <FontAwesomeIcon icon={faWallet} size='2xl' style={{color: COLORS.darkgray}} />
              <Typography fontSize={'20px'} fontWeight={500} color={COLORS.darkgray}>12.50 ETH</Typography>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'}>
              <FontAwesomeIcon icon={faHandHoldingDollar} size='2xl' style={{color: COLORS.darkgray}}/>
              <Typography fontSize={'20px'} fontWeight={500} color={COLORS.darkgray}>5.50 ETH</Typography>
            </Stack>
            <Button sx={{width: '279px', height: '52px', borderRadius: '15px', color: COLORS.white,bgcolor: COLORS.lightpurple}}>Add listing</Button>
            <Button sx={{width: '279px', height: '52px', borderRadius: '15px', color: COLORS.white,bgcolor: COLORS.lightpurple, border:'3px', borderColor: '#C6A2F4'}}>Edit Profile</Button>
          </Stack>
        </Stack>
        <Box sx={{bgcolor: COLORS.purple}} width={'764px'} height={'686px'} borderRadius={'15px'} p={3}>
          <h1>Hello</h1>

        </Box>
      </Stack>
    )
  }
  
export default Profile;