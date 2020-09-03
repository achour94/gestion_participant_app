import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button'
import Participants from '../../components/Participants/Participants';
import axios from '../../axios-participants'
import Auxillary from '../../hoc/Auxillary/Auxillary';

class ParticipantsBuilder extends Component {

  state = {
    columns: [
      { title: 'Id', field: 'id' },
      { title: 'Nom', field: 'nom' },
      { title: 'Prenom', field: 'prenom' },
      { title: 'Email', field: 'email' },
      { title: 'Date De Naissance', field: 'dateDeNaissance' },
      { title: 'Sexe', field: 'sexe' },
      { title: 'Situation Familiale', field: 'situationF' },
      {
        title: 'Etat',
        field: 'actif',
      render: rowData => <Button btnType={(rowData.actif == 1) ? "Success" : "Danger"}>
                          {(rowData.actif == 1) ? "Actif" : "Inactif"}</Button>
      },
    ],
    data: []
  };

  getParticipants = () => {
    axios.get( '/list.php' )
        .then( response => {
          console.log(response.data)
          this.setState( { data: response.data } );
        } )
        .catch( error => {
            console.log(error)
            //this.setState( { error: true } );
        } );
  }
  

  componentDidMount () {
    this.getParticipants();
   } 

  addHandler = () => {
    this.props.history.push({
      pathname: '/add'
    });
  }

  updateHandler = (id) => {
    this.props.history.push({
      pathname: '/update',
      search: '?' + 'id=' + id
    });
  }

  deleteHandler = (id) => {
    axios.get('/delete.php?id=' + id)
      .then(response => { this.getParticipants() }
    )
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }
  
  render () {
    return (
      <Auxillary>
        {//<Button btnType="Success" clicked={this.addHandler} >Ajouter</Button>
        }
        <Participants 
          columns={this.state.columns}
          data={this.state.data}
          deleted={(id) => this.deleteHandler(id)}
          updated={(id) => this.updateHandler(id)}
          add = {()=> this.addHandler()} />
      </Auxillary>
    );
  }
}

export default ParticipantsBuilder
