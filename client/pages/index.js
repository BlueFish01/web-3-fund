import { Box, Stack } from "@mui/material";
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
      <ItemCard key={key} data={item} onClick={() => handleDetail(key)} />
    ));
  }, [data, setOpenModal]);

  const handleDetail = (key) => {
    setDetailData(data[key]);
    setOpenModal(true);
  };

  return (
    <Stack direction={"row"} spacing={4}>
      {listing}
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
    </Stack>
  );
}

export default Homepage;
