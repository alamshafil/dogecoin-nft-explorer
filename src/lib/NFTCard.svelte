<script>
    export let nftInfo;
    export let nftActivity;
    export let txID;

    import {
        parseTime,
        IPFS_DATA,
        EXPOLRER_TX,
        EXPOLRER_ADDR,
    } from "$lib/utils.js";

    let name = nftInfo.lock.op.name;
    let desc = nftInfo.lock.op.desc;
    let data = IPFS_DATA + nftInfo.lock.ipfs.image;
    let creator = nftInfo.lock.creator.address;
    let mintTime = nftInfo.time;
    let supply = nftInfo.lock.op.supply;
    let collection = nftInfo.lock.op.collection;
    let nsfw = nftInfo.lock.op.nsfw;
    let royalAddr = nftInfo.lock.op.royalities.address.out;
    let royalPer = nftInfo.lock.op.royalities.percentage + "%";
</script>

<svelte:head>
    {#if name != undefined}
        <title>{name} - Dogecoin NFT Explorer</title>
    {:else}
        <title>Not found - Dogecoin NFT Explorer</title>
    {/if}
</svelte:head>

<div class="flex">
    <!-- Image card -->
    <div class="flex-none mr-10">
        <div class="card w-96 bg-base-100 shadow-xl">
            <figure><img src={data} alt="NFT" /></figure>
            <div class="card-body">
                <h2 class="card-title">{name}</h2>
                <p>{desc}</p>
                {#if nftActivity.length != 0}
                    <p class="text-sm">
                        Last sale: <b
                            >{nftActivity[nftActivity.length - 1].op.value} Ɖ</b
                        >
                    </p>
                {/if}
            </div>
        </div>
    </div>
    <!-- Main card -->
    <div class="flex-auto w-64">
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">{name}</h2>
                <a
                    href={EXPOLRER_TX + txID}
                    target="_blank"
                    class="text-xs text-gray-500">TX ID: {txID} ↗</a
                >
                <hr
                    class="mt-4 mb-4 text-gray-400"
                    style="border-top: 1px solid #404040"
                />
                <table
                    class="table-auto"
                    style="border-collapse: separate; border-spacing: 0 10px"
                >
                    <tbody>
                        <tr>
                            <td>Creator:</td>
                            <td>
                                <a
                                    href={EXPOLRER_ADDR + creator}
                                    target="_blank"
                                    >{creator} ↗
                                </a>
                            </td>
                        </tr>
                        {#if nftActivity.length != 0}
                            <tr>
                                <td>Owner (TX):</td>
                                <td
                                    ><a
                                        href={EXPOLRER_ADDR +
                                            nftActivity[nftActivity.length - 1]
                                                .out}
                                        target="_blank"
                                        >{nftActivity[nftActivity.length - 1]
                                            .out} ↗</a
                                    ></td
                                >
                            </tr>
                        {/if}
                        <tr>
                            <td>IPFS Data:</td>
                            <td>{nftInfo.lock.ipfs.image}</td>
                        </tr>
                        <tr>
                            <td>Minted:</td>
                            <td>{parseTime(mintTime)}</td>
                        </tr>
                        {#if nftActivity.length == 0}
                            <tr>
                                <td>Mint TX:</td>
                                <td>
                                    <a
                                        href={EXPOLRER_TX + txID}
                                        target="_blank"
                                    >
                                        {txID} ↗
                                    </a>
                                </td>
                            </tr>
                        {:else}
                            <tr>
                                <td>Mint TX:</td>
                                <td>
                                    <a
                                        href={EXPOLRER_TX +
                                            nftActivity[0].creator.tx}
                                        target="_blank"
                                    >
                                        {nftActivity[0].creator.tx} ↗
                                    </a>
                                </td>
                            </tr>
                        {/if}
                        <tr>
                            <td>Collection:</td>
                            <td>{collection}</td>
                        </tr>
                        <tr>
                            <td>Supply:</td>
                            <td>{supply}</td>
                        </tr>
                        <tr>
                            <td>NSFW:</td>
                            <td>{nsfw}</td>
                        </tr>
                        <tr>
                            <td>Royalities Percentage:</td>
                            <td>{royalPer}</td>
                        </tr>
                        <tr>
                            <td>Royalities address:</td>
                            <td>
                                <a
                                    href={EXPOLRER_ADDR + royalAddr}
                                    target="_blank"
                                    >{royalAddr} ↗
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
