<script>
  import "../app.css";
  import { goto } from '$app/navigation';

  let txID = "";

  async function viewNFT() {
    if (txID != "") {
      goto("/txid/" + txID, {replaceState: true})
      txID = ""
    }
  }
</script>

<div class="navbar bg-base-100 shadow-lg">
  <div class="flex-1">
    <img src="/dogecoin.png" alt="Logo" class="w-10 ml-4">
    <a href="/" class="btn btn-ghost normal-case text-xl">Dogecoin NFT Explorer</a>
    <div class="form-control">
      <div class="input-group">
        <input type="text" bind:value={txID} placeholder="TX ID" class="input input-bordered" />
        <button on:click={viewNFT} class="btn btn-square">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
      </div>
    </div>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal p-0">
      <li><a href="/">Home</a></li>
      <li><a href="/mint">Mint</a></li>
    </ul>
  </div>
</div>

<slot />
