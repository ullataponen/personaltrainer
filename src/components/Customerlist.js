import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import DeleteIcon from "@material-ui/icons/Delete";
import Notifier, { openSnackbar } from "./Notifier";

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
		}
	];

	return (
		<div>
			<MaterialTable
				title="Customers"
				data={customers}
				columns={columns}
				options={{ sorting: true }}
			/>
			<Notifier />
		</div>
	);
}
