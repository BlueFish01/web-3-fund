import { Box, Typography, Stack, CardActionArea, Button } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft,faStopCircle, faExclamationCircle, faTrash, faPlay } from "@fortawesome/free-solid-svg-icons";

function ProfileItemCard(props){
    // let status = props.itemStatus
    let status = "inactive"  //status = "brrow", "report", "active", "inactive"
    const cardStatus = {
        "borrow" : {
            icon: faArrowRightArrowLeft,
            iconColor: "white",
            textColor: "#D85A5A"
        },
        "report" : {
            icon: faExclamationCircle,
            iconColor: "#C85A5A",
            textColor: "#C85A5A"
        },
        "active": {
            icon: faStopCircle,
            iconColor: "white",
            textColor: "#93CFC6"
        },
        "inactive": {
            icon: faTrash,
            iconColor: "white",
            textColor: "#9F9F9F"
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
        >
                <Stack width={"90%"}>
                    <Typography px={1} pt={1} color={"white"} variant={"h6"}>
                        iMacPro
                    </Typography>
                    <Typography px={1} pb={1} color={cardStatus[status].textColor} variant={"h6"}>
                        2 days
                    </Typography>
                </Stack>
                <Button
                    px={1}
                >
                    <FontAwesomeIcon 
                        icon={cardStatus[status].icon} size={"2xl"} color={cardStatus[status].iconColor}/>
                </Button>
               
        </Box>
    )
}

export default ProfileItemCard