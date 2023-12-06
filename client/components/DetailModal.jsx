import {
  Box,
  Modal,
  Stack,
  Divider,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { WeiToETH, msTodhm } from "../utils";
import { Web3Button, darkTheme, useContract, useContractWrite } from "@thirdweb-dev/react";
import { COLORS } from "./color";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "880px",
  height: "650px",
  bgcolor: "white",
  boxShadow: 24,
  borderRadius: "10px",
  paddingBottom: "0px",
};

function DetailModal({ open, onClose, data }) {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
    const { mutateAsync: rent, isLoading } = useContractWrite(contract, "rent");
  
  const price = WeiToETH(data?.price);
  const deposit = WeiToETH(data?.deposit);
  const total = WeiToETH(data?.price.add(data?.deposit));

  const ms = parseInt(data?.duration.toString());
  const days = msTodhm(ms);

  const rentHandle = (listingId) => {
    const call = async () => {
      try {
        const data = await rent({ args: [listingId] });
        console.info("contract call successs", data);
        confirm("Rent Success");
        window.location.reload();
      } catch (err) {
        alert("contract call failure",err)
        console.error("contract call failure", err);
      }
    }
    call();
  }

  return (
    <Modal open={open} onClose={() => {}}>
      <Box
        bgcolor={"white"}
        sx={style}
        flexDirection={"row"}
        display={"flex"}
        flex={1}
        justifyContent={"space-between"}
      >
        <Stack flexGrow={1} py={2}>
          <Typography variant="h4" px={3}>
            {data?.itemName}
          </Typography>
          <Image
            src={data?.itemPic}
            width={580}
            height={310}
            style={{
              objectFit: "contain",
            }}
            alt="Picture of the Items"
          />
          <Stack flexGrow={1} flex={1} pt={1} width={"580px"}>
            <Typography variant="body1" px={3} sx={{ wordBreak: "break-word" }}>
              {data?.itemDescription}
            </Typography>
          </Stack>
          <Typography variant="subtitle" px={3} gutterBottom>
            History : {data?.history.length}
          </Typography>
          <Typography variant="subtitle" px={3}>
            owner : {data?.owner}
          </Typography>
        </Stack>
        <Divider orientation="vertical" flexItem bgcolor={"black"} />
        <Stack
          width={"300px"}
          flexGrow={1}
          height={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          px={1}
          py={1}
        >
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
          <Stack direction={"column"} spacing={2} px={1}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography variant="h5">price</Typography>
              <Stack direction={"column"} spacing={1} alignItems={"flex-end"}>
                <Typography variant="h5">{price} ETH</Typography>
                <Typography variant="subtitle">{days}</Typography>
              </Stack>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography variant="h5">deposit</Typography>
              <Typography variant="h5">{deposit} ETH</Typography>
            </Stack>
            <Divider />
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography variant="h5">total</Typography>
              <Typography variant="h5">{total} ETH</Typography>
            </Stack>
            <Web3Button
              contractAddress={process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}
              theme={darkTheme({
                fontFamily: "Inter, sans-serif",
                colors: {
                  modalBg: "#000000",
                  accentText: 'rgb(128,208,145)',
                  // ... etc
                },
              })}
              action={(contract) => {
                rentHandle(data?.listingId)
              }} // Logic to execute when clicked
              style={{ color: COLORS.white, background: COLORS.purple }}
            >
              Rent
            </Web3Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}

export default DetailModal;
