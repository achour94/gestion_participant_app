import React, { Component } from 'react';
import axios from '../../axios-participants';
import AddForm from '../../components/Participants/AddForm/AddForm'

class AddParticipant extends Component {
    state = {
        participant: {
            nom: '',
            prenom: '',
            email: '',
            dateDeNaissance: null,
            sexe: '',
            situationF: 'celibataire'
        },
        formIsValid: false
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
    checkEmail = async (mail) => {
        let exist = false;
        await axios.get('/existMail.php?email=' + mail)
        .then(response => { exist = response.data.message}
        )
        .catch(function (error) {
        // handle error
        console.log(error);
        })
        return exist
    }

    submitHandler = () => {
        console.log(this.state.participant)
        const participant = {
            ...this.state.participant
        }
        axios.post( '/insert.php', participant )
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
    render () {
        console.log(this.state.participant)
        
        return (
            <div >
                <AddForm
                formValues={this.state.participant}
                changed={(e) =>this.inputChangeHandler(e)}
                clicked={this.submitHandler}
                dateC={(date) => this.dateHandler(date)}
                check={(m) => this.checkEmail(m)}
                />
                
            </div>
        );
    }
}

export default AddParticipant;