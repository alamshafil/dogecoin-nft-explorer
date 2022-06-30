<script>
  import "../app.css";
  import Fa from 'svelte-fa'
  import { faHome, faAdd, faBars } from '@fortawesome/free-solid-svg-icons'
  import { onMount } from 'svelte'
  import { themeChange } from 'theme-change'

  onMount(() => {
    themeChange(false)
    // false parameter is required for svelte
  })
</script>

<div class="drawer">
  <input id="drawer-nav" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex flex-col">
    <!-- Navbar -->
    <div class="w-full navbar bg-base-300">
      <div class="flex-none lg:hidden">
        <label for="drawer-nav" class="btn btn-square btn-ghost">
          <Fa icon={faBars} fw/>
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
          <div class="form-control p-1">
            <label class="label cursor-pointer">
              <span class="label-text mr-4">Theme</span> 
              <input data-toggle-theme="dark,light" data-act-class="ACTIVECLASS" type="checkbox" class="toggle" />
            </label>
          </div>
          <!-- Navbar menu content -->
          <li><a href="/dogecoin-nft-explorer"><Fa icon={faHome} /> Home</a></li>
          <li><a href="/dogecoin-nft-explorer/mint"><Fa icon={faAdd} /> Mint</a></li>
        </ul>
      </div>
    </div>
    <!-- Page content here -->
    <slot />
  </div>
  <div class="drawer-side">
    <label for="drawer-nav" class="drawer-overlay" />
    <ul class="menu p-4 overflow-y-auto w-80 bg-base-100">
      <!-- Sidebar content -->
      <li><a href="/dogecoin-nft-explorer"><Fa icon={faHome} /> Home</a></li>
      <li><a href="/dogecoin-nft-explorer/mint"><Fa icon={faAdd} /> Mint</a></li>
    </ul>
  </div>
</div>
