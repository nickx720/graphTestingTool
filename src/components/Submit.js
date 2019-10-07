import React, { useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextFields from './TextFields';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { CounterContext } from './JSONContext';

const useStyles = makeStyles(theme => ({
    button: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));

export default function Submit() {
    const { state, dispatch } = useContext(CounterContext);
    const classes = useStyles();
    const [stateSwitch, setStateSwitch] = React.useState({
        checkedA: true,
    });
    const [json, setJson] = React.useState('');

    const handleChange = name => event => {
        setStateSwitch({ ...stateSwitch, [name]: event.target.checked });
    };
    const handleSend = () => {
        console.log(stateSwitch.checkedA)
        dispatch({type: "updatejson", json: JSON.parse(json)});
        
    }
    return (
        <div>
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Switch checked={stateSwitch.checkedA} onChange={handleChange('checkedA')} value="checkedA" color="primary" />
                    }
                    label={stateSwitch.checkedA ? 'sync' : 'async'}

                />

            </FormGroup>
            <div>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                >
                    Clear
</Button>
                {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Icon>send</Icon>}
                    onClick={handleSend}
                >
                    Post
</Button>
                <TextFields setJson={setJson} />
            </div>
        </div>
    )
}


