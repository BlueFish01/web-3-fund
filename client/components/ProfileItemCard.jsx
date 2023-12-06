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

function ProfileItemCard({
    name,
    isActive,
    isRented,
    isReturning,
    borrow,
    endDate,
}){
    //let status = props.itemStatus
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
            status: endDate ? dayLeft(endDate) : '',
            key: 1,
            icon: faArrowRightArrowLeft,
            iconColor: "white",
            textColor: "#D85A5A",
            onClickFn : ()=>{console.log("return")},
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
            onClickFn : ()=>{console.log("deactivate")},
        },
        "inactive": {
            status: "inactive",
            key: 4,
            icon: faTrash,
            iconColor: "white",
            textColor: "#9F9F9F"
        },
        "rented":{
            status: "rented",
            key: 4,
            icon: null,
            iconColor: "white",
            textColor: "#93CFC6"
        },
        "returned":{
            status: "returned",
            key: 4,
            icon: faMoneyBillTransfer,
            iconColor: "white",
            textColor: "#93CFC6"
        }
    }

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
                    <Typography px={1} pt={1} color={"white"} variant={"h6"}>
                        {name}
                    </Typography>
                    <Typography px={1} pb={1} fontSize={borrow ? "14px" : "18px"} color={cardStatus[status]?.textColor} variant={"h6"}>
                        {cardStatus[status]?.status}
                    </Typography>
                </Stack>
                {status === 'returned' ? 
                <IconButton>
                    <FontAwesomeIcon 
                        icon={faStopCircle} size={"lg"} color={"#C85A5A"}
                    />
                </IconButton>
                :null
                }
                <IconButton
                    onClick={cardStatus[status]?.onClickFn}
                >
                    <FontAwesomeIcon 
                        icon={cardStatus[status]?.icon} size={"lg"} color={cardStatus[status]?.iconColor}
                    />
                </IconButton>
                
        </Box>
    )
}

export default ProfileItemCard