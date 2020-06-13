// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import MaskedInput from 'react-text-mask';
import ruLocale from "date-fns/locale/ru";
import DateFnsAdapter from "@material-ui/pickers/adapter/date-fns";
import { DatePicker, LocalizationProvider } from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

export function FormsTab()  {
    const classes = useStyles();

    const [entity, setEntity] = React.useState({
        textValue: '',
        selectedDate: new Date('2014-08-18T21:11:54'),
        gender: 'female',
        age: '',
        phone: {
            textmask: '+7 (   )    -  -  ',
            numberformat: '1320',
        }
    });
    const updateEntity = (field: string, value: any ) => {
        console.log('Previous entity: ', entity);
        console.log(`New value - [${field}]: ${value}`)
        setEntity({
            ...entity,
            [field]: value
        });
    }
    const handleEntityChange = (event) => {
        updateEntity(event.target.name, event.target.value)
    };
    const handleFieldChange = (field) => (value) => {
        updateEntity(field, value)
    };
    const handlePhoneChange = (event) => {
        updateEntity("phone", {
            ...entity.phone,
            textmask: event.target.value,
        });
    };

    const [errors, setErrors] = React.useState({});
    const onSubmit = (event) => {
        const newErrors = {}
        if (!entity.textValue) {
            newErrors.textValue = 'Заполните поле';
        }
        setErrors(newErrors);

        event.preventDefault();
        // Send entity by REST here
    };

    return <form className={classes.root} noValidate autoComplete="off">
        <Grid container spacing={5} direction="column" alignItems="center" className={ classes.root }>
            <Grid container direction="column" xs={3} className={ classes.root }>
                <TextField required id="outlined-basic" name="textValue" label="Текст" variant="outlined"
                           value={entity.textValue}
                           onChange={handleEntityChange}
                           error={!!errors.textValue}
                           helperText={errors.textValue}/>
                <TextField id="outlined-basic" label="Только цифры" type="number" variant="outlined" InputLabelProps={{
                    shrink: true,
                }}/>
                <FormControl>
                    <InputLabel htmlFor="formatted-text-mask-input">Телефон</InputLabel>
                    <Input
                        value={entity.phone.textmask}
                        onChange={handlePhoneChange}
                        name="phone"
                        id="formatted-text-mask-input"
                        inputComponent={TextMaskCustom}
                    />
                </FormControl>
                <LocalizationProvider dateAdapter={DateFnsAdapter} locale={ruLocale}>
                    <DatePicker
                        renderInput={props => <TextField {...props} />}
                        value={entity.selectedDate}
                        name="selectedDate"
                        inputFormat="yyyy.MM.dd"
                        mask="____.__.__"
                        onChange={handleFieldChange("selectedDate")}
                    />
                </LocalizationProvider>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Настройки</FormLabel>
                    <FormGroup row>
                        <FormControlLabel
                            control={<Checkbox name="checkedA" />}
                            label="Secondary"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="Primary"
                        />
                    </FormGroup>
                </FormControl>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup aria-label="gender" name="gender" value={entity.gender} onChange={handleEntityChange}>
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
                    </RadioGroup>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={entity.age}
                        name="age"
                        onChange={handleEntityChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>


                <FormGroup row className={ classes.root }>
                    <Button color="secondary" variant="contained">Cancel</Button>
                    <Button color="primary" variant="contained" type="submit" onClick={ onSubmit }>Submit</Button>
                </FormGroup>
            </Grid>
        </Grid>
    </form>;
}