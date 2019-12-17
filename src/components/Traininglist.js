import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Moment from "react-moment";

export default function Traininglist() {
	const [trainings, setTrainings] = useState([]);
	const [name, setName] = useState([{ firstName: "", lastName: "" }]);

	useEffect(() => fetchData(), []);

	const fetchData = () => {
		fetch("https://customerrest.herokuapp.com/gettrainings")
			.then(response => response.json())
			.then(data => setTrainings(data));
	};

	const columns = [
		{
			title: "Activity",
			field: "activity"
		},
		{
			title: "Date",
			field: "date",
			render: rowdate => (
				<Moment format="DD/MM/YYYY HH:mm">{rowdate.date}</Moment>
			)
		},
		{
			title: "Duration (min)",
			field: "duration"
		},
		{
			title: "Customer",
			field: "customer.firstname" + "customer.lastname",
			render: row => (
				<span>{row.customer.firstname + " " + row.customer.lastname}</span>
			)
		}
	];

	return (
		<div>
			<MaterialTable
				title="Trainings"
				data={trainings}
				columns={columns}
				options={{ selection: true, sorting: true }}
			/>
		</div>
	);
}
