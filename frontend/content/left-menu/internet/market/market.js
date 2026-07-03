import { state } from "../../../../model.js";
import { ui } from "../../../../view.js";

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
