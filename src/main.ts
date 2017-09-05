import * as webfontloader from 'webfontloader'
import { Game } from './game'
import { Gameplay } from './states/gameplay'
import { query } from './util/dom'
// import { MainMenu } from './states/main-menu'

function init() {
  webfontloader.load({
    google: {
      families: ['Teko'],
    },
    active: runGame,
  })
}

function runGame() {
  const game = new Game()
  game.setState(new Gameplay(game))
  game.run()
  query('#game').appendChild(game.app.view)
}

init()
