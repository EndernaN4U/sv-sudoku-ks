export default class GameField{
    constructor(_puzzle, _solved){
        this.puzzle = _puzzle;
        this.solved = _solved;
        this.active = _puzzle.join('').split('');

        this.hints = new Array(81).fill("");
        this.hintsThing = {show: false, edit: false};

        this.refs = new Array(81);
        this.actIndex = 0;

        this.startTime = 0;

        this.finished = false;
        this.time = 0;
    }

    plusIndex(ind){
        while(this.refs[this.actIndex + ind].disabled){
            if(this.actIndex + ind >= 80 || this.actIndex + ind <= 0) return;
            ind += (ind > 0)?1:-1;
        }

        this.actIndex += ind;
        this.refs[this.actIndex].focus();
    }

    changeIndex(ind){
        this.actIndex = ind;
        this.refs[this.actIndex].focus();
    }

    leftNumbers(){
        const numbers = [1,2,3,4,5,6,7,8,9];
        let nums = {}
        numbers.forEach(el=>nums[el] = 0)
        this.solved.forEach(el=>nums[el] += 1)
        this.active.forEach(el=>{
            if(el != ' ') nums[el] -= 1;
        })
        return nums;
    }

    arrowsController(e){
        switch(e.key){
            case "ArrowUp":
                if(this.actIndex >= 9) this.plusIndex(-9);
                break;
            case "ArrowDown":
                if(this.actIndex <= 71) this.plusIndex(9);
                break;      
            case "ArrowRight":
                if(this.actIndex <= 79) this.plusIndex(1);
                break;
            case "ArrowLeft":
                if(this.actIndex >= 1) this.plusIndex(-1);
                break;
        }  
    }

    checkIfDone(){
        let flag = true;
        this.active.forEach((el,ind)=>{
            if(el !== this.solved[ind]) flag = false;
        })
        return flag;
    }

}