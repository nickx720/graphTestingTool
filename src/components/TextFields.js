import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    height: 'auto'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
    width: 'auto',
    height: 'auto'
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

const TextFields = params => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: 'Enter Your JSON',
  });

  const handleChange = (name, params) => event => {
    setValues({ ...values, [name]: event.target.value });
    params.setJson(event.target.value);
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextareaAutosize
        rows="4"
        placeholder={values.name}
        className={classes.textField}
        margin="normal"
        onChange={handleChange('name', params)}
      />
    </form>
  );
}

export default TextFields;