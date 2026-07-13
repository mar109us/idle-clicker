import { state, properties } from "../../../../model.js";
import { ui } from "../../../../view.js";
import { loadProperties, initializeApp } from "../../../../controller.js";

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
<div class="row justify-between">
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

const itemPerPage = 25;
let startItem = 0;
let endItem = itemPerPage;

let items = "";
let sortedProperties = [];

let sortMethod = "Sort";
export function sortItems(action) {
	sortedProperties = properties
		.filter((p) => p.available)
		.sort((a, b) => a.property_value - b.property_value);
	if (action === "high") {
		sortMethod = "Price (highest first)";
		sortedProperties.reverse();
	}
	if (action === "low") {
		sortMethod = "Price (lowest first)";
	}
	startItem = 0;
	endItem = itemPerPage;

	getItems();
}

export function getItems() {
	items = "";

	const slicedProperties = sortedProperties.slice(startItem, endItem);
	slicedProperties.forEach((key) => {
		items += `
				<div class="internet-nav shadow rounded items" data-action="item" data-id="${key.property_id}">
					<div class="clean-row justify-between">
						<div class="clean-collumn" style="justify-content:space-evenly">
							<div>
								<h3 class="weight-600">Public land for sale</h3>
								<h4>Norklickway ${key.property_id}, Klikkertown</h4>
							</div>
							<div class="clean-row justify-left gap-1">
								<h3 class="weight-600">${key.property_size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} m²</h3>
								<h3 class="weight-600">$ ${key.property_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</h3>
							</div>
						</div>

						<img src="./src/images/property/land/aerial/${key.image}.png">
					</div>
				</div>
			`;
	});
	
}

export const buildMarketViewItems = (title, backAction) => `
	<div class="row justify-between">
		<button class="internet-nav" data-action="${backAction}">↩</button>
		<h1>${title}</h1>
		<div></div>
	</div>

	<div id="property-list" class="collumn">
		<div class="clean-row align-end gap-1 padding-bottom">
			<select name="price" id="price">
			   <option selected disabled hidden>${sortMethod}</option>
				<option value="low">Price (lowest first)</option>
				<option value="high">Price (highest first)</option>
			</select>
		</div>
		${items}
	</div>

	

	<div class="row">
		<button class="pagination-nav" data-direction="prev">Prev</button>
		<button class="pagination-nav" data-direction="next">Next</button>
	</div>
`;

export function updateMarketPage(direction) {
	console.log(direction)
	const maxItems = sortedProperties.length;

	if (direction === "next" && startItem + itemPerPage < maxItems) {
		startItem += itemPerPage;
		endItem += itemPerPage;
	} else if (direction === "prev" && startItem > 0) {
		startItem -= itemPerPage;
		endItem -= itemPerPage;
	}
	console.log("klsjgølsjrg");
	getItems();
	
}

export const internetViews = {
	market: () => `
		<div class="row justify-between">
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
		<div class="row justify-between">
			<button class="internet-nav" data-action="marketPropertyBuyLand">↩</button>
		</div>

		<img class="shadow rounded item" src="./src/images/property/land/aerial/${properties[itemId - 1].image}.png">

		<div class="clean-row item gap-5">
			<div class="clean-collumn">
			
				<h1>Untouched land for sale in fantastic environment</h1>
				<h4 class="text-highlight no-pbm">🛡 Norklickway ${properties[itemId - 1].property_id}, Klikkertown</h4>

				<br><br>

			<div class="clean-row justify-between">
				<div class="clean-collumn">
					<h3>Price</h3>
					<h2>$ ${properties[itemId - 1].property_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</h2>
				</div>
				
				<div class="clean-collumn">
					<h3>Property area</h3>
					<h2>${properties[itemId - 1].property_size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} m²</h2>
				</div>
			</div>

				<br>
				<hr>
				<br>

				<div class="justify-left gap-5">
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate eveniet consequuntur eaque repudiandae quos ipsa necessitatibus autem, ducimus, reiciendis laudantium maxime incidunt possimus animi quisquam aliquid harum sapiente, dolore voluptas.</p>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate eveniet consequuntur eaque repudiandae quos ipsa necessitatibus autem, ducimus, reiciendis laudantium maxime incidunt possimus animi quisquam aliquid harum sapiente, dolore voluptas.</p>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate eveniet consequuntur eaque repudiandae quos ipsa necessitatibus autem, ducimus, reiciendis laudantium maxime incidunt possimus animi quisquam aliquid harum sapiente, dolore voluptas.</p>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate eveniet consequuntur eaque repudiandae quos ipsa necessitatibus autem, ducimus, reiciendis laudantium maxime incidunt possimus animi quisquam aliquid harum sapiente, dolore voluptas.</p>
				</div>

			</div>
			
			<div class="clean-collumn width-40 gap-1">
				<div class="clean-collumn border rounded padding gap-1">
					<h4 class="text-highlight">The National Office of Land Management</h4>
					<h4 class="weight-600">Garret Sturgis</h4>
					<h4>Department Manager / Land Management</h4>
					<h4 class="weight-600">garret.sturgis@55clicks.com</h4>
					<button class="buy-property max-width rounded" data-action="${itemId}">Send offer</button>
				</div>

				<div class="clean-collumn border rounded padding gap-1">
					<h4>Property details</h4>
					<button class="max-width rounded">See detailed information</button>
				</div>
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
