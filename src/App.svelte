<script lang="ts">
	import ProductCard from "./ProductCard.svelte";
	import { cart } from "./cart";
	import Dinero from "dinero.js";
	function checkout() {
		// cart -> backend over AJAX
		console.log("Checkout:", cart.checkout());
	}
</script>

<style>
	.btnCheckout {
		background-color: gold;
		width: 100%;
	}
</style>

<!-- {JSON.stringify($cart)} -->

<div class="row">
	<div class="sm-6 md-8 lg-8 col">
		Svelte Products<br />
		<ProductCard
			name="Cutstom Store"
			description=""
			price={Dinero({ amount: 1337, currency: 'USD' })} />
		<ProductCard
			name=" + Writable Store"
			description="<3"
			price={Dinero({ amount: 7331, currency: 'USD' })} />
		<ProductCard
			name=" + Derived Store"
			description="ooh yes..."
			price={Dinero({ amount: 1234, currency: 'USD' })} />
	</div>
	<div class="sm-6 md-4 lg-4 col">
		Cart<br />
		<table>
			<thead>
				<tr>
					<th>Quantity</th>
					<th>Name</th>
					<th>Price</th>
					<th>Total</th>
				</tr>
			</thead>
			<tbody>
				{#each $cart.items as item}
					<tr>
						<td>
							<select bind:value={item.quantity}>
								{#each Array(100) as _, i}
									<option value={i}>{i}</option>
								{/each}
							</select>
						</td>
						<td>{item.product.name}</td>
						<td>{item.product.price.toFormat()}</td>
						<td>{item.totalPrice.toFormat()}</td>
					</tr>
				{:else}
					<!-- empty list -->
				{/each}
				<tr>
					<td>Total</td>
					<td>({$cart.totalItems} Items)</td>
					<td />
					<td>{$cart.totalPrice.toFormat()}</td>
				</tr>
				<tr>
					<td colspan="4">
						<button class="btnCheckout" on:click={checkout}>Checkout</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
