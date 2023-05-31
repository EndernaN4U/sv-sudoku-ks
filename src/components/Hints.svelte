<script>
    export let show;
    export let edit;
    export let clear;

    import { fly } from "svelte/transition";

    let isShown;
    let isEdit;
</script>

<div class="hintMenu">
    <label for="ShowHint" class="ShowHintMenu {(isShown)?"Showing":""}">Show</label>
    <input type="checkbox" id="ShowHint"
    on:change={show}
    bind:checked={isShown}
    on:change={e=>isEdit = false}>
    {#if isShown}
        <label for="EditHint" class="EditHint {(isEdit)?"Editing":""}" in:fly={{ x:2000 }}>Edit</label>
        <input type="checkbox" id="EditHint"
        on:change={edit}
        bind:checked={isEdit}> 

        <button on:click={clear} in:fly={{ x:2000, delay: 100 }}>Clear</button>
    {/if}
</div>