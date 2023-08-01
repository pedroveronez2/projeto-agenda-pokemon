
var pokemonApp = new Vue({
    el: '#fullframe',
    data: {
        userHP: 300,
        oppoHP: 250,
        userPokemon: "https://img.pokemondb.net/sprites/black-white/anim/back-normal/venusaur.gif",
        oppoPokemon: "https://www.pkparaiso.com/imagenes/xy/sprites/animados/absol-mega.gif",
        bottomPoke: "Venasaur",
        bottomText: "What will Venasaur do?",
        option1: "Fight",
        topPoke: "Absol",
        option2: "Item",
        option3: "Pokemon",
        option4: "Run",
        backStatus: false,
        tooltipStatus: false,
        timers: null,
        fightOptionStatus: true,
        option1DMG: 70,
        option2DMG: 30,
        option3DMG: 120,
        option4DMG: 100,
        userHpObj: { width: '100%' },
        oppoHpObj: { width: '100%' },
        playerShake: false,
        opponentShake: false,
        playerAttack: false,
        oppoAttack: false,
        currentTurn: "player",
        showbottomright: true
        

        
    },
    methods: {
        fightOption: function (){
            this.option1="Take Down";
            this.option2="Vine Whip";
            this.option3="Solar Beam";
            this.option4="Razor Leaf";
            this.backStatus=true;
            this.tooltipStatus=true;
            this.fightOptionStatus=false;

        },
        itemOption: function (){
            this.bottomText="No item left!";
            var vm = this;
            clearTimeout(this.timers);
            this.timers = setTimeout(function(){
                vm.bottomText="What will Venasaur do?";
            },1500);
        },
        pokemonOption: function (){
            this.bottomText="Venasaur is best pokemon why would you anything else?!";
            var vm = this;
            clearTimeout(this.timers);
            this.timers = setTimeout(function(){
                vm.bottomText="What will Venasaur do?";
            },1500);
        },
        runOption: function (){
            this.bottomText="Cannot Run!";
            var vm = this;
            clearTimeout(this.timers);
            this.timers = setTimeout(function(){
                vm.bottomText="What will Venasaur do?";
            },1500);
        },
        backOption: function (){
            this.option1="Fight";
            this.option2="Item";
            this.option3="Pokemon";
            this.option4="Run";
            this.backStatus=false;
            this.tooltipStatus=false;
            this.fightOptionStatus=true;
        },
        userAttackingOption: function (moveId){
            if (moveId == 1){
                
                this.showbottomright=false;
                
                this.bottomText="Venasaur attacked Absol with Take Down! deals 70 damage";
                this.oppoHP-=this.option1DMG;
                console.log("absol hp is " + this.oppoHP);
                // 160px health is considered 100%
                var newWidth = (this.oppoHP/250)*160;
                this.playerAttack=true;
                this.opponentShake=true;
                setTimeout(()=>{
                    this.playerAttack=false;
                    this.opponentShake=false;
                },500);
                this.oppoHpObj.width= newWidth + "px";
                
                // check if opponent fainted
                if (this.oppoHP < 0){
                    this.restart();
                } else {
                 setTimeout(()=> {
                        this.showbottomright=true;
                        this.bottomText="What will Venasaur do?";
                        this.currentTurn="opponent";
                        this.absolAttack();
                    },1000);                           
                }

                
            }else if(moveId == 2){
                
                this.showbottomright=false;
                this.bottomText="Venasaur attacked Absol with Vine Whip! deals 30 damage"
                 this.oppoHP-=this.option2DMG;
                console.log("absol hp is " + this.oppoHP);
                // 160px health is considered 100%
                var newWidth = (this.oppoHP/250)*160;
                this.playerAttack=true;
                this.opponentShake=true;
                setTimeout(()=>{
                    this.playerAttack=false;
                    this.opponentShake=false;
                },1000);
                pokemonApp.oppoHpObj.width= newWidth + "px";
                // check if opponent fainted
                if (this.oppoHP < 0){
                    this.restart();
                } else {
                      setTimeout(()=> {
                        this.showbottomright=true;
                        this.bottomText="What will Venasaur do?";
                        this.currentTurn="opponent";
                        this.absolAttack();
                    },1000);                            
                }
         

            }else if(moveId == 3){
                this.showbottomright=false;
                this.bottomText="Venasaur attacked Absol with Solar Beam! deals 120 damage"
                 this.oppoHP-=this.option3DMG;
                console.log("absol hp is " + this.oppoHP);
                // 160px health is considered 100%
                var newWidth = (this.oppoHP/250)*160;
                this.playerAttack=true;
                this.opponentShake=true;
                setTimeout(()=>{
                    this.playerAttack=false;
                    this.opponentShake=false;
                },1000);
                pokemonApp.oppoHpObj.width= newWidth + "px";
                 // check if opponent fainted
                if (this.oppoHP < 0){
                    this.restart();
                } else {
                    setTimeout(()=> {
                        this.showbottomright=true;
                        this.bottomText="What will Venasaur do?";
                        this.currentTurn="opponent";
                        this.absolAttack();
                    },1000);
                    
                }


            }else if(moveId == 4){
                this.showbottomright=false;
                this.bottomText="Venasaur attacked Absol with Razor Leaf! deals 100 damage"

                 this.oppoHP-=this.option4DMG;
                console.log("absol hp is " + this.oppoHP);
                // 160px health is considered 100%
                var newWidth = (this.oppoHP/250)*160;
                this.playerAttack=true;
                this.opponentShake=true;
                setTimeout(()=>{
                    this.playerAttack=false;
                    this.opponentShake=false;
                },1000);
                pokemonApp.oppoHpObj.width= newWidth + "px";
               // check if opponent fainted
                if (this.oppoHP < 0){
                    this.restart();
                } else {
                    setTimeout(()=> {
                    this.showbottomright=true;
                        this.bottomText="What will Venasaur do?";
                        this.currentTurn="opponent";
                        this.absolAttack();
                    },1000);                           
                    
                }
                
            }

        },
        
        absolAttack: function(){
                this.showbottomright=false;
                
                this.bottomText="Absol attacked Venasaur with Jaden Smith tweet! deals 10000 damage but venasaur was reborn!";
                this.userHP-=1;
                console.log("venasaur hp is " + this.oppoHP);
                // 160px health is considered 100%
                var newWidth = (this.userHP/300)*160;
                this.oppoAttack=true;
                this.playerShake=true;
                setTimeout(()=>{
                    this.oppoAttack=false;
                    this.playerShake=false;
                },500);
                this.userHpObj.width= newWidth + "px";

                setTimeout(()=> {
                    this.showbottomright=true;
                    this.bottomText="What will Venasaur do?";
                },1000);
                
                this.currentTurn="player";
        },
        reinitialize: function(){
            this.option1="Fight";
            this.option2="Item";
            this.option3="Pokemon";
            this.option4="Run";
            this.backStatus=false;
            this.tooltipStatus=false;
            this.fightOptionStatus=true;
            this.bottomText="What will Venasaur do?";
            this.playerShake=false;
            this.opponentShake=false;
        },
        restart: function(){
            this.userHP=300;
            this.userHpObj.width="160px";
            this.oppoHP=250;
            this.oppoHpObj.width="160px";
            this.option1="Fight";
            this.option2="Item";
            this.option3="Pokemon";
            this.option4="Run";
            this.backStatus=false;
            this.tooltipStatus=false;
            this.fightOptionStatus=true;
            this.bottomText="Absol fainted! match restarting";
             setTimeout(()=> {
                this.showbottomright=true;
                this.bottomText="What will Venasaur do?";
            },2000);   
        }
    }

})
