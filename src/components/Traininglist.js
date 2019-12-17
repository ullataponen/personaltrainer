import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Moment from "react-moment";
import DeleteIcon from "@material-ui/icons/Delete";
import Notifier, { openSnackbar } from "./Notifier";

export default function Traininglist() {
	const [trainings, setTrainings] = useState([]);

	useEffect(() => fetchData(), []);

	const fetchData = () => {
		fetch("https://customerrest.herokuapp.com/gettrainings")
			.then(response => response.json())
			.then(data => setTrainings(data));
	};

	const deleteTraining = id => {
		if (window.confirm("Are you sure to delete?")) {
			console.log("https://customerrest.herokuapp.com/api/trainings/" + id);
			fetch("https://customerrest.herokuapp.com/api/trainings/" + id, {
				method: "DELETE"
			})
				.then(res => fetchData())
				.catch(err => console.error(err));
			openSnackbar({ message: "Training deleted successfully" });
		}
	};

	const columns = [
		{
			title: "Actions",
			field: "id",
			render: rowData => (
				<DeleteIcon
					style={{ cursor: "pointer" }}
					onClick={() => deleteTraining(rowData.id)}
				></DeleteIcon>
			),
			sorting: false
		},
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
			field: "customer.firstname, customer.lastname",
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
				options={{ sorting: true }}
			/>
			<Notifier />
		</div>
	);
}
