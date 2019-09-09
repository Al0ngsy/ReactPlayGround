import React, { Component } from 'react';
import { Person } from "./component/Person"
import './App.css';

// Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// Button
import Button from '@material-ui/core/Button';
// Input
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
// Box
import Box from '@material-ui/core/Box';
// Storage
import localStorage from 'local-storage';

class App extends Component {
	constructor() {
		super()
		this.state = {
			fullName: "",
			age: null,
			saving: null,
			item: null,
			visited: 0,
			persons: []
		}
		this.handleChange = this.handleChange.bind(this)
		this.savingPerson = this.savingPerson.bind(this)
		this.checkSaving = this.checkSaving.bind(this)
		this.givePayCheck = this.givePayCheck.bind(this)
		this.savingPersonsToLocal = this.savingPersonsToLocal.bind(this)
		this.pushPersonsOnServer = this.pushPersonsOnServer.bind(this)
		this.clearLocalStorage = this.clearLocalStorage.bind(this)
	}

	componentDidMount() {
		// the methods of the object can not be saved
		// the private variable "saving" can also not be saved  
		let personsJSON = JSON.parse(localStorage.get("persons"))

		if (personsJSON !== null) {
			// init them again with default saving of 0.0
			// since saving of the person can not be access from outside 
			// and there is currently no object method that return it
			for (let index = 0; index < personsJSON.length; index++) {
				const person = personsJSON[index];
				let p = new Person(person._name, person._age)
				p.hasEnoughSaving = null

				this.setState(state => {
					// save that person
					const persons = [...state.persons, p] //concat would also work

					// debug
					if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
						console.table(persons)
					}

					return {
						persons
					}
				})
			}
		}

		let visited = localStorage.get("visitCount")

