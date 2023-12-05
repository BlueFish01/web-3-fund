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
    []
  );

  const { data:UserListing, isLoading:listingLoading } = useContractRead(
    contract,
    "getUserListing",
    []
  );

  useEffect(() => {
    console.log("data", UserListing);
  }, [UserListing]);

  const profilePage = useMemo(() => {
    if(ProfileData && UserListing) {
    return(
    <Profile 
      data={ProfileData}
      listing={UserListing}
    />)}
  }, [ProfileData,UserListing]);

  


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
