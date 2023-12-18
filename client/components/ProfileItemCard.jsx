import { 
    Box, 
    Typography, 
    Stack, 
    CardActionArea, 
    Button,
    IconButton,

} from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faArrowRightArrowLeft,faStopCircle, 
    faExclamationCircle, 
    faTrash, 
    faPlay,
    faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";
import {dayLeft} from "../utils"
import ReviewModel from "./ReviewModel";
import { useState } from "react";
import { useContract, useContractWrite } from "@thirdweb-dev/react";

function ProfileItemCard({
    id,
    name,
    isActive,
    isRented,
    isReturning,
    borrow,
    endDate,
}){
    //let status = props.itemStatus
    const [openReview,setOpenReview] = useState(false);

    const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
    const { mutateAsync: receivedItem, isLoading:recivedLoading } = useContractWrite(contract, "receivedItem");
    const { mutateAsync: deleteListing, isLoading:deleteLoading } = useContractWrite(contract, "deleteListing");
    const { mutateAsync: deactivateListing, isLoading:deactivateLoading } = useContractWrite(contract, "deactivateListing");
    const { mutateAsync: reportNotReturnItem, isLoading:reportLoading } = useContractWrite(contract, "reportNotReturnItem")

    let status = '';
    if(isActive && !isRented && !isReturning){
        status = "active"
    }
    if(isActive==true&&isRented==true&&isReturning==false&&!borrow){
        status = "rented"
    }

    if(isActive==true&&isRented==true&&isReturning==true){
        status = "returned"
    }
    if(isActive==false){
        status = "inactive"
    }
    if(borrow){
        status = "borrow"
    }

    const cardStatus = {
        "borrow" : {
            status: isReturning ? "returning" : endDate ? dayLeft(endDate) : '',
            key: 1,
            icon: isReturning ? null : faArrowRightArrowLeft,
            iconColor: "white",
            textColor: isReturning ? "#93CFC6" : "#D85A5A",
            onClickFn : ()=>{setOpenReview(true)},
        },
        "report" : {
            key: 2,
            icon: faExclamationCircle,
            iconColor: "#C85A5A",
            textColor: "#C85A5A"
        },
        "active": {
            status: "active",
            key: 3,
            icon: faStopCircle,
            iconColor: "#C85A5A",
            textColor: "#93CFC6",
            onClickFn : ()=>{handleDeactivate()},
        },
        "inactive": {
            status: "inactive",
            key: 4,
            icon: faTrash,
            iconColor: "white",
            textColor: "#9F9F9F",
            onClickFn : ()=>{handleDelete()},
        },
        "rented":{
            status: "rented",
            key: 4,
            icon: faExclamationCircle,
            iconColor: "#C85A5A",
            textColor: "#93CFC6",
            onClickFn : ()=>{handleReport()},
        },
        "returned":{
            status: "returned",
            key: 4,
            icon: faMoneyBillTransfer,
            iconColor: "white",
            textColor: "#93CFC6",
            onClickFn : ()=>{handleRecived()},
        }
    }

    const handleRecived = () => {
        const call = async () => {
            try {
                const data = await receivedItem({ args: [id] });
                console.info("contract call successs", data);
                confirm("Recieved Success");
                window.location.reload();
            } catch (err) {
                alert(err);
                console.error("contract call failure", err);
            }
        }
        call();
    }

    const handleDelete = () => {
        const call = async () => {
            try{
                const data = await deleteListing({ args : [id]});
                console.info("contract call successs", data);
                confirm("Delete success");
                window.location.reload();
            }catch (err) {
                alert(err);
                console.error("contract call failure", err)
            }
        }
        call();
    }

    const handleDeactivate = () => {
        const call = async () => {
            try{
                const data = await deactivateListing({ args : [id]});
                console.info("contract call successs", data);
                confirm("Deactivate success");
                window.location.reload();
            }catch (err) {
                alert(err);
                console.error("contract call failure", err)
            }
        }
        call();
    }

    const handleReport = () => {
        const call = async () => {
            try{
                const data = await reportNotReturnItem({ args : [id]})
                console.info("contract call successs", data);
                confirm("report success");
                window.location.reload();
            }catch (err) {
                alert(err);
                console.error("contract call failure", err)
            }
        }
        call();
    };

    return (
        <Box
            height={"68px"}
            width={"350px"}
            bgcolor={"#5A5A5A"}
            display={"flex"}
            borderRadius={"15px"}
            justifyContent={"space-between"}
            alignItems={"center"}
            pl={2}
            pr={1}
        >
                <Stack width={"90%"}>
                    <Typography fontSize={16} px={1} pt={1} color={"white"} variant={"h6"}>
                        {name}
                    </Typography>
                    <Typography px={1} pb={1} fontSize={borrow ? "14px" : "18px"} color={cardStatus[status]?.textColor} variant={"h6"}>
                        {cardStatus[status]?.status}
                    </Typography>
                </Stack>
                <IconButton
                    onClick={cardStatus[status]?.onClickFn}
                    disabled={borrow && isReturning}
                >
                    <FontAwesomeIcon 
                        icon={cardStatus[status]?.icon} size={"lg"} color={cardStatus[status]?.iconColor}
                    />
                </IconButton>
                <ReviewModel 
                    open={openReview} 
                    onClose={()=>{setOpenReview(false)}}
                    id={id}
                />
        </Box>
        
    )
}

export default ProfileItemCard