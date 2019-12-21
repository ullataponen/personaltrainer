import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navigator from "./components/Navigator";
import Home from "./components/Home";
import Customerlist from "./components/Customerlist";
import Traininglist from "./components/Traininglist";
import Calendar from "./components/Calendar";

function App() {
	return (
		<div>
			<BrowserRouter>
				<div>
					{/* <AppBar position="static">
						<Toolbar>
							<Typography variant="h6">Personal Trainer</Typography>
						</Toolbar>
					</AppBar> */}
					<Navigator />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/customers" component={Customerlist} />
						<Route path="/trainings" component={Traininglist} />
						<Route path="/calendar" component={Calendar} />
						<Route render={() => <h1>Page not found</h1>} />
					</Switch>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
