import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Grid, TextField, Button, Select } from "@mui/material";
import { DropzoneArea } from "material-ui-dropzone";
import Swal from "sweetalert2";
import { postDataImage, getData, postData } from "../FetchNodeServices";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

const useStyles = makeStyles({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    subdiv: {
        background: "#7ed6df",
        padding: 20,
        width: 700,
        marginTop: 50,
    },
});

export default function Banner() {
    const classes = useStyles();
    const [Files, setFiles] = useState([])
    const [BannerStatus, setBannerStatus] = React.useState("");

    const handleBannerChange = (event) => {
        setBannerStatus(event.target.value);

    };

    // const Input = styled("input")({
    //     display: "none",
    // });

    const handleSubmit = async () => {
        var formData = new FormData();
        formData.append("bannerstatus", BannerStatus);
        Files.map((file, index) => {
            formData.append("images" + index, file)
        })
        var result = await postDataImage("banner/savebannerimages", formData);
        if (result.result) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your Product has been saved",
                showConfirmButton: false,
                timer: 3000,
            });
        } else {
            Swal.fire({
                position: "top-end",
                icon: "fail",
                title: "Fail to Save Product",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const handleimage = (files) => {
        setFiles(files)
    }

    return (
        <div className={classes.root}>
            <style jsx>
                {`
          fieldset.MuiOutlinedInput-notchedOutline {
            border-color: white !important;
          }

          svg.MuiSvgIcon-root {
            color: white !important;
          }

          div.MuiOutlinedInput-input.MuiSelect-select {
            color: #fff !important;
          }
        `}
            </style>
            <div className={classes.subdiv} >
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{ fontSize: 20, fontWeight: "bold", color: "#FFF" }}>
                        Banners
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel style={{ color: "#FFF" }} id="demo-simple-select-label">
                                Banner Status
                            </InputLabel>
                            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={BannerStatus} label="Banner Status" onChange={handleBannerChange}>
                                <MenuItem value={"continue"}>Continue</MenuItem>
                                <MenuItem value={"discontinue"}>Discontinue</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <DropzoneArea
                            acceptedFiles={['image/jpeg', 'image/png']}
                            onChange={handleimage}
                            filesLimit={6}
                            maxFileSize={5000000}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <Button
                            onClick={() => handleSubmit()}
                            style={{
                                background: "#FFF",
                                color: "#7ed6df",
                                fontWeight: "bold",
                            }}
                            variant="contained"
                            fullWidth
                        >
                            Submit
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            style={{
                                background: "#FFF",
                                color: "#7ed6df",
                                fontWeight: "bold",
                            }}
                            variant="contained"
                            fullWidth
                        >
                            Reset
                        </Button>
                    </Grid>
                </Grid>
            </div >
        </div >

    )
}

