import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Moment from "react-moment";

export default function Traininglist() {
	const [trainings, setTrainings] = useState([]);
	const [name, setName] = useState([{ firstName: "", lastName: "" }]);

	useEffect(() => fetchData(), []);

	const fetchData = () => {
		fetch("https://customerrest.herokuapp.com/api/trainings")
			.then(response => response.json())
			.then(data => setTrainings(data.content));
	};

	// const getName = link => {
	// 	fetchTrainingCust(link);
	// 	return name;
	// };

	const fetchTrainingCust = link => {
		fetch(link)
			.then(response => response.json())
			.then(nameData => {
				setName({
					...name,
					firstName: nameData.firstname,
					lastName: nameData.lastname
				});
			});
	};

	const columns = [
		{
			title: "Activity",
			field: "activity"
		},
		{
			title: "Date",
			field: "date",
			render: rowdate => <Moment format="DD/MM/YYYY">{rowdate.date}</Moment>
		},
		{
			title: "Duration (min)",
			field: "duration"
		},
		{
			title: "Customer",
			field: "links[2].href",
			render: rowData => <span>{fetchTrainingCust(rowData.url)}</span>
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
