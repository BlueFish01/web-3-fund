import { Box, Stack, Grid } from "@mui/material";
import ItemCard from "../components/ItemCard";
import DetailModal from "../components/DetailModal";
import { useEffect, useMemo, useState } from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";

function Homepage() {
  const [openModal, setOpenModal] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  );

  const { data, isLoading } = useContractRead(
    contract,
    "getActiveListings",
    []
  );

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  const listing = useMemo(() => {
    return data?.map((item, key) => (
      <Grid item xs={4}>
        <ItemCard key={key} data={item} onClick={() => handleDetail(key)} />
      </Grid>
    ));
  }, [data, setOpenModal]);

  const handleDetail = (key) => {
    setDetailData(data[key]);
    setOpenModal(true);
  };

  return (
    <Box display={"flex"} height={"85vh"} overflow={'scroll'} p={4}>
      <Grid container spacing={1} rowSpacing={2} maxWidth={"1100px"}>
        {listing}
      </Grid>
      {detailData ? (
        <DetailModal
          open={openModal}
          data={detailData}
          onClose={() => {
            setOpenModal(false);
          }}
        />
      ) : (
        <></>
      )}
    </Box>
  );
}

export default Homepage;
