import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";

export default function Customerlist() {
	const [customers, setCustomers] = useState([]);

	useEffect(() => fetchData(), []);

	const fetchData = () => {
		fetch("https://customerrest.herokuapp.com/api/customers")
			.then(response => response.json())
			.then(data => setCustomers(data.content));
	};

	const columns = [
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
				options={{ selection: true, sorting: true }}
			/>
		</div>
	);
}
