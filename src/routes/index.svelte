<script>  
    import { goto } from '$app/navigation';

    let error = "";
  
    let txID = "";
  
    async function viewNFT() {
      if (txID != "") goto("/dogecoin-nft-explorer/txid/" + txID)
      else error = "TX ID can't be empty!";
    }
  </script>
  
  <main>
      <!-- Hero -->
      <div class="hero h-screen bg-base-200">
        <div class="hero-content flex-col">
          <img class="w-20" src="/dogecoin-nft-explorer/dogecoin.png" alt="Logo" />
          <div class="text-center">
            <h1 class="text-2xl font-bold">
              View NFTs on the Dogecoin blockchain!
            </h1>
            <p class="py-4">
              NFT protocol created by <a href="https://twitter.com/inevitable360"
                >inevitable360</a
              >
            </p>
          </div>
          <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div class="card-body">
              <div class="form-control">
                {#if error != ""}
                  <div class="alert alert-error shadow-lg mb-4">
                    <span>{error}</span>
                  </div>
                {/if}
                <label for="" class="label">
                  <span class="label-text">Transaction ID:</span>
                </label>
                <input
                  bind:value={txID}
                  type="text"
                  placeholder="TX ID"
                  class="input input-bordered"
                />
              </div>
              <div class="form-control mt-6">
                <button on:click={viewNFT} class="btn btn-primary">View NFT</button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    <!--
      <div class="bg-base-200 mx-auto flex items-center justify-center h-screen">
        <div class="card w-96 bg-base-100 shadow-xl">
          <figure><img src={nftData} alt="NFT" /></figure>
          <div class="card-body space-y-2">
            <h2 class="card-title">Name: {nftName}</h2>
            <div class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
              <input type="checkbox" />
              <div class="collapse-title text-xl font-medium">
                Click to show NFT details
              </div>
              <div class="collapse-content">
                <p><b>Description</b> {nftDesc}</p>
                <p><b>Minted by:</b> <span class="text-xs">{nftCreator}</span></p>
                <p><b>Minted at:</b> {parseTime(nftMintTime)}</p>
                <p><b>Supply:</b> {nftSupply}</p>
                <p><b>Collection</b> {nftCollection}</p>
                <p><b>NSFW:</b> {nftNSFW}</p>
                <p><b>Royalities Percentage:</b> {nftRoyalPer * 100}%</p>
                <p><b>Royalities Payment:</b> <span class="text-xs">{nftRoyalPay}</span></p>
              </div>
            </div>
            <div class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
              <input type="checkbox" />
              <div class="collapse-title text-xl font-medium">
                Click to show NFT transfer details
              </div>
              <div class="collapse-content">
                <p class="mb-2"><span class="text-xs">{newPrevOut} bought {nftName} from {newPrevIn} for <b>{newValue} DOGE</b>.</p>
                <p><b>New Supply:</b> {newSupply}</p>
                <p><b>NFT TX ID: </b><span class="text-xs">{newCreator}</span></p>
                <p><b>Last TX ID: </b><span class="text-xs">{newPrev}</span></p>
                <p><b>Payment TX ID: </b><span class="text-xs">{newRoyalTX}</span></p>
                <p><b>IP Percentage: </b>{newIPRightsPer}</p>
                <p><b>IP Rights: </b><span class="text-xs">{newIPRights}</span></p>
              </div>
            </div>
            <div class="card-actions justify-end">
              <button on:click={clear} class="btn btn-primary">Go back</button>
            </div>
          </div>
        </div>
      </div> -->
  </main>
  