		if (visited !== null) {
			visited = parseInt(visited) + 1
			this.setState(state => {
				return {
					visited
				}
			})
			localStorage.set("visitCount", visited)
		} else {
			visited = 1
			this.setState(state => {
				return {
					visited
				}
			})
			localStorage.set("visitCount", visited)
		}
	}

	handleChange(event) {
		const { name, value } = event.target
		if ([name].toString() === "fullName") {
			const letters = /^[a-zA-Z\s]*$/
			if (value.match(letters)) {
				this.setState({
					[name]: value
				});
				return
			} else {
				alert("Please only enter letter in Name")
				return
			}
		} else {
			const numbers = /^[0-9]*$/
			if (value.match(numbers)) {
				this.setState({
					[name]: parseInt(value)
				});
				return
			} else {
				alert(`Please only enter number in ${[name].toString() === "age" ? "age" : "saving"}`)
				return
			}
		}

	}

	savingPerson() {
		// checking for required Data
		if (this.state.fullName.length !== 0 && this.state.age != null) {
			// create new person
			let p = new Person(this.state.fullName, this.state.age, this.state.saving)
			p.hasEnoughSaving = null

			this.setState(state => {
				// save that person
				const persons = [...state.persons, p] //concat would also work

				// debug
				if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
					console.table(persons)
				}

				return {
					// reset input values & save mutated array of person
					fullName: "",
					age: null,
					saving: null,
					persons
				}
			})
		} else {
			alert("Please enter the required datas (name & age) for a new person")
		}
	}

	savingPersonsToLocal() {
		if (this.state.persons.length !== 0) {
			const { persons } = this.state
			localStorage.set("persons", JSON.stringify(persons))
		}
	}

	clearLocalStorage() {
		localStorage.clear()
	}

	pushPersonsOnServer() {
		// TODO after research on creating server
	}

	checkSaving(itemCost) {
		// default no input case
		if (itemCost == null) {
			itemCost = 0
		}

		// check saving of each person 
		this.setState(state => {
			const persons = [...state.persons]
			if (persons.length !== 0) {
				for (let index = 0; index < persons.length; index++) {
					persons[index].hasEnoughSaving = persons[index].hasEnoughSavings(itemCost)
				}
			}

			// debug
			if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
				console.table(persons)
			}

			return {
				persons
			}
		})
	}

	givePayCheck(index) {
		// going to the index of the saved person and call givePaycheck() on it
		this.setState(state => {
			const persons = [...state.persons]
			persons[index].givePaycheck()

			// debug
			if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
				console.table(persons)
			}

			return {
				persons
			}
		})
	}

	render() {
		let root = {
			minWidth: 500,
			maxWidth: '60%',
			overflowX: 'auto',
			margin: 20
		}

		let table = {
			minWidth: 200
		}

		return (
			<div>
				{/** INPUT */}
				<form autoComplete="off" style={{ margin: 20 }}>
					<TextField
						id="outlined-name"
						label="Full Name"
						name="fullName"
						value={this.state.fullName}
						onChange={this.handleChange}
						margin="normal"
						variant="outlined"
					/>
					<TextField
						id="outlined-age"
						label="Age"
						name="age"
						value={this.state.age === null ? "" : this.state.age}
						onChange={this.handleChange}
						margin="normal"
						variant="outlined"
					/>
					<TextField
						id="outlined-saving"
						label="Saving (optinal)"
						name="saving"
						value={this.state.saving === null ? "" : this.state.saving}
						onChange={this.handleChange}
						margin="normal"
						variant="outlined"
					/>
				</form>

				{/** SAVE */}
				<Button
					style={{ margin: 20 }}
					variant="contained"
					margin="normal"
					color="primary"
					onClick={this.savingPerson}>
					Save Person
     			</Button>

				<Button
					style={{ margin: 20 }}
					variant="contained"
					margin="normal"
					color="primary"
					onClick={this.savingPersonsToLocal}>
					Save Local
     			</Button>

				<Button
					style={{ margin: 20 }}
					variant="contained"
					margin="normal"
					color="primary"
					onClick={this.clearLocalStorage}>
					Clear Local
     			</Button>

				<Button
					style={{ margin: 20 }}
					variant="contained"
					margin="normal"
					color="primary"
					disabled
					onClick={this.pushPersonsOnServer}>
					Save On Server
     			</Button>
				<br />

				{/** CHECK */}
				<div>
					<FormControl >
						<Input
							style={{ margin: 20 }}
							id="item-cost"
							label="Item Cost"
							name="item"
							placeholder="0"
							value={this.state.item === null ? "" : this.state.item}
							onChange={this.handleChange}
							startAdornment={<InputAdornment position="start">€</InputAdornment>}
						/>
					</FormControl>
					<Button
						style={{ margin: 20 }}
						variant="contained"
						margin="normal"
						color="primary"
						onClick={() => this.checkSaving(this.state.item)}>
						Has Enough Saving
					</Button>
				</div>

				{/** TABLE */}
				<Paper style={root}>
					<Table style={table}>
						<TableHead>
							<TableRow>
								<TableCell>Person</TableCell>
								<TableCell align="right">Name</TableCell>
								<TableCell align="right">Age</TableCell>
								<TableCell align="right">Give €€€</TableCell>
								<TableCell align="right">Has Enough €€€</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{this.state.persons.map((person, index) => (
								<TableRow key={index}>
									<TableCell component="th" scope="row">{index}</TableCell>
									<TableCell align="right">{person.name}</TableCell>
									<TableCell align="right">{person.age}</TableCell>
									<TableCell align="right">
										<Button
											variant="contained"
											margin="normal"
											onClick={() => this.givePayCheck(index)}>
											Give Money
										</Button>
									</TableCell>
									<TableCell align="right">{person.hasEnoughSaving !== null ? (person.hasEnoughSaving === true ? "true" : "false") : ""}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Paper>

				<Box
					bgcolor="grey.700"
					color="white"
					p={2}
					position="absolute"
					bottom="2%"
					right="2%"
					borderRadius={16}
					zIndex="modal"
				>
					{this.state.visited}
				</Box>
			</div>
		)
	}
}

export default App;
