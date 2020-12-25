<script lang="ts">
  import type Dinero from "dinero.js";
  import { cart } from "./cart";
  export let name: string;
  export let description: string;
  export let price: Dinero.Dinero;
</script>

<div class="card">
  <div class="card-body">
    <div class="row">
      <div class="col sm-8 md-10 lg-10">
        <h4 class="card-title">{name}</h4>
      </div>
      <div class="col sm-4 md-2 lg-2">
        <div class="card-text">
          <button on:click={() => cart.add({ name, description, price })}>
            {price.toFormat()}</button>
        </div>
      </div>
    </div>
  </div>
</div>
