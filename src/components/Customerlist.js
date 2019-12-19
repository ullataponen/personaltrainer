import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import DeleteIcon from "@material-ui/icons/Delete";
import Notifier, { openSnackbar } from "./Notifier";
import Addcustomer from "./Addcustomer";
import Addtraining from "./Addtraining";
import Editcustomer from "./Editcustomer";

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
				.then(res => {
					fetchData();
					if (res.status >= 200 && res.status < 300) {
						openSnackbar({ message: "Customer deleted successfully" });
					} else {
						openSnackbar({ message: "Error. Try again." });
					}
				})
				.catch(err => console.error(err));
		}
	};

	const saveCustomer = customer => {
		fetch("https://customerrest.herokuapp.com/api/customers", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(customer)
		})
			.then(res => {
				fetchData();
				if (res.status >= 200 && res.status < 300) {
					openSnackbar({ message: "Customer added successfully" });
				} else {
					openSnackbar({ message: "Error. Try again." });
				}
			})
			.catch(err => console.error(err));
	};

	const saveTraining = training => {
		fetch("https://customerrest.herokuapp.com/api/trainings", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(training)
		})
			.then(res => {
				fetchData();
				if (res.status >= 200 && res.status < 300) {
					openSnackbar({ message: "Training added successfully" });
				} else {
					openSnackbar({ message: "Error. Try again." });
				}
			})
			.catch(err => console.error(err));
	};

	const updateCustomer = (customer, link) => {
		fetch(link, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(customer)
		})
			.then(res => fetchData())
			.then(openSnackbar({ message: "Customer updated successfully" }))
			.catch(err => console.error(err));
	};

	const columns = [
		{
			title: "Delete",
			field: "links[0].href",
			render: customerData => (
				<DeleteIcon
					style={{ cursor: "pointer" }}
					onClick={() => deleteCustomer(customerData.links[0].href)}
				></DeleteIcon>
			),
			sorting: false
		},
		{
			title: "Edit",
			field: "links[0].href",
			render: customerData => (
				<Editcustomer updateCustomer={updateCustomer} customer={customerData} />
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
