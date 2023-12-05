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

function ProfileItemCard({
    name,
    isActive,
    isRented,
    isReturning,
}){
    //let status = props.itemStatus
    let status = '';
    if(isActive && !isRented && !isReturning){
        status = "active"
    }
    // if(isActive==true&&isRented==true&&isReturning==false){
    //     status = "rented"
    // }

    // if(isActive==true&&isRented==true&&isReturning==true){
    //     status = "returned"
    // }
    // if(isActive==false){
    //     status = "inactive"
    // }

    const cardStatus = {
        "borrow" : {
            key: 1,
            icon: faArrowRightArrowLeft,
            iconColor: "white",
            textColor: "#D85A5A"
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
            iconColor: "white",
            textColor: "#93CFC6",
            onClickFn : ()=>{},
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
                    <Typography px={1} pb={1} color={cardStatus[status]?.textColor} variant={"h6"}>
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
                <IconButton>
                    <FontAwesomeIcon 
                        icon={cardStatus[status]?.icon} size={"lg"} color={cardStatus[status]?.iconColor}
                    />
                </IconButton>
                
        </Box>
    )
}

export default ProfileItemCard