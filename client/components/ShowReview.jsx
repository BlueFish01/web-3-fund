import {
    Box,
    Modal,
    Stack,
    Divider,
    IconButton,
    Typography,
    Button,
} from "@mui/material";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "440px",
    height: "650px",
    bgcolor: "white",
    boxShadow: 24,
    borderRadius: "10px",
    paddingBottom: "0px",
  };
import { useEffect, useMemo, useState } from "react";
import { COLORS } from "./color";

function ShowReview({open,onClose,id}) {

  const { contract } = useContract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  );
  const { data, isLoading } = useContractRead(contract, "getUser", [id]);
  console.log("review",data)

  const ReviewCard = (data) => {
    const cards = [];
  
    for (let i = 0; i < data?.reviewers.length; i++) {
      cards.push(
        <Stack 
        key={i} 
        direction={"column"}
        sx={{
          borderRadius:"10px",
          border: `1px solid ${COLORS.purple}`,
          
        }}
        p={1}
        >
          <Typography>{data?.reviewers[i]}</Typography>
          <Typography>{data?.reviews[i]}</Typography>
          <Typography>score : {data?.scores[i].toNumber()}</Typography>
        </Stack>
      );
    }
    console.log("card",cards)
    return cards;
  };

  const listReview = useMemo(()=>{
    if(data?.length==0){
      return (
        <Typography textAlign={'center'}>No data</Typography>
      )
    }else{
      const review = ReviewCard(data);
      return review.map((item, index) => (
        <Box key={index}>{item}</Box>
      ));
      
    }
    
  },[data,open])

  return (
    <Modal open={open} onClose={() => {}}>
        <Box
        bgcolor={"white"}
        sx={style}
        flexDirection={"column"}
        justifyContent={"flex-start"}
        display={"flex"}
        flex={1}
        p={3}
        rowGap={2}
        >
          <Stack direction={'row'} justifyContent={"space-between"}>
          <Typography>Review</Typography>
          <IconButton
            onClick={onClose}
            sx={{
              width: "24px",
              height: "24px",
              alignSelf: "flex-end",
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
          </Stack>
          
          {isLoading ?
            <Typography>Loading</Typography>:
            <Stack direction={"column"} spacing={1}>
              {listReview}
            </Stack>
            
          }
            
        </Box>
    </Modal>
  )
}

export default ShowReview

