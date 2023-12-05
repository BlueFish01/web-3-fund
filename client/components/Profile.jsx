import { Box, Stack, Typography, Button, Grid, Container } from "@mui/material";
import { COLORS } from "./color";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faHandHoldingDollar,
} from "@fortawesome/free-solid-svg-icons";
import ProfileItemCard from "./ProfileItemCard";
import { useAddress } from "@thirdweb-dev/react";
import { WeiToETH } from '../utils'
import { useMemo, useState} from 'react'
import AddListingModal from "./AddListingModal";

function Profile({
  data,
  listing,
}) {
  const address = useAddress();
  const balance = WeiToETH(data?.balance);
  const hold = WeiToETH(data?.hold);
  const [openCreateListing,setOpenCreatelisting] = useState(false)

  let listingCount = 0;
  let ReportListingCount = 0;
  let borrowingCount = 0;

  const listings = useMemo(() => {
    if (listing) {
      return listing.map((item) => {
        if(item.isDeleted) return null;
        else{
          listingCount += 1;
          return(
            <Grid key={item.listingId} item xs={6}>
              <ProfileItemCard 
                name={item.itemName}
                isActive={item.isActive}
                isRented={item.isRented}
                isReturning={item.isReturning}
              />
            </Grid>

          )
        }
      });
    }
    return null; // Return a default value if 'listing' is falsy
  }, [listing]);

  const reportedListing = useMemo(()=>{
    if(listing){
      return listing.map((item)=>{
        if(item.isReported && !item.isDeleted){
          return(
            <Grid key={item.listingId} item xs={6}>
              <ProfileItemCard 
                name={item.itemName}
                isActive={item.isActive}
                isRented={item.isRented}
                isReturning={item.isReturning}
              />
            </Grid>
          )
        }else{
          return null;
        }
      })
    }
  },[listing])
  


  return (
    <Container width={"100%"}>
      <Stack flexGrow={1} direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"column"} justifyContent={"space-between"}>
          <Image
            src="https://www.cryptonomist.gr/wp-content/uploads/2022/01/FIW6rBzWUAMUzq1.jpeg"
            width={279}
            height={279}
            alt="profile picture"
          ></Image>
          <Stack
            flexGrow={1}
            alignItems={"flex-start"}
            justifyContent={"space-evenly"}
          >
            <Typography color={COLORS.gray} fontSize={"12px"} fontWeight={400}>
              {address}
            </Typography>
            <Typography fontSize={"32px"} fontWeight={600}>
              {data?.name || "unknown"}
            </Typography>
            <Typography fontSize={"20px"} fontWeight={400}>
              Score : {data?.scores.length}
            </Typography>
            <Stack direction={"row"} justifyContent={"space-around"}>
              <FontAwesomeIcon
                icon={faWallet}
                size="2xl"
                style={{ color: COLORS.darkgray }}
              />
              <Typography
                fontSize={"20px"}
                fontWeight={500}
                color={COLORS.darkgray}
                pl={2}
              >
                {balance} ETH
              </Typography>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <FontAwesomeIcon
                icon={faHandHoldingDollar}
                size="2xl"
                style={{ color: COLORS.darkgray }}
              />
              <Typography
                fontSize={"20px"}
                fontWeight={500}
                color={COLORS.darkgray}
                pl={2}
              >
                {hold} ETH
              </Typography>
            </Stack>
            <Button
              variant="contained"
              sx={{
                width: "279px",
                height: "52px",
                borderRadius: "15px",
                color: COLORS.white,
                bgcolor: COLORS.lightpurple,
                border: "3px",
                borderColor: "#C6A2F4",
                '&:hover': {
                  backgroundColor: COLORS.purple,
                },
              }}
              onClick={()=>setOpenCreatelisting(true)}
            >
              Add listing
            </Button>
            <Button
              variant="contained"
              sx={{
                width: "279px",
                height: "52px",
                borderRadius: "15px",
                color: COLORS.white,
                bgcolor: COLORS.lightpurple,
                border: "3px",
                borderColor: "#C6A2F4",
                '&:hover': {
                  backgroundColor: COLORS.purple,
                },
              }}
            >
              Edit Profile
            </Button>
          </Stack>
        </Stack>
        <Box
          sx={{
            bgcolor: COLORS.purple,
            width: "800px",
            height: "686px",
            borderRadius: "15px",
            p: 2,
            overflowY: "auto",
          }}
        >
          <Typography fontSize={"24px"} color={COLORS.white}>
            Borrowing
          </Typography>
          <Grid container spacing={2} pr={2} minHeight={"50px"}>
            {/* {listItemBorrow.map((borrowItem, index) => (
              <Grid key={index} item xs={6}>
                {borrowItem}
              </Grid>
            ))} */}
          </Grid>
          <Typography fontSize={"24px"} color={COLORS.white}>
            Reported
          </Typography>
          <Grid container spacing={2} pr={2} minHeight={"50px"}>
            {reportedListing}
          </Grid>
          <Typography fontSize={"24px"} color={COLORS.white}>
            Listings ({listingCount})
          </Typography>
          <Grid container spacing={2} p={2} minHeight={"50px"}>
            {listings}
          </Grid>
        </Box>
      </Stack>
      <AddListingModal
        open={openCreateListing}
        onClose={()=>setOpenCreatelisting(false)}
      />
    </Container>
  );
}

export default Profile;
