import * as webfontloader from 'webfontloader'
import { Game } from './game'
import { Gameplay } from './states/gameplay'
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

  const viewRoot = document.querySelector('#game')
  if (!viewRoot) throw new Error('View root not found')
  viewRoot.appendChild(game.app.view)
}

init()
