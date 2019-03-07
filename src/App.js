import React, { Component } from 'react';
import './App.css';
import Calendar from 'react_google_calendar';


const calendar_configuration = {
    api_key: 'AIzaSyBV9NqC21Bq_1W9ORUo_WY59f_Jofntyg4',
    calendars: [
      {
        name: 'Demo',
        url: 'srg23q1tm95o05u36lec0ilkt4@group.calendar.google.com'
      }
    ],
    dailyRecurrence: 700,
    weeklyRecurrence: 500,
    monthlyRecurrence: 20
}


class App extends Component {
	constructor(props){
		super(props)
		this.state={
			events:[]
		}
	}
	render() {
		return (

			<div className="App">
	
				<header className="App-header">
					Essence Events
					<a id= "adminButton" href="http://localhost:3000/" class="btn btn-primary">Login</a>
				</header>
				
				<Calendar events = {this.state.events} config={calendar_configuration}></Calendar>
			</div>
		);
	}
}

export default App;
