import { Box, Typography, Button, Stack } from "@mui/material";
import { ConnectWallet } from "@thirdweb-dev/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useConnectionStatus } from "@thirdweb-dev/react";
import Link from 'next/link'
import Image from 'next/image' 

function Nevbar() {
  const connectionStatus = useConnectionStatus();
  return (
    <Box
      height={"80px"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack
        direction={"row"}
        width={"80%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Link href={"/"}>
          {/* <Typography color={"white"} variant={"h3"}>
            LOGO
          </Typography> */}
          <Image
            src="/images/icon.png"
            width={100}
            height={100}
            alt="app icon"
          />
        </Link>
        <Stack direction={"row"} spacing={2}>
          <ConnectWallet modalSize="compact" />
          {connectionStatus === "connected" ? (
            <Link href={"/profile"}>
              <Button
                variant="outlined"
                sx={{
                  height: "63px",
                  width: "63px",
                  color: "white",
                  borderColor: "white",
                  border: "1px solid",
                  borderRadius: "10px",
                  "&:hover": {
                    borderColor: "white",
                    border: "2px solid",
                    borderRadius: "10px",
                  },
                }}
              >
                <FontAwesomeIcon icon={faUser} size={"2xl"} />
              </Button>
            </Link>
          ) : (
            <></>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}

export default Nevbar;
