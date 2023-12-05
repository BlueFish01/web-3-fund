import { Box, Typography, Button, Stack, CardActionArea, Card} from "@mui/material";
import Image from 'next/image';
import { WeiToETH, truncate, msToday } from '../utils'

function ItemCard({
    onClick,
    data,
}) {

  const price = WeiToETH(data?.price)
  const ms = parseInt(data?.duration.toString())
  const days = msToday(ms)
  return (
    
    <CardActionArea 
        sx={{borderRadius: '15px'}}
        onClick={onClick}
    >
    <Box
        height={"360px"}
        width={"320px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        boxShadow={"0px 4px 14.6px -1px rgba(0, 0, 0, 0.25)"}
        borderRadius={'15px'}
    >
        
        <Stack 
        flexGrow={1} 
        flex={1} 
        height={'100%'} 
        display={'flex'}
        justifyContent={'space-between'}
        spacing={1}
        >
            <Stack>
            <Image
                src={data?.itemPic}
                width={320}
                height={215}
                style={{
                    objectFit: 'contain',
                  }}
                alt="Picture of the Items"
            />
            <Typography px={2} color={"black"} variant={"h5"}>
                {data?.itemName}
            </Typography>
            </Stack>
            <Stack spacing={1}>
            <Typography px={2} color={"purple"} variant={"h5"}>
                {price} ETH
            </Typography>
            <Stack 
            direction={"row"} 
            spacing={2} 
            justifyContent={'space-between'}
            justifyItems={'flex-end'}
            px={2}
            >
                <Typography  color={"black"} variant={"caption"}>
                    {days}
                </Typography>
                <Typography  color={"black"} variant={"caption"}>
                    {/* {data?.owner} */}
                    {data ? truncate(data?.owner,20):""}
                </Typography>
            </Stack>
            </Stack>
        </Stack>
        
    </Box>
    </CardActionArea>
  )
}

export default ItemCard