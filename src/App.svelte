<script>
    import StartPage from "./components/StartPage.svelte";
    import Game from "./components/Game.svelte";
    import GameField from './static/GameField';

    let started = false;
    let game = null;

    const setGame = (props)=>{
      game = new GameField(props.puzzle, props.solved);
      started = true;
    }

    const finishGame = () => started = false;

</script>

<div class="container">
  {#if !started}
    <StartPage changer={setGame}/>
  {:else}
    <Game data={game} finished={finishGame}/>
  {/if}
  
</div>