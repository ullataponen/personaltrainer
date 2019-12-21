import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function Addtraining(props) {
	const [open, setOpen] = useState(false);
	const [training, setTraining] = useState({
		activity: "",
		date: "",
		duration: "",
		customer: props.customerId
	});

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleInputChange = event => {
		setTraining({ ...training, [event.target.name]: event.target.value });
	};

	const addTraining = () => {
		console.log(training);
		props.saveTraining(training);
		handleClose();
	};

	return (
		<div>
			<Button
				variant="outlined"
				color="primary"
				size="small"
				onClick={handleClickOpen}
			>
				Add training
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Add New Training</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						name="activity"
						value={training.activity}
						onChange={e => handleInputChange(e)}
						label="Activity"
						fullWidth
					/>
					<TextField
						margin="dense"
						name="date"
						value={training.date}
						onChange={e => handleInputChange(e)}
						label="Date"
						fullWidth
					/>
					<TextField
						margin="dense"
						name="duration"
						value={training.duration}
						onChange={e => handleInputChange(e)}
						label="Duration"
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={addTraining} color="primary">
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
