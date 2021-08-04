import Navbar from "../navigation/Navbar";
import { makeStyles} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    
}));

export default function Home(){
    const classes = useStyles();
    return(
        <div>
            <Navbar/>
            <Typography>Checking</Typography>
        </div>
    );
}