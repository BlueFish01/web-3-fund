import React from "react";
import {
  Modal,
  Box,
  TextField,
  Stack,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";
import { COLORS } from "./color";
import { useForm, SubmitHandler } from "react-hook-form";
import { useContract, useContractWrite } from "@thirdweb-dev/react";

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

function AddListingModal({ open, onClose }) {
  const { register, handleSubmit } = useForm();

  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

  const { mutateAsync: createListing, isLoading } = useContractWrite(
    contract,
    "createListing"
  );

  const onSubmit = (formData) => {
    const call = async () => {
      try {
        const data = await createListing({
          args: [
            formData._price,
            formData._deposit,
            formData._duration,
            formData._itemName,
            formData._itemDescription,
            formData._itemPic,
          ],
        });
        console.info("contract call successs", data);
        confirm("Create Listing Success");
        window.location.reload();
      } catch (err) {
        alert(err)
        console.error("contract call failure", err);
      }
    };

    call();
  };

  return (
    <Modal open={open} onClose={() => {}}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          bgcolor={"white"}
          sx={style}
          flexDirection={"column"}
          justifyContent={"space-between"}
          display={"flex"}
          flex={1}
          p={3}
        >
          <Stack direction={"column"} spacing={2} justifyContent={"flex-start"}>
            <TextField
              {...register("_price", { required: true })}
              type="number"
              label="Price (Wei)"
              variant="outlined"
              required
            />
            <TextField
              {...register("_deposit", { required: true })}
              type="number"
              label="Deposit (Wei)"
              variant="outlined"
              required
            />
            <TextField
              {...register("_duration", { required: true })}
              type="number"
              label="Duration (Sec)"
              variant="outlined"
              required
            />
            <TextField
              {...register("_itemName", { required: true })}
              label="Item Name"
              variant="outlined"
              required
            />
            <TextField
              {...register("_itemDescription", { required: true })}
              multiline
              rows={4}
              label="Item Description"
              variant="outlined"
              required
            />
            <TextField
              {...register("_itemPic", { required: true })}
              label="Picture Url"
              variant="outlined"
              required
            />
          </Stack>
          <Stack
            direction={"row"}
            spacing={2}
            justifyContent={"flex-end"}
            pb={3}
          >
            <Button
              variant="outlined"
              sx={{
                width: "150px",
                height: "52px",
                borderRadius: "15px",
                color: COLORS.lightpurple,
                //bgcolor: COLORS.lightpurple,
                border: "1px solid",
                borderColor: COLORS.lightpurple,
                "&:hover": {
                  border: "3px solid",
                  borderColor: COLORS.purple,
                  color: COLORS.purple,
                },
              }}
              onClick={onClose}
            >
              cancle
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{
                width: "150px",
                height: "52px",
                borderRadius: "15px",
                color: COLORS.white,
                bgcolor: COLORS.lightpurple,
                border: "3px",
                borderColor: "#C6A2F4",
                "&:hover": {
                  backgroundColor: COLORS.purple,
                },
              }}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </form>
    </Modal>
  );
}

export default AddListingModal;
