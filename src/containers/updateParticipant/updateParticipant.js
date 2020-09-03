import React, { Component } from 'react';
import axios from '../../axios-participants';
import AddForm from '../../components/Participants/AddForm/AddForm'
import UpdateForm from '../../components/Participants/AddForm/updateForm';

class UpdateParticipant extends Component {
    state = {
        participant: {
            id: 0,
            nom: '',
            prenom: '',
            email: '',
            dateDeNaissance: null,
            sexe: '',
            situationF: 'celibataire',
            actif: 0
        },
        formIsValid: false
    }
    
    getParticipant = (id) => {
        axios.get('/participant.php?id=' + id)
            .then(response => {
                console.log("reponse serveur")
                console.log(response.data)
                let participant = {
                    ...response.data
                }
                participant.dateDeNaissance = this.dateFormat(participant.dateDeNaissance);
                this.setState({participant: participant})  
            }
            )
            .catch(function (error) {
            // handle error
            console.log(error);
            })
    }
    componentDidMount () {
        const query = new URLSearchParams(this.props.location.search);
        
        let id = 0;
        for (let param of query.entries()) {
            if (param[0] === 'id') {
                id = param[1]
            } 
        }
        this.getParticipant(id)
    }

    dateFormat = (date) => {
        if(!date){
            return null;
        }
          const dateString = date;
          //console.log("la date est " + date)
          const dateParts = dateString.split("/");
          // month is 0-based, that's why we need dataParts[1] - 1
          console.log(dateParts)
          return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
    }

    inputChangeHandler = (event) => {
       //console.log(event.target.value)
        const inputID = event.target.name;
        let updatedParticipant = {
            ...this.state.participant
        }
        //console.log(updatedParticipant)
        let updatedForm = {
            ...updatedParticipant[inputID]
        }
        updatedForm = event.target.value;
        updatedParticipant[inputID] = updatedForm
        
        this.setState({participant: updatedParticipant})
        //console.log(this.state.participant)

    }

    submitHandler = () => {
        
        const participant = {
            ...this.state.participant
        }
        participant.dateDeNaissance = this.formatDate(participant.dateDeNaissance)
        console.log(this.state.participant)
        axios.post( '/update.php', participant )
            .then( response => {
                console.log(response.data)
                //this.setState( { loading: false } );
                //this.props.history.push( '/' );
            } )
            .catch( error => {
                console.log(error)
                //this.setState( { loading: false } );
            } );
        this.props.history.replace('/');
    }

    dateHandler = (date) => {
        const updatedParticipant = {
            ...this.state.participant
        }
        updatedParticipant.dateDeNaissance = date
        this.setState({participant: updatedParticipant})
        //console.log("parent date" + date)
    }

    formatDate = (date) => { 
        if (date !== null)
        if (date.valueOf() > 0) 
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    }
    render () {
        return (
            <div >
                <UpdateForm
                formValues={this.state.participant}
                changed={(e) =>this.inputChangeHandler(e)}
                clicked={this.submitHandler}
                dateC={(date) => this.dateHandler(date)}
                />
                
            </div>
        );
    }
}

export default UpdateParticipant;