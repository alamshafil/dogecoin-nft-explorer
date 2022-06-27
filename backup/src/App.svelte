<script>
  import dogecoin from "./assets/dogecoin.png";

  let showHome = true;
  let showType = "";
  let error = "";
  let status = "";

  let txID = "";

  // NFT-MAIN values
  let nftMintTime,
    nftName,
    nftCreator,
    nftData,
    nftSupply,
    nftCollection,
    nftDesc,
    nftNSFW,
    nftRoyalPer,
    nftRoyalPay;

  // NFT-NEW values
  let newCreator,
    newPrev,
    newPrevIn,
    newPrevOut,
    newSupply,
    newValue,
    newRoyalTX,
    newIPRights,
    newIPRightsPer    

  function hex2a(hexx) {
    var hex = hexx.toString();
    var str = "";
    for (var i = 0; i < hex.length; i += 2)
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
  }

  function parseTime(timestamp) {
    if (timestamp <= -1) return "Invalid time";
    var date = new Date(timestamp * 1000);
    return (
      date.toLocaleDateString("en-US") + " " + date.toLocaleTimeString("en-US")
    );
  }

  async function lookUp() {
    if (txID != "") {
      // BAD TX: 462afd6b86450c9e69490d96d879ee6e7c7d064bbe8b00380b063142143e9fdb
      // GOOD TX (MAIN): 56cf0e424c9492e142b6ab163f0ec28fc8c296800de18bdb07e54d14111ec060
      // GOOD TX (NEW): 93d67bdf678419b09e2732ca500e0bd49d60380e26062d0e3322276d32efa8f4

      const res = await fetch(`https://chain.so/api/v2/tx/DOGE/${txID}`);
      const jsonRes = await res.json();

      let OP_RETURN = "";
      jsonRes.data.outputs.forEach((output) => {
        if (output.script_asm.includes("OP_RETURN")) {
          OP_RETURN = output.script_asm;
        }
      });

      if (OP_RETURN != "") {
        status = "Getting data from IPFS...";

        var ipfs_hash = hex2a(OP_RETURN.replace("OP_RETURN ", ""))
          .split("[")[1]
          .replace("]", "");

        const resIFPS = await fetch(`https://ipfs.io/ipfs/${ipfs_hash}`);
        const jsonIFPS = await resIFPS.json();
        if (jsonIFPS.lock != undefined) {
          showType = "NFT_MAIN";
          nftData = `https://ipfs.dogeseeds.io/${jsonIFPS.lock.ipfs.image}`;
          nftMintTime = jsonIFPS.time;
          nftName = jsonIFPS.lock.op.name;
          nftCreator = jsonIFPS.lock.creator.address;
          nftSupply = jsonIFPS.lock.op.supply;
          nftCollection = jsonIFPS.lock.op.collection;
          nftDesc = jsonIFPS.lock.op.desc;
          nftNSFW = jsonIFPS.lock.op.nsfw;
          nftRoyalPer = jsonIFPS.lock.op.royalities.percentage;
          nftRoyalPay = jsonIFPS.lock.op.royalities.address.out;

          showHome = false;
          status = "";
        } else {
          showType = "NFT_NEW";

          const resIFPS_new = await fetch(
            `https://ipfs.io/ipfs/${jsonIFPS.ipfs.json}`
          );
          const jsonIFPS_new = await resIFPS_new.json();

          // NFT_MAIN
          nftData = `https://ipfs.dogeseeds.io/${jsonIFPS_new.lock.ipfs.image}`;
          nftMintTime = jsonIFPS_new.time;
          nftName = jsonIFPS_new.lock.op.name;
          nftCreator = jsonIFPS_new.lock.creator.address;
          nftSupply = jsonIFPS_new.lock.op.supply;
          nftCollection = jsonIFPS_new.lock.op.collection;
          nftDesc = jsonIFPS_new.lock.op.desc;
          nftNSFW = jsonIFPS_new.lock.op.nsfw;
          nftRoyalPer = jsonIFPS_new.lock.op.royalities.percentage;
          nftRoyalPay = jsonIFPS_new.lock.op.royalities.address.out;

          // NFT_NEW
          newCreator = jsonIFPS.creator.tx 
          newPrev = jsonIFPS.prev.tx
          newPrevIn = jsonIFPS.in 
          newPrevOut = jsonIFPS.out 
          newSupply = jsonIFPS.op.supply 
          newValue = jsonIFPS.op.value
          newRoyalTX = jsonIFPS.op.royalities.tx
          newIPRights = jsonIFPS.op.ip.rights.amendment
          newIPRightsPer = jsonIFPS.op.ip.rights.percentage

          showHome = false;
          status = "";
        }
      } else {
        error = "TX does not contain NFT!";
      }
    } else {
      error = "TX ID can't be empty!";
    }
  }

  function clear() {
    txID =
      nftMintTime =
      nftName =
      nftCreator =
      nftData =
      nftSupply =
      nftCollection =
      nftDesc =
      nftNSFW =
      nftRoyalPer =
      nftRoyalPay =
        "";
    showHome = true;
  }
</script>

<main>
  {#if showHome}
    <!-- Hero -->
    <div class="hero h-screen bg-base-200">
      <div class="hero-content flex-col">
        <img class="w-20" src={dogecoin} alt="Logo" />
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
              {#if status != ""}
                <div class="alert shadow-lg mb-4">
                  <span>{status}</span>
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
              <button on:click={lookUp} class="btn btn-primary">View NFT</button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  {:else if showType == "NFT_NEW"}
    <!-- NFT_NEW screen -->
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
    </div>
  {:else if showType == "NFT_MAIN"}
    <!-- NFT_MAIN screen -->
    <div class="bg-base-200 mx-auto flex items-center justify-center h-screen">
      <div class="card w-96 bg-base-100 shadow-xl">
        <figure><img src={nftData} alt="NFT" /></figure>
        <div class="card-body space-y-2">
          <h2 class="card-title">Name: {nftName}</h2>
          <p><b>Description</b> {nftDesc}</p>
          <p><b>Minted by:</b> {nftCreator}</p>
          <p><b>Minted at:</b> {parseTime(nftMintTime)}</p>
          <p><b>Supply:</b> {nftSupply}</p>
          <p><b>Collection</b> {nftCollection}</p>
          <p><b>NSFW:</b> {nftNSFW}</p>
          <p><b>Royalities Percentage:</b> {nftRoyalPer * 100}%</p>
          <p><b>Royalities Payment:</b> {nftRoyalPay}</p>
          <div class="card-actions justify-end">
            <button on:click={clear} class="btn btn-primary">Go back</button>
          </div>
        </div>
      </div>
    </div>
  {/if}
</main>
