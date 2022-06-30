<script>
    import { goto } from "$app/navigation";

    let error = "";

    let txID = "";

    async function viewNFT() {
        if (txID != "") goto("/dogecoin-nft-explorer/txid/" + txID);
        else error = "TX ID can't be empty!";
    }
</script>

<main>
    <!-- Hero -->
    <div class="hero" style="height: 90vh;">
        <div class="hero-content flex-col">
            <img
                class="w-20"
                src="/dogecoin-nft-explorer/dogecoin.png"
                alt="Logo"
            />
            <div class="text-center">
                <h1 class="text-2xl font-bold">
                    View NFTs on the Dogecoin blockchain!
                </h1>
                <p class="py-4">
                    NFT protocol created by <a href="https://twitter.com/inevitable360">inevitable360</a> •
                    API provided by <a href="https://chain.so/DOGE">chain.so</a>
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
                        <button on:click={viewNFT} class="btn btn-primary">View NFT</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
