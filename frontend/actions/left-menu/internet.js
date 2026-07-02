import { state } from "../../model.js";

export const internetViews = {
	market: () =>
		`<div class="row">
			<button class="internet-nav" data-action="marketProperty">
				Property
			</button>
			<button class="internet-nav" data-action="marketCar">
				Car
			</button>
			<button class="internet-nav" data-action="marketBoat">
				Boat
			</button>
			<button class="internet-nav" data-action="marketItems">
				Items
			</button>
		</div>`,

	marketProperty: () =>
		`<div class="row">
			<button class="internet-nav" data-action="marketProperty">
				Property
			</button>
			<button class="internet-nav" data-action="marketCar">
				Car
			</button>
			<button class="internet-nav" data-action="marketBoat">
				Boat
			</button>
			<button class="internet-nav" data-action="marketItems">
				Items
			</button>
		</div>
			<div class="row">
		<button class="internet-nav" data-action="marketPropertyNonCommercial">Non-commercial</button>
		<button class="internet-nav" data-action="marketPropertyCommercial">Commercial</button>
	</div>`,

	marketPropertyNonCommercial: () =>
		`<div class="row">
			<button class="internet-nav" data-action="marketProperty">
				Property
			</button>
			<button class="internet-nav" data-action="marketCar">
				Car
			</button>
			<button class="internet-nav" data-action="marketBoat">
				Boat
			</button>
			<button class="internet-nav" data-action="marketItems">
				Items
			</button>
		</div>

			<div class="row">
		<button class="internet-nav" data-action="marketPropertyNonCommercial">Non-commercial</button>
		<button class="internet-nav" data-action="marketPropertyCommercial">Commercial</button>
	</div>
	
		<div class="row">
		<button class="internet-nav" data-action="marketPropertyNonCommercialBuy">Buy</button>
		<button class="internet-nav" data-action="marketPropertyNonCommercialRent">Rent</button>
	</div>
	`,

	marketPropertyNonCommercialBuy: () =>
		`<div class="row">
			<button class="internet-nav" data-action="marketProperty">
				Property
			</button>
			<button class="internet-nav" data-action="marketCar">
				Car
			</button>
			<button class="internet-nav" data-action="marketBoat">
				Boat
			</button>
			<button class="internet-nav" data-action="marketItems">
				Items
			</button>
		</div>

			<div class="row">
		<button class="internet-nav" data-action="marketPropertyNonCommercial">Non-commercial</button>
		<button class="internet-nav" data-action="marketPropertyCommercial">Commercial</button>
	</div>
	
		<div class="row">
		<button class="internet-nav" data-action="marketPropertyNonCommercialBuy">Buy</button>
		<button class="internet-nav" data-action="marketPropertyNonCommercialRent">Rent</button>
	</div>

	<div class="row">
	<button class="internet-nav" data-action="marketPropertyNonCommercialBuyHouse">Single-family home</button>
	<button class="internet-nav" data-action="marketPropertyNonCommercialBuyApartment">Apartment</button>
	<button class="internet-nav" data-action="marketPropertyNonCommercialBuyFarm">Farm</button>
	<button class="internet-nav" data-action="marketPropertyNonCommercialBuyCabin">Vacation home</button>
	<button class="internet-nav" data-action="marketPropertyNonCommercialBuyParking">Garage/Parking</button>
	<button class="internet-nav" data-action="marketPropertyNonCommercialBuyLand">Land</button>
</div>
	`,

	marketPropertyCommercial: () =>
		`<div class="row">
			<button class="internet-nav" data-action="marketProperty">
				Property
			</button>
			<button class="internet-nav" data-action="marketCar">
				Car
			</button>
			<button class="internet-nav" data-action="marketBoat">
				Boat
			</button>
			<button class="internet-nav" data-action="marketItems">
				Items
			</button>
		</div>

			<div class="row">
		<button class="internet-nav" data-action="marketPropertyNonCommercial">Non-commercial</button>
		<button class="internet-nav" data-action="marketPropertyCommercial">Commercial</button>
	</div>
	
		<div class="row">
		<button class="internet-nav" data-action="marketPropertyNonCommercialBuy">Buy</button>
		<button class="internet-nav" data-action="marketPropertyNonCommercialRent">Rent</button>
	</div>
	`,
};
