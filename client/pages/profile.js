import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Profile from "../components/Profile";
import { useContract, useContractRead, useAddress } from "@thirdweb-dev/react";
import { useEffect, useMemo, useState } from "react";

function Profilepage() {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

  const address = useAddress();

  const { data:ProfileData, isLoading:profileLoading } = useContractRead(
    contract,
    "getUser",
    [address]
  );

  const { data:UserListing, isLoading:listingLoading } = useContractRead(
    contract,
    "getUserListing",
    [address]
  );

  const { data:UserBorrowing, isLoading:BorrowingLoading } = useContractRead(
    contract,
    "getCurrentRenting",
    [address]
  );

  useEffect(() => {
    console.log("dataUser ",address, UserListing,UserBorrowing);
  }, [UserListing]);

  const profilePage = useMemo(() => {
    if(ProfileData && UserListing && UserBorrowing) {
    return(
    <Profile 
      data={ProfileData}
      listing={UserListing}
      borrowing={UserBorrowing}
    />)}
  }, [ProfileData,UserListing,UserBorrowing]);

  


  return (
  <>
    {address ? 
    profilePage
    :
    <Typography>Please connect wallet</Typography> 
    }
  </>);
}

export default Profilepage;
