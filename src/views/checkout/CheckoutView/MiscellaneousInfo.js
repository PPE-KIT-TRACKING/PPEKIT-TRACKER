import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function MiscellaneousInfo() {
	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Order Details Enquiry
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<TextField
						required
						id="cardName"
						label="Certificate No"
						fullWidth
						autoComplete="cc-name"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						id="cardNumber"
						label="Expected Delivery Date"
						type="date"
						defaultValue="2020-11-10"
						InputLabelProps={{
							shrink: true
						}}
					/>
				</Grid>
				{/* <Grid item xs={12} md={6}>
					<TextField
						required
						id="expDate"
						label="Expiry date"
						fullWidth
						autoComplete="cc-exp"
					/>
				</Grid> */}
				{/* <Grid item xs={12} md={6}>
					<TextField
						required
						id="cvv"
						label="CVV"
						helperText="Last three digits on signature strip"
						fullWidth
						autoComplete="cc-csc"
					/>
				</Grid> */}
				{/* <Grid item xs={12}>
					<FormControlLabel
						control={
							<Checkbox
								color="secondary"
								name="saveCard"
								value="yes"
							/>
						}
						label="Remember credit card details for next time"
					/>
				</Grid> */}
			</Grid>
		</React.Fragment>
	);
}
