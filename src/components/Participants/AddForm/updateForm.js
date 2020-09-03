import React from "react";
//import { useForm } from "react-hook-form";
import { Controller, useForm } from 'react-hook-form/dist/react-hook-form.ie11'
import ErrorMessage from '../../UI/Form/ErrorMessage/ErrorMessage';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import DateFnsUtils from '@date-io/date-fns';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '../../UI/Button/Button'
import Grid from '@material-ui/core/Grid';
import { DatePicker } from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  item: {
      marginTop: "10px"
  }

}));

export default function UpdateForm(props) {
    const classes = useStyles();

    const {
        register,
        handleSubmit,
        errors,
        setError,
        clearError,
        formState: { isSubmitting }
      } = useForm();

      /*
      const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
      const validateUserName = async value => {
        await sleep(1000);
        if (value !== "bill") {
          setError("username", "validate");
        } else {
          clearError("username");
        }
      };*/

      
      const [selectedDate, setSelectedDate] = React.useState(props.formValues.dateDeNaissance);
      

      const changeHandler = (e) => {
          //console.log(event.target.value)
        props.changed(e)
      }

      const dateFormat = (date) => {
        if(!date){
            return null;
        }
          const dateString = formatDate(date);
          //console.log("la date est " + date)
          const dateParts = dateString.split("/");
          // month is 0-based, that's why we need dataParts[1] - 1
          console.log(dateParts)
          return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
        }
      

      const formatDate = (date) => { 
        if (date !== null)
        if (date.valueOf() > 0) 
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
      }
      const changeDateHandler = (date) => {
        setSelectedDate(dateFormat(date))
        props.formValues.dateDeNaissance = date
        //console.log(formatDate(date))
    }
    
    
    console.log(props.formValues)
    
      return (

        <Grid container justify={'center'} spacing={3}>
            <h1>Modification d'un participant</h1>
            
            <form  onSubmit={handleSubmit(props.clicked)} style={{width: "80%"}}>
            <Grid item xs={12} sm={12} className={classes.item}>
                <FormControl fullWidth error={errors.nom ? true : false}>
                    <InputLabel htmlFor="nom">Name</InputLabel>
                    <Input
                    required
                    id="nom"
                    name="nom"
                    fullWidth
                    value={props.formValues.nom}
                    onChange={(e) =>changeHandler(e)}
                    inputRef={register({ required: true , minLength: 2})}
                    />
                    <FormHelperText  id="nom-text">
                        <ErrorMessage error={errors.nom} />
                    </FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} className={classes.item}>
                <FormControl fullWidth error={errors.prenom ? true : false}>
                    <InputLabel htmlFor="prenom">Prénom</InputLabel>
                    <Input
                    required
                    id="prenom"
                    name="prenom"
                    fullWidth
                    value={props.formValues.prenom}
                    onChange={props.changed}
                    inputRef={register({ required: true , minLength: 2})}
                    />
                    <FormHelperText  id="prenom-text">
                        <ErrorMessage error={errors.prenom} />
                    </FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} className={classes.item}>
                <FormControl fullWidth error={errors.email ? true : false}>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                    disabled
                    required
                    id="email"
                    name="email"
                    fullWidth
                    value={props.formValues.email}
                    onChange={props.changed}
                    inputRef={register({ required: true ,pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/})}
                    />
                    <FormHelperText  id="email-text">
                        <ErrorMessage error={errors.email} />
                    </FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} className={classes.item}>
            
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            required
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="DateDeNaissance"
                            name="dateDeNaissance"
                            label="Date De Naissance"
                            value={props.formValues.dateDeNaissance}
                            onChange={(date) => changeDateHandler(date)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        /> 
                    </MuiPickersUtilsProvider>
                
            </Grid>

            <Grid item xs={12} sm={12} className={classes.item} style={{margin: "40px 0"}}>
                <InputLabel id="sexe">Sexe</InputLabel>
                <Select
                    style={{width: "100px"}}
                    labelId="sexe"
                    id="sexe"
                    name="sexe"
                    value={props.formValues.sexe}
                    onChange={props.changed}
                    required
                >
                    <MenuItem value={"masculin"}>Masculin</MenuItem>
                    <MenuItem value={"feminin"}>Féminin</MenuItem>
                    <MenuItem value={""}></MenuItem>
                </Select>
            </Grid>
            
            <Grid item xs={12} sm={12} className={classes.item}>
                <FormControl >
                    <FormLabel component="legend">Situation famliale</FormLabel>
                    <RadioGroup 
                        id="situationF"
                        aria-label="situation familiale" 
                        name="situationF"
                        value={props.formValues.situationF}
                        onChange={props.changed}
                        inputRef={register({ required: true })}>
                        <FormControlLabel value="celibataire" control={<Radio />} label="Celibataire" />
                        <FormControlLabel value="marié" control={<Radio />} label="Marié" />
                        <FormControlLabel value="divorcé" control={<Radio />} label="Divorcé" />
                    </RadioGroup>
                    <FormHelperText  id="situationF-text">
                        <ErrorMessage error={errors.situationF} />
                    </FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} className={classes.item} style={{margin: "40px 0"}}>
                <InputLabel id="actif">Etat</InputLabel>
                <Select
                    style={{width: "100px"}}
                    labelId="actif"
                    id="actif"
                    name="actif"
                    value={props.formValues.actif}
                    onChange={props.changed}
                    required
                >
                    <MenuItem value={1}>Actif</MenuItem>
                    <MenuItem value={0}>Inactif</MenuItem>
                    <MenuItem value={""}></MenuItem>
                </Select>
            </Grid>

            <Grid item xs={12} sm={12} className={classes.item}>
                <FormControlLabel
                    control={
                        <Checkbox
                            required
                            //checked={state.checkedB}
                            //onChange={props.changed}
                            name="check"
                            color="primary"
                        />
                    }
                    label="Je vous fais confiance!"
                />
            </Grid>
                
            <Button btnType="Success" className={classes.item}>Modifier</Button>
            </form>
        </Grid>
      );
}