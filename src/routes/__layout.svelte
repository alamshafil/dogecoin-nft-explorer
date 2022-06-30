<script>
  import "../app.css";
</script>

<div class="drawer">
  <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex flex-col">
    <!-- Navbar -->
    <div class="w-full navbar bg-base-300">
      <div class="flex-none lg:hidden">
        <label for="my-drawer-3" class="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-6 h-6 stroke-current"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            /></svg
          >
        </label>
      </div>
      <div class="flex-1">
        <img
          src="/dogecoin-nft-explorer/dogecoin.png"
          alt="Logo"
          class="w-10 ml-4"
        />
        <a
          href="/dogecoin-nft-explorer"
          class="btn btn-ghost normal-case text-xl">Dogecoin NFT Explorer</a
        >
      </div>
      <div class="flex-none hidden lg:block">
        <ul class="menu menu-horizontal">
          <!-- Navbar menu content -->
          <li><a href="/dogecoin-nft-explorer">Home</a></li>
          <li><a href="/dogecoin-nft-explorer/mint">Mint</a></li>
        </ul>
      </div>
    </div>
    <!-- Page content here -->
    <slot />
  </div>
  <div class="drawer-side">
    <label for="my-drawer-3" class="drawer-overlay" />
    <ul class="menu p-4 overflow-y-auto w-80 bg-base-100">
      <!-- Sidebar content -->
      <li><a href="/dogecoin-nft-explorer">Home</a></li>
      <li><a href="/dogecoin-nft-explorer/mint">Mint</a></li>
    </ul>
  </div>
</div>
