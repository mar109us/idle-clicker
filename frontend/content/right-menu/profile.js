import { state } from "../../model.js";
import { updateUI } from "../../view.js";

let profileProperties = "";

export function getProfileProperties() {
	profileProperties = "";
	Object.values(state.ownedProperties).forEach((row) => {
		Object.entries(row).forEach(([key, value]) => {
			if (key === "property_id") {
				profileProperties += `<li>Norklickway ${value}, Klikkertown</li>`;
			}
		});
	});
}

export const profileView = {
	profile: () => /* HTML */ `
		<div class="clean-collumn justify-center full-width align-center gap-1">
			<h2>${state.player.username}</h2>
			<img
				src="src/images/profile/default.png"
				class="border-2"
				style="pointer-events: none;user-select: none;"
				width="30%"
			/>

			<div
				class="clean-collumn border-2 justify-center align-center width-80"
			>
				<div class="clean-row justify-evenly border-2 full-width padding-1">
					<ul>
						<li>Age</li>
						<li>Birthday</li>
						<li>Player id</li>
					</ul>
					<ul>
						<li>Money</li>
						<li>Value</li>
					</ul>
				</div>

				<div class="clean-row justify-evenly border-2 full-width padding-1">
					<ul>
						<li>Strength</li>
						<li>Agility</li>
						<li>Toughness</li>
						<li>Endurance</li>
						<li>Recovery</li>
						<li>Immune system</li>
					</ul>

					<ul>
						<li>Analyze</li>
						<li>Focus</li>
						<li>Will</li>
						<li>Intuition</li>
						<li>Patience</li>
						<li>Memory</li>
						<li>Social</li>
						<li>Awareness</li>
					</ul>

					<ul>
						<li>Creativity</li>
						<li>Problem solving</li>
						<li>Intelligence</li>
						<li>Finesse</li>
						<li>Precision</li>
					</ul>
				</div>
				<div class="clean-row justify-evenly border-2 full-width padding-1">
					<ul>
						${profileProperties}
					</ul>
				</div>
			</div>
		</div>
	`,
};
