/* eslint-disable no-unused-expressions */

import React, {Component} from 'react';
import {Input, Button, Header,Form,Checkbox, Container} from 'semantic-ui-react';
import SubmitModal from './SubmitModal';
import {Formik} from 'formik';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';

export default class PredictionForm extends Component{

    constructor(props){
      super(props);
      this.state = {
		winProbability: null,
		openModal: false
      }
	}
    render(){


        return (
        <div style={{marginTop:'10%'}}>
          	<Container style={{backgroundColor:"white", borderRadius:"25px",boxShadow: "2px 2px 5px #fc6767", padding:"10px"}}>
				<Header as="h1">Essence Events</Header>
				<Formik
					initialValues={{
						Title: "", 
						ShortPitch: "",
						Description: "", 
					}}
					onSubmit={(values) => {
						this.setState(state => {
							return {openModal: true};
						});
					}}
					render={props => (
						<div style={{ padding:"10px"}}>
							<Form onSubmit={props.handleSubmit}>
								<Form.Group widths='equal'>
									<Form.Input
										fluid label='Name'
										placeholder='Name' 
										onChange={props.handleChange}
										name="Name"
										values={props.values.Title}
									/>
								</Form.Group>
								<Form.Group widths='equal'>
									<Form.Input
										fluid label='Email' 
										placeholder='john@smith.com' 
										onChange={props.handleChange}
										name="Email"
										values={props.values.ShortPitch}
									/>
								</Form.Group>
								<Form.TextArea
									label='Description'
									placeholder='Tell us more about your vision...' 
									onChange={props.handleChange}
									name="Description"
									values={props.values.Description}
								/>
								<Form.Button color="blue" type="submit" >Login</Form.Button>
							</Form>
						</div>
					)}
				/>
          		<SubmitModal
					open={this.state.openModal}
					winProbability={this.state.winProbability}
					closer={() => this.setState((state, props) => {
						return {openModal: false}
					})}
				>
				</SubmitModal>
        	</Container>
        </div>
        );
    }
  
}