<script>
    export let nftActivity;
    export let nftInfo;
</script>

<div class="mt-10 mb-10 flex flex-auto">
    {#if nftActivity.length != 0}
        <div class="card w-screen bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">NFT Activity</h2>
                {#each nftActivity as a}
                    <div
                        class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
                    >
                        <input type="checkbox" />
                        <div class="collapse-title text-xl font-medium">
                            {a.out} <b>bought</b> {nftInfo.lock.op.name} from {a.in} for
                            <b>{a.op.value} Ɖ</b>
                        </div>
                        <div class="collapse-content space-y-5">
                            <p><b>New Supply:</b> {a.op.supply}</p>
                            <p>
                                <b>Mint TX ID: </b><span class="text-xs"
                                    >{a.creator.tx}</span
                                >
                            </p>
                            <p>
                                <b>Last TX ID: </b><span class="text-xs"
                                    >{a.prev.tx}</span
                                >
                            </p>
                            <p>
                                <b>Payment TX ID: </b><span class="text-xs"
                                    >{a.op.royalities.tx}</span
                                >
                            </p>
                            <p>
                                <b>IP Percentage: </b>{a.op.ip.rights
                                    .percentage}
                            </p>
                            <p>
                                <b>IP Rights: </b><span class="text-xs"
                                    >{a.op.ip.rights.amendment}</span
                                >
                            </p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {:else}
        <div class="card w-screen bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">No NFT Activity found.</h2>
            </div>
        </div>
    {/if}
</div>
