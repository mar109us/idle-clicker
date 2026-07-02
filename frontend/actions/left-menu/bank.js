import { state } from "../../model.js";

export const bankViews = {
	account: () => {
		let money = Number(state.character.money);
		let moneycurrency = money.toLocaleString("en-US", {
			style: "currency",
			currency: "USD",
		});

		return `<div>
		<h1 class="row center">Balance ${moneycurrency}</h1>
		<h2>Transactions</h2>
		<table>
			<tr><td>Amount</td><td>Type</td><td>Who</td></tr>
			<tr><td>$457</td><td>Sell stock</td><td>Market</td></tr>
			<tr><td>$140</td><td>Sell stock</td><td>Market</td></tr>
			<tr><td>$1900</td><td>Sell stock</td><td>Market</td></tr>
			<tr><td>$540</td><td>Sell stock</td><td>Market</td></tr>
			<tr><td>$457</td><td>Sell stock</td><td>Market</td></tr>
			<tr><td>$140</td><td>Sell stock</td><td>Market</td></tr>
			<tr><td>$1900</td><td>Sell stock</td><td>Market</td></tr>
			<tr><td>$540</td><td>Sell stock</td><td>Market</td></tr>
			<tr><td>$457</td><td>Sell stock</td><td>Market</td></tr>
			<tr><td>$140</td><td>Sell stock</td><td>Market</td></tr>
			<tr><td>$1900</td><td>Sell stock</td><td>Market</td></tr>
			<tr><td>$540</td><td>Sell stock</td><td>Market</td></tr>
			<tr><td>$457</td><td>Sell stock</td><td>Market</td></tr>
			<tr><td>$140</td><td>Sell stock</td><td>Market</td></tr>
			<tr><td>$1900</td><td>Sell stock</td><td>Market</td></tr>
			<tr><td>$540</td><td>Sell stock</td><td>Market</td></tr>
		</table>
	</div>`;
	},

	insurance: () => `<h1 class="row center">Available insurances</h1>
	<div class="row">
		<div class="collumn">
			<button>Health insurance</button>
			<button>Life insurance</button>
			<button>Dental insurance</button>
			<button>Trip insurance</button>
		</div>
		<div class="collumn">
			<button>Homeowner's insurance</button>
			<button>Rental insurance</button>
			<button>Valuables insurance</button>
			<button>Animal insurance</button>
		</div>
		<div class="collumn">
			<button>Car insurance</button>
			<button>Boat insurance</button>
		</div>
	</div>`,

	loan: () => `<h1 class="row center">Apply for a loan</h1>
		<form id="loan-form">
			<div class="row">
				<div class="collumn">
					<label><input type="radio" id="loan-car" name="loan" value="car"> Car loan</label>
					<label><input type="radio" id="loan-student" name="loan" value="student"> Student loan</label>
					<label><input type="radio" id="loan-boat" name="loan" value="boat"> Boat loan</label>
				</div>
				<div class="collumn">
					<label><input type="radio" id="loan-personal" name="loan" value="personal"> Personal loan</label>
					<label><input type="radio" id="loan-recreational" name="loan" value="recreational"> Recreational loan</label>
				</div>
				<div class="collumn">
					<label><input type="radio" id="loan-home" name="loan" value="home"> Home loan</label>
					<label><input type="radio" id="loan-land" name="loan" value="land"> Land loan</label>
					<label><input type="radio" id="loan-business" name="loan" value="business"> Business loan</label>
				</div>
			</div>
			<div class="row center">
				<button style="width: 80%;" type="submit">Start application</button>
			</div>
		</form>`,

	application: (selectedLoan) => {
		if (!selectedLoan) {
			return `<div class="row center">
				<h1 style="text-align:center;">Please choose a desired loan for your application.</h1>
				<button class="bank-nav" data-action="loan">Ok</button>
			</div>`;
		} else {
			return `<h2 class="row center"><u>Application for ${selectedLoan} loan</u></h2>
			<div class="row">
				<div class="collumn">
					<label for="loan-application-account">Account Number:</label>
					<input id="loan-application-account" type="number" value="000000000000${state.player.player_id}" readonly>

					<label for="loan-application-name">Name:</label>
					<input id="loan-application-name" type="text" value="${state.player.username}" readonly>

					<label for="loan-application-adress">Address:</label>
					<input id="loan-application-adress" type="text">

					<label for="loan-application-email">Email:</label>
					<input id="loan-application-email" type="text" value="${state.player.username}@55clicks.com" readonly>
				</div>

				<div class="collumn">
					<label for="loan-application-birth">Date of Birth:</label>
					<input id="loan-application-birth" type="text" value="${state.player.created_at_date}" readonly>

					<label for="loan-application-employment-status">Employment status:</label>
					<input id="loan-application-employment-status" type="text">
				</div>
			</div>`;
		}
	},

	market: () => "here is some market info",
};
