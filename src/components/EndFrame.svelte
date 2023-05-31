<script>
    export let data;
    export let finished;
</script>

<div class="EndFrame">
    <h2>Your time: {data.time / 1000}s</h2>
    <button on:click={()=>{finished()}}>Back</button>
</div>