import { state } from "../../../../model.js";
import { ui } from "../../../../view.js";
import { properties } from "../../../../model.js";

const propertyCategory = [
	{ id: "Buy", label: "Buy" },
	{ id: "Rent", label: "Rent" },
	{ id: "Commercial", label: "Commercial" },
];

const propertyTypes = [
	{ id: "Land", label: "Land" },
	{ id: "Farm", label: "Farm" },
	{ id: "House", label: "House" },
	{ id: "Cabin", label: "Cabin" },
	{ id: "Apartment", label: "Apartment" },
	{ id: "Parking", label: "Garage/Parking" },
];

const commercialCategory = [
	{ id: "Buy", label: "Buy" },
	{ id: "Rent", label: "Rent" },
];

const commercialTypes = [
	{ id: "Land", label: "Land" },
	{ id: "Store", label: "Store" },
	{ id: "Hotel", label: "Hotel" },
	{ id: "Office", label: "Office" },
	{ id: "Parking", label: "Parking" },
	{ id: "Mall", label: "Shopping mall" },
	{ id: "Repair", label: "Repair shop" },
	{ id: "Warehouse", label: "Warehouse" },
	{ id: "Education", label: "Education" },
	{ id: "Industrial", label: "Industrial" },
	{ id: "Restaurant", label: "Restaurant" },
];

const buildMarketView = (title, backAction, buttons) => `
<div style="justify-content:space-between;" class="row">
   <button class="internet-nav" data-action="${backAction}">↩</button>
   <h1>${title}</h1>
   <div></div>
</div>

<div class="row">
   ${buttons
		.map(
			(btn) =>
				`<button class="internet-nav" data-action="${btn.action}">${btn.label}</button>`,
		)
		.join("")}
</div>`;

let items = "";
let item = 0;
let startItem = 0;
let endItem = 4;
let id = null;

export function getItems() {
	items = "";
	let size = null;
	let price = null;
	let image = null;

	Object.values(properties)
		.slice(startItem, endItem)
		.forEach((row) => {
			Object.entries(row).forEach(([key, value]) => {
				if (key === "property_id") {
					id = value;
				}
				if (key === "property_size") {
					size = value;
				}
				if (key === "property_value") {
					price = value;
				}
				if (key === "image") {
					image = value;
				}
			});
			items += `
				<div class="internet-nav" data-action="item" data-id="${id}" style="
					height:fit-content;
					width:35em;
					padding:0em;
					padding-left:1em;
					margin:0em;
					margin-bottom:1em;
					background:none;
					border: 1px solid black;
					cursor: pointer;
				">
					<div class="row" style="justify-content:space-between; pointer-events: none;">
						<div style="justify-content:space-between" class="collumn">
							<h2>Norklickway ${id}, Klikkertown</h2>
							<div style="justify-content:left" class="row">
								<h2>${size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} m²</h2>
								<h2>$ ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</h2>
							</div>
						</div>
						<img src="./src/images/property/land/aerial/${image}.png" width="230em" height="130em">
					</div>
				</div>
			`;
		});
}
getItems();

export const buildMarketViewItems = (title, backAction) =>
	`<div style="justify-content:space-between;" class="row">
   <button class="internet-nav" data-action="${backAction}">↩</button>
   <h1>${title}</h1>
	<div></div>
</div>

<div id="property-list" class="collumn">${items}</div>

<div class="row">
   <button class="pagination-nav" data-direction="prev">Prev</button>
   <button class="pagination-nav" data-direction="next">Next</button>
</div>
`;

export function updateMarketPage(direction) {
	const maxItems = Object.keys(properties).length;

	if (direction === "next" && endItem < maxItems) {
		startItem += 4;
		endItem += 4;
	} else if (direction === "prev" && startItem > 0) {
		startItem -= 4;
		endItem -= 4;
	}

	getItems();

	const listContainer = document.getElementById("property-list");
	if (listContainer) {
		listContainer.innerHTML = items;
	}
}

export const internetViews = {
	market: () => `
		<div style="justify-content:space-between;" class="row">
			<button class="go-back" data-action="internet/internet">↩</button>
			<h1>Online Market</h1>
			<div></div>
		</div>

		<div class="row">
			<button class="internet-nav" data-action="marketProperty">Property</button>
			<button class="internet-nav" data-action="marketCar">Car</button>
			<button class="internet-nav" data-action="marketBoat">Boat</button>
			<button class="internet-nav" data-action="marketItems">Items</button>
		</div>`,

	item: (itemId) => `
		<div style="justify-content:space-between;" class="row">
			<button class="internet-nav" data-action="marketPropertyBuyLand">↩</button>
			<h1>Online Market</h1>
			<div></div>
		</div>

		<div style="justify-content:space-between" class="collumn">
			<img src="./src/images/property/land/aerial/${properties[itemId - 1].image}.png" width="500em" height="400em">
							
			<div style="justify-content:left; padding-top:1em;" class="row">
				<h1>Norklickway ${properties[itemId - 1].property_id}, Klikkertown</h1>
			</div>

			<div style="justify-content:left;" class="row">
				<h2>${properties[itemId - 1].property_size} m²</h2>
				<h2>$ ${properties[itemId - 1].property_value}</h2>
			</div>
			
		</div>
		`,

	marketProperty: () =>
		buildMarketView(
			"Property Market",
			"market",
			propertyCategory.map((p) => ({
				action: `marketProperty${p.id}`,
				label: p.label,
			})),
		),

	marketPropertyBuy: () =>
		buildMarketView(
			"Property for sale",
			"marketProperty",
			propertyTypes.map((p) => ({
				action: `marketPropertyBuy${p.id}`,
				label: p.label,
			})),
		),

	marketPropertyBuyLand: () =>
		buildMarketViewItems("Land for sale", "marketPropertyBuy"),

	marketPropertyRent: () =>
		buildMarketView(
			"Property for rent",
			"marketProperty",
			propertyTypes.map((p) => ({
				action: `marketPropertyRent${p.id}`,
				label: p.label,
			})),
		),

	marketPropertyCommercial: () =>
		buildMarketView(
			"Commercial Property",
			"marketProperty",
			commercialCategory.map((p) => ({
				action: `marketPropertyCommercial${p.id}`,
				label: p.label,
			})),
		),

	marketPropertyCommercialBuy: () =>
		buildMarketView(
			"Commercial property for sale",
			"marketPropertyCommercial",
			commercialTypes.map((p) => ({
				action: `marketPropertyCommercialBuy${p.id}`,
				label: p.label,
			})),
		),

	marketPropertyCommercialRent: () =>
		buildMarketView(
			"Commercial property for rent",
			"marketPropertyCommercial",
			commercialTypes.map((p) => ({
				action: `marketPropertyCommercialRent${p.id}`,
				label: p.label,
			})),
		),
};
