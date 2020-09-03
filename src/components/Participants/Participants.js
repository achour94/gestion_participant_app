import React, { Component } from 'react';
import MaterialTable from 'material-table';
import Button from '../UI/Button/Button';

const participants = (props) => {
        return (
            <MaterialTable
                title="Liste des Participants"
                columns={props.columns}
                data={props.data}
                options={{
                    headerStyle: {
                      backgroundColor: '#01579b',
                      color: '#FFF'
                    }
                  }}        
                actions={[
                    {
                    icon: 'save',
                    tooltip: 'Modifier Participant',
                    onClick: (event, rowData) => {
                        props.updated(rowData.id)
                    }
                    },
                    {
                    icon: 'delete',
                    tooltip: 'Supprimer Participant',
                    onClick: (event, rowData) => {
                        alert("You want to delete " + rowData.nom + " " + rowData.prenom)
                        props.deleted(+rowData.id)
                        
                    }
                    },
                    {
                        icon: 'add',
                        tooltip: 'Ajouter Participant',
                        isFreeAction: true,
                        iconProps:{
                            color: 'primary'
                        },
                        onClick: () => props.add()
                      }
                ]}
            />
        )
}

export default participants