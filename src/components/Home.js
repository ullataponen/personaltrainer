import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
	return (
		<div className="container py-5">
			<h1>Welcome to Your Personal Trainer!</h1>
			<p>
				To see the customers, go to <a href="/customers">Customers</a>.
			</p>
			<p>
				To see the trainings, go to <a href="/trainings">Trainings</a>.
			</p>
			{/* <p>
				To see the calendar, go to <a href="/calendar">Calendar</a>.
			</p> */}
		</div>
	);
};

export default Home;
