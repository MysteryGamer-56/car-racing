class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    this.rank =0;
    this.score = 0;
    this.fuel = 185;
    this.life = 185;

  }

  getCarsAtEnd() {
    database.ref("carsAtEnd").on("value", data=> {
      this.rank = data.val();
      
    });
  }

  static updateCarsAtEnd(rank){
    database.ref('/').update({carsAtEnd : rank})
  }

  getCount() {
    var playerCountRef = database.ref("playerCount");
    playerCountRef.on("value", data=> {
      playerCount = data.val();
      console.log("player count ", playerCount)
    });
  }

  updateCount(count){
    database.ref('/').update({playerCount : count})
  }

  addPlayer(){
    var playerIndex = "players/player" + this.index;

    if (this.index ===1){
      this.positionX = width/2 -100;
    }
    else {
      this.positionX = width/2 + 100;
    }

    database.ref(playerIndex).set({
      name:this.name,
      positionX : this.positionX,
      positionY : this.positionY,
      rank:this.rank,
      score:this.score,
    })
  }

  update() {
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).update({
      positionX: this.positionX,
      positionY: this.positionY,
      rank:this.rank,
      score:this.score,
     
    });
  }

  static getPlayersInfo(){
    var playerInfoRef = database.ref("players");
    playerInfoRef.on("value", data=> {
      allPlayers = data.val();
      
    });

  }
}
