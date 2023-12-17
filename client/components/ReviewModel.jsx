import {
    Modal,
    Box,
    TextField,
    Rating,
    Stack,
    Typography,
    Button,
    Alert,
    AlertTitle,
} from "@mui/material";
import { useState } from "react";
import { COLORS } from "./color";
import { useForm, SubmitHandler } from "react-hook-form";
import { useContract, useContractWrite } from "@thirdweb-dev/react";


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "440px",
    bgcolor: "white",
    boxShadow: 24,
    borderRadius: "10px",
};

function ReviewModel({ open, onClose, id}) {

  const [star, setStar] = useState(0);

  const { register, handleSubmit } = useForm();
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
    const { mutateAsync: returnItem, isLoading } = useContractWrite(contract, "returnItem")

  const onSubmit = (formdata) => {
    const call = async () => {
      try {
        const data = await returnItem({ args: [id, star, formdata.review, true] });
        console.info("contract call successs", data);
        confirm("Return Success");
        window.location.reload();
      } catch (err) {
        console.error("contract call failure", err);
        alert("contract call failure", err)
      }
    }
    call();
  }

  return (
    <Modal open={open} onClose={() => {}}>
        <Box
          bgcolor={"white"}
          sx={style}
          flexDirection={"column"}
          justifyContent={"space-between"}
          display={"flex"}
          flex={1}
          p={3}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack direction={'column'} spacing={2}>
                <Typography gutterBottom>Rating</Typography>
                <Box flexGrow={1}>
                  <Rating
                      name="simple-controlled"
                      value={star}
                      onChange={(event, newValue) => {
                        setStar(newValue);
                      }}
                      size="large"
                      required
                  />
                </Box>
                <Typography gutterBottom>Review</Typography>
                <TextField
                 {...register("review", { required: true })}
                  multiline
                  rows={4}
                  label="review"
                  variant="outlined"
                  required
                />
                <Button 
                  variant="contained" 
                  type="submit"
                  sx={{
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
                  Submit
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={onClose}
                  sx={{
                    height: "52px",
                    borderRadius: "15px",
                    color: COLORS.lightpurple,
                    bgcolor: COLORS.white,
                    border: "2px solid",
                    borderColor: COLORS.lightpurple,
                    '&:hover': {
                      backgroundColor: COLORS.white,
                      border: "3px solid",
                      borderColor: COLORS.lightpurple,
                    },
                  }}
                >
                  Cancle
                </Button>
                
              </Stack>
              

            </form>
        </Box>
    </Modal>
  )
}

export default ReviewModel