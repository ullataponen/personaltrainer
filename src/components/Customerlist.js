import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import DeleteIcon from "@material-ui/icons/Delete";
import Notifier, { openSnackbar } from "./Notifier";
import Addcustomer from "./Addcustomer";
import Addtraining from "./Addtraining";

export default function Customerlist() {
	const [customers, setCustomers] = useState([]);

	useEffect(() => fetchData(), []);

	const fetchData = () => {
		fetch("https://customerrest.herokuapp.com/api/customers")
			.then(response => response.json())
			.then(data => setCustomers(data.content));
	};

	const deleteCustomer = link => {
		if (window.confirm("Are you sure to delete?")) {
			console.log(link);
			fetch(link, { method: "DELETE" })
				.then(res => fetchData())
				.catch(err => console.error(err));
			openSnackbar({ message: "Customer deleted successfully" });
		}
	};

	const saveCustomer = customer => {
		fetch("https://customerrest.herokuapp.com/api/customers", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(customer)
		})
			.then(res => fetchData())
			.catch(err => console.error(err));
		openSnackbar({ message: "Customer added successfully" });
	};

	const saveTraining = training => {
		fetch("https://customerrest.herokuapp.com/api/trainings", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(training)
		})
			.then(res => fetchData())
			.catch(err => console.error(err));
		openSnackbar({ message: "Training added successfully" });
	};

	const columns = [
		{
			title: "Actions",
			field: "links[0].href",
			render: rowData => (
				<DeleteIcon
					style={{ cursor: "pointer" }}
					onClick={() => deleteCustomer(rowData.links[0].href)}
				></DeleteIcon>
			),
			sorting: false
		},
		// {
		// 	title: "ID",
		// 	field: "links[0].href",
		// 	render: rowId => {
		// 		let id = rowId.links[0].href.split("/");
		// 		id = id[id.length - 1];
		// 		return <span>{id}</span>;
		// 	}
		// },
		{
			title: "First name",
			field: "firstname"
		},
		{
			title: "Last name",
			field: "lastname"
		},
		{
			title: "Email",
			field: "email"
		},
		{
			title: "Phone",
			field: "phone"
		},
		{
			title: "Address",
			field: "streetaddress"
		},
		{
			title: "Postcode",
			field: "postcode"
		},
		{
			title: "City",
			field: "city"
		},
		{
			title: "Add training",
			render: trainingRow => (
				<Addtraining
					saveTraining={saveTraining}
					customerId={trainingRow.links[0].href}
				/>
			),
			sorting: false
		}
	];

	return (
		<div>
			<Notifier />
			<Addcustomer saveCustomer={saveCustomer} />
			<MaterialTable
				title="Customers"
				data={customers}
				columns={columns}
				options={{ sorting: true }}
			/>
		</div>
	);
}
