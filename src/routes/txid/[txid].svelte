<script>
    import { page } from "$app/stores";
    import { hex2a } from "$lib/utils.js";
    import NFTCard from "$lib/NFTCard.svelte";
    import NFTActivity from "$lib/NFTActivity.svelte";

    let txID = $page.params.txid;

    let nftInfo;
    let nftActivity = [];

    async function viewNFT() {
        // BAD TX: 462afd6b86450c9e69490d96d879ee6e7c7d064bbe8b00380b063142143e9fdb
        // GOOD TX (MAIN): 56cf0e424c9492e142b6ab163f0ec28fc8c296800de18bdb07e54d14111ec060
        // GOOD TX (NEW): 93d67bdf678419b09e2732ca500e0bd49d60380e26062d0e3322276d32efa8f4

        // Get raw TX from API
        let res;

        try {
            res = await fetch(`https://chain.so/api/v2/tx/DOGE/${txID}`);
        } catch {
            throw "Invalid TX!"
        }

        const text = await res.text();
        const jsonRes = JSON.parse(text);

        // Check if output has OP_RETURN
        let OP_RETURN = "";
        jsonRes.data.outputs.forEach((output) => {
            if (output.script_asm.includes("OP_RETURN")) {
                OP_RETURN = output.script_asm;
            }
        });

        if (OP_RETURN != "") {
            var ipfs_hash = hex2a(OP_RETURN.replace("OP_RETURN ", "")) // Convert hex to ASCII
                .split("[")[1] // Remove first '['
                .replace("]", ""); // Remove last ']'

            const resIFPS = await fetch(`https://ipfs.io/ipfs/${ipfs_hash}`);
            const jsonIFPS = await resIFPS.json();

            // If lock defined, then it's the mint TXID
            if (jsonIFPS.lock != undefined) {
                nftInfo = jsonIFPS;
            } else {
                // This TXID must be a transfer
                // jsonIFPS -> Transfer info
                // jsonIPFS_transfer -> Mint info

                const resIFPS_transfer = await fetch(
                    `https://ipfs.io/ipfs/${jsonIFPS.ipfs.json}`
                );
                const jsonIFPS_transfer = await resIFPS_transfer.json();

                nftInfo = jsonIFPS_transfer;
                nftActivity[0] = jsonIFPS; // TODO: Check TX history
            }
        } else {
            throw "TX does not contain NFT!";
        }
    }

    let nftPromise = viewNFT();
</script>

{#await nftPromise}
<!-- Loading screen -->
    <div class="alert alert-info shadow-lg mt-4">
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="stroke-current flex-shrink-0 w-6 h-6"
                ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                /></svg
            >
            <span>Loading...</span>
        </div>
    </div>
{:then}
    <div class="container mx-auto px-4 pt-8">
        <NFTCard {nftInfo} {nftActivity} {txID} />
        <NFTActivity {nftInfo} {nftActivity} />
    </div>
{:catch error}
    <div class="alert alert-error shadow-lg mt-4">
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                /></svg
            >
            <span>Error: {error}</span>
            <div class="flex-none">
                <a href="/dogecoin-nft-explorer" class="btn btn-sm btn-active">Go back</a>
              </div>
        </div>
    </div>
{/await}
