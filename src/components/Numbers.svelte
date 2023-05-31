<script>
    export let data;
</script>

<div class="numberMenu">
    {#each Object.entries(data.leftNumbers()) as [num,val]}
        <span>{num}:{val}</span>
    {/each}
</div>