import { state } from "../../model.js";
import { updateUI } from "../../view.js";

let profileProperties = "";
let age;
let ageCalc;
const today = new Date().getTime();

export function getProfileProperties() {
	profileProperties = "";
	Object.values(state.ownedProperties).forEach((row) => {
		Object.entries(row).forEach(([key, value]) => {
			if (key === "property_id") {
				profileProperties += `
				<div class="clean-collumn width-50">
				<div>Norklickway ${value}, Klikkertown</div>
				
				`;
			}
			if (key === "image") {
				profileProperties += `
				<img class="width-50" src="./src/images/property/land/aerial/${value}.png"></div>
				`;
			}
		});
	});
	age = state.player.created_at;
	age = (today - age) / (1000 * 86400 * 365);
	ageCalc = Math.round(age);
}

export const profileView = {
	profile: () => /* HTML */ `
		<div class="collumn justify-center padding">
			<div class="clean-row padding width-minmax-80">
				<img
					src="src/images/profile/default.png"
					style="pointer-events: none;user-select: none;"
					width="50%"
				/>

				<div class="clean-collumn width-50">
					<div
						class="clean-row align-center justify-center height-100 row-lightgray"
					>
						<h2 class="no-pbm">${state.player.username}</h2>
					</div>

					<div class="clean-row row-gray padding justify-between">
						<div>Age</div>
						<div>${ageCalc}</div>
					</div>

					<div class="clean-row row-lightgray padding justify-between">
						<div>Birthday</div>
						<div>${state.player.created_at_date}</div>
					</div>

					<div class="clean-row row-gray padding justify-between">
						<div>Player id</div>
						<div>${state.player.player_id}</div>
					</div>

					<div class="clean-row row-lightgray padding justify-between">
						<div>Money</div>
						<div>
							$${state.character.money
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
						</div>
					</div>

					<div class="clean-row row-gray padding justify-between">
						<div>Value</div>
						<div>none</div>
					</div>
				</div>
			</div>

			<div class="clean-row padding width-minmax-80 justify-between">
				<div class="clean-collumn width-30">
					<div
						class="clean-row align-center justify-center height-100 row-lightgray"
					>
						<h2>Mind</h2>
					</div>

					<div class="clean-row row-gray padding justify-between">
						<div>Analyze</div>
						<div>${null}</div>
					</div>

					<div class="clean-row row-lightgray padding justify-between">
						<div>Focus</div>
						<div>${null}</div>
					</div>

					<div class="clean-row row-gray padding justify-between">
						<div>Will</div>
						<div>${null}</div>
					</div>

					<div class="clean-row row-lightgray padding justify-between">
						<div>Intuition</div>
						<div>${null}</div>
					</div>

					<div class="clean-row row-gray padding justify-between">
						<div>Patience</div>
						<div>${null}</div>
					</div>

					<div class="clean-row row-lightgray padding justify-between">
						<div>Memory</div>
						<div>${null}</div>
					</div>

					<div class="clean-row row-gray padding justify-between">
						<div>Social</div>
						<div>${null}</div>
					</div>

					<div class="clean-row row-lightgray padding justify-between">
						<div>Awareness</div>
						<div>${null}</div>
					</div>
				</div>
				<div class="clean-collumn width-30">
					<div class="clean-row align-center justify-center row-lightgray">
						<h2>Body</h2>
					</div>

					<div class="clean-row row-gray padding justify-between">
						<div>Strength</div>
						<div>${null}</div>
					</div>

					<div class="clean-row row-lightgray padding justify-between">
						<div>Agility</div>
						<div>${null}</div>
					</div>

					<div class="clean-row row-gray padding justify-between">
						<div>Toughness</div>
						<div>${null}</div>
					</div>

					<div class="clean-row row-lightgray padding justify-between">
						<div>Endurance</div>
						<div>${null}</div>
					</div>

					<div class="clean-row row-gray padding justify-between">
						<div>Recovery</div>
						<div>${null}</div>
					</div>

					<div class="clean-row row-lightgray padding justify-between">
						<div>Immune system</div>
						<div>${null}</div>
					</div>

					<div class="clean-row padding justify-between">
						<br />
					</div>

					<div class="clean-row padding justify-between">
						<br />
					</div>
				</div>
				<div class="clean-collumn width-30">
					<div class="clean-row align-center justify-center row-lightgray">
						<h2>Misc</h2>
					</div>

					<div class="clean-row row-gray padding justify-between">
						<div>Creativity</div>
						<div>${null}</div>
					</div>

					<div class="clean-row row-lightgray padding justify-between">
						<div>Problem solving</div>
						<div>${null}</div>
					</div>

					<div class="clean-row row-gray padding justify-between">
						<div>Intelligence</div>
						<div>${null}</div>
					</div>

					<div class="clean-row row-lightgray padding justify-between">
						<div>Finesse</div>
						<div>${null}</div>
					</div>

					<div class="clean-row row-gray padding justify-between">
						<div>Precision</div>
						<div>${null}</div>
					</div>
				</div>
			</div>

			<div class="clean-row justify-between padding width-80 wrap">
				${profileProperties}
			</div>
		</div>
	`,
};
