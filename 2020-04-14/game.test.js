class Player {
    constructor(player, team){
        this.player = player
        this.team = team
    }
    nextPlayer(team){
        console.log(this)
        let index = team.indexOf(this)
        console.log(team)
        console.log(index)
        return team.indexOf(this.player) + 1;
    }

    passDynamite(team1, team2) {
        if(this.team == 1) {
            return team2[this.nextPlayer(team2)]
        } else {
            return team1[this.nextPlayer(team1)]
        }
    }
}

class SameTeamPassingPlayer extends Player {
    passDynamite(team1, team2){
        let team
        if(this.team == 1){
            team = team1[1]
        } else {
            team = team2[1]
        }
        return team
    }
}



class Game {
    constructor(team1, team2, rounds){
        this.team1 = team1
        this.team2 = team2

        this.holder = this.team1[0]
        this.rounds = rounds
    }

    winner(){
        if (this.holder.team == 1){
            return 2
        } else if(this.holder.team == 2){
            return 1
        }
    }

    start() {
        for(let i =0; i<this.rounds; i++) {
            this.holder = this.holder.passDynamite(this.team1, this.team2)
        }
    }
}

const teamOne = [new Player('A',1)]
const teamTwo = [new Player('C', 2)]

test("2 players, 3 rounds, team 2 wins", () => {
    const maxRounds = 3
    const game = new Game(teamOne, teamTwo, maxRounds)
    game.start()
    expect(game.winner()).toBe(1)
})

test('2 players, 4 rounds, team 1 wins', ()=>{
    const maxRounds = 4
    const game = new Game(teamOne, teamTwo, maxRounds)
    game.start()
    expect(game.winner()).toBe(2)
})

test('4 players, 3 rounds, team 2 wins', () => {
    const team1 = [new Player('A', 1), new Player('B', 1)]
    const team2 = [new Player('C', 2), new Player('D', 2)]
    const maxRounds = 3
    const game = new Game(team1, team2, maxRounds)
    game.start()
    expect(game.winner()).toBe(1)
})

test('4 players, 1 round, player 1 passes to same team', () => {
    const team1 = [new SameTeamPassingPlayer('A', 1), new Player('B', 1)]
    const team2 = [new Player('C', 2), new Player('D', 2)]
    const maxRounds = 1
    const game = new Game(team1, team2, maxRounds)
    game.start()
    expect(game.winner()).toBe(2)
})

test('4 players, 2 rounds, player 1 passes to same team, different player', () => {
    const team1 = [new SameTeamPassingPlayer('A', 1), new Player('B', 1)];
    const team2 = [new Player('C', 2), new Player('D', 2)];
    const maxRounds = 2;
    const game = new Game(team1, team2, maxRounds);
    game.start();
    expect(game.winner()).toBe(1);
})

test.only('4 players, 2 rounds, player 2 passes to same team, different player', () => {
    const team1 = [new Player('A', 1), new SameTeamPassingPlayer('B', 1)];
    const team2 = [new Player('C', 2), new Player('D', 2)];
    const maxRounds = 2;
    const game = new Game(team1, team2, maxRounds);
    game.start();
    expect(game.holder).toBe(team1[1]);
})