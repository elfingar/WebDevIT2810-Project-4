import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Grid from "@material-ui/core/Grid/Grid";
import ButtonBase from "@material-ui/core/ButtonBase/ButtonBase";
import BottleWine from 'mdi-material-ui/BottleWine';
import Typography from "@material-ui/core/Typography/Typography";
import {withStyles} from "@material-ui/core";
import PropTypes from 'prop-types';
import FavoriteHeart from "../Components/FavoriteHeart";

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        top: 100,
        left: 500,
        right: 0,
        margin: 0,
    },
    image: {
        width: 256,
        height: 256,
        justify: "flex-start",
        alignItems: "flex-start",
        borderBottomColor: '#ddd',
        borderBottomWidth: 2,
    },
    sideBox3: {
        height: 40,
        width:80,
    },
    sideBox1: {
        height: 100,
        width: 80,
    },
    sideBox2: {
        height: 40,
        width: 40,
    },
});

/*
*   DETAILS PAGE:
*   Details page uses the material-ui modal and some other components for easy styling.
*   The component has open and close functions for the modal.
*   Other than this everything is sent to the component from simplePage.
*/

class DetailsPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = ({
            openModal: false,
        })
    }

    handleOpen = () =>{
        this.setState({
            openModal: true
        })
    };

    handleClose= () =>{
        this.setState({
            openModal: false
        })
    };

    render() {
        const{classes, title, isFav, aroma, country, taste, abv} = this.props;
        return (
            <div>
                <Button className="modalButton" onClick={this.handleOpen}>Mer Info</Button>
                <Grid>
                    <div>
                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.openModal}
                            onClose={this.handleClose}
                            style={{alignItems: 'center', justifyContent: 'center'}}
                        >
                            <div className={classes.paper}>
                                <Grid>
                                    <Grid item container direction={"row-reverse"}><FavoriteHeart isFav={isFav}/></Grid>
                                    <Grid container spacing={16} alignItems={"center"} alignContent={"center"}>
                                        <Grid item xs={6}>
                                            <ButtonBase className={classes.image}>
                                                <BottleWine style={{fontSize: 256}}/>
                                            </ButtonBase>
                                        </Grid>

                                        <Grid item xs={6}>

                                            <Grid direction={"column"} justify={"center"} container item xs={12} alignItems={"center"}>
                                                <Grid item xs={4} className={classes.sideBox3} >
                                                    Opprinnelsesland: {country}
                                                </Grid>
                                                <Grid className={classes.sideBox3} item xs={4}>
                                                    {abv}%
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid>
                                    <Typography gutterBottom variant="h5">{title}</Typography>
                                    <Typography gutterBottom variant="body1">{aroma}{taste}</Typography>
                                </Grid>
                            </div>
                        </Modal>
                    </div>
                </Grid>
            </div>
        );
    }

}

DetailsPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetailsPage);

