<script>
    import { onMount } from "svelte";

    import Hints from "./Hints.svelte";
    import Numbers from "./Numbers.svelte";
    import { fly } from "svelte/transition";
    import EndFrame from "./EndFrame.svelte";

    export let data;
    export let finished;

    onMount(()=>{
        data.startTime = Date.now();
    })

    const show = e => data.hintsThing.show = e.target.checked;
    const edit = e => data.hintsThing.edit = e.target.checked;
    const clearHints = e => { 
        data.hints.fill('');
        data.hintsThing.show = data.hintsThing.show;
    }

    const isitDone = ()=>{
        if(data.checkIfDone()){
            data.finished = true;
            data.time = Date.now()-data.startTime;
        }
    }

    const fill = () => {
        data.solved.forEach((el,ind)=>data.active[ind] = el);
        isitDone();
    }   
    
    const keyH = (e,ind)=>{
        if(data.finished) return;
        if(e.key !== "Backspace") return;

        if(!data.hintsThing.edit){
            data.active[ind] = ' ';
        }
        else{
            data.hints[ind] = ' ';
        }
        if(ind > 0) data.plusIndex(-1);
    }

    const inputH = (e, ind) => {
        if(data.finished) return e.target.value = data.active[ind];
        if(!/^[1-9]+$/.test(e.data)) return e.target.value = data.active[ind];

        if(data.hintsThing.edit){
            data.hints[ind] = e.data;
            e.target.value = data.active[ind];
            if(ind < 80) data.plusIndex(1);
            return;
        }

        data.active[ind] = e.data;
        e.target.value = e.data;

        if(ind < 80) data.plusIndex(1);
        isitDone();
        
    }
</script>

<div class="header">
    {#if !data.finished}
        <Hints show={show} edit={edit} clear={clearHints} />
        {#key data.active}
            <Numbers data={data} />
        {/key}
        <div class="AddButtons">
            <button on:click={fill}>Fill</button>
            <button on:click={()=>{print()}}>Print</button>
            <button on:click={()=>{finished()}}>Back</button>
        </div>
    {:else}
        <EndFrame data={data} finished={finished}/>
    {/if}
</div>

<div class="FieldsContainer" on:keydown={e => data.arrowsController(e)}>
    {#each data.active as active, index}
        <div class="Field">
            <input type="text" value={active}
            on:input={(e)=>inputH(e,index)}
            on:keydown={(e)=>keyH(e,index)}
            on:focus={(e)=>data.actIndex = index}
            bind:this={data.refs[index]}
            disabled={(active === data.puzzle[index] && active !== ' ')? true:false}
            class="InputField {(active === data.solved[index])? "Correct":"Incorrect"}"
            in:fly={{ y:2000, delay:8*index }}>

            {#if data.hintsThing.show}
                <p class="HintField">{data.hints[index]}</p>
            {/if}
        </div>
    {/each}
</div> 


