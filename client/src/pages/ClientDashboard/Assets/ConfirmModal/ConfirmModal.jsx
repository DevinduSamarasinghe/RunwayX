import {
    Dialog,
    Box,
    DialogTitle,
    IconButton,
    DialogContent,
    Button,
} from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";

const ConfirmModal = (props) => {

    const { openAlert, setOpenAlert, confirm, setConfirm, heading, description } = props;

    return (
        <Dialog open={openAlert}>
            <Box sx={{ margin: "5px", textAlign: "center" }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: '-10px'
                    }}
                >
                    <IconButton onClick={() => setOpenAlert(false)}>
                        <ClearIcon />
                    </IconButton>
                </Box>
                <Box>
                    <DialogTitle fontSize={24} textAlign={'center'} fontWeight={'bold'}>
                        {(heading) ? `${heading}` : 'Confirm Action'}
                    </DialogTitle>
                    <DialogContent sx={{ textAlign: 'center' }}>
                        {(description) ? `${description}` : `Are you sure you want to perform this action?`}
                    </DialogContent>
                </Box>
                <Box
                    sx={{
                        margin: "40px",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Button
                        color="primary"
                        variant="outlined"
                        size="large"
                        sx={{ width: "150px" }}
                        onClick={() => setOpenAlert(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        onClick={async()=>{
                            await setConfirm(true);
                            setOpenAlert(false);
                        }}

                        sx={{ width: "150px" }}
                    >
                        Confirm
                    </Button>
                </Box>
            </Box>
        </Dialog>
    )
}

export default ConfirmModal