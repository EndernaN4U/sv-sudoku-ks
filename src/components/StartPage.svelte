<script>
    import {getSudoku} from 'sudoku-gen';
    import sudokusolver from '@mattflow/sudoku-solver'

    export let changer;

    let typ = "plik";
    let diff = "easy";

    let fileInput;

    const hChangeType = (e)=> {typ = e.target.value; diff = "easy";}

    const hChangeDiff = (e)=> diff = e.target.value;

    const hSubmit = ()=>{
        if(typ == "plik"){
            if(!fileInput) return alert("Trzeba dodać jakiś Plik :D!");
            fileInput[0].text().then(res=>{
                let json = JSON.parse(res);
                
                if(!sudokusolver(json.puzzle.replaceAll('-','0'))) return alert("Nie rozwiązywalne :D!");

                changer({puzzle:json.puzzle.replaceAll('-',' ').split(''),
                solved: sudokusolver(json.puzzle.replaceAll('-','0')).split('')})
            })
        }else{
            let sudoku = null;

            switch(diff){
                case('easy'):
                    sudoku = getSudoku("easy");
                    break;
                case('medium'):
                    sudoku = getSudoku("medium");
                break;
                case('hard'):
                    sudoku = getSudoku("hard");
                break;
                case('expert'):
                    sudoku = getSudoku("expert");
                break;
            }
            changer({puzzle: sudoku.puzzle.replaceAll('-',' ').split(''),
            solved: sudoku.solution.split('')});
        }
    }

</script>

<div class="StartPage">
    <div class="WyboryGry">
        <div class="BoxyGry">
            <label for="plikTyp" class={(typ === "plik"?"Active":"")}>Plik</label>
            <input checked={true} type="radio" name="typGen" value="plik" id="plikTyp" on:change={hChangeType}>
    
            <label for="genTyp" class={(typ === "gen"?"Active":"")}>Generowanie</label>
            <input type="radio" name="typGen" value="gen" id="genTyp" on:change={hChangeType}>    
        </div>
        
        <div class="wyborCon">
            {#if typ == "plik"}
                <input type="file" bind:files={fileInput}>    
            {:else}
                <label for="easeDiff">Ease</label>
                <input checked={true} type="radio" name="diff" value="easy" id="easeDiff" on:change={hChangeDiff}>

                <label for="mediumDiff">Medium</label>
                <input type="radio" name="diff" value="medium" id="mediumDiff" on:change={hChangeDiff}>

                <label for="hardDiff">Hard</label>
                <input type="radio" name="diff" value="hard" id="hardDiff" on:change={hChangeDiff}>

                <label for="expertDiff">Expert</label>
                <input type="radio" name="diff" value="expert" id="expertDiff" on:change={hChangeDiff}>
            {/if}
        </div>
        
        <button on:click={hSubmit} class="StartGame">Rozpocznij</button>
    </div>
</div>