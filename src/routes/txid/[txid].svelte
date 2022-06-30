<script>
    import Fa from 'svelte-fa'
    import { faSync, faWarning, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
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
            <Fa icon={faSync} spin fw/>
            <span>Loading...</span>
        </div>
    </div>
{:then}
    <div class="container mx-auto px-4 pt-8">
        <NFTCard {nftInfo} {nftActivity} {txID} />
        <NFTActivity {nftInfo} {nftActivity} />
    </div>
{:catch error}
    <div class="flex justify-center items-center h-screen">
        <div class="modal modal-open modal-bottom sm:modal-middle">
            <div class="modal-box">
              <Fa icon={faWarning} size="2x" fw />
              <h3 class="font-bold text-lg mt-4">Error: {error}</h3>
              <div class="modal-action">
                <a href="/dogecoin-nft-explorer" class="btn btn-active"><Fa icon={faArrowLeft} fw /> Go back</a>
              </div>
            </div>
          </div>
    </div>
{/await}
