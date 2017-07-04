import { Game } from './game'
import { MainMenu } from './states/main-menu'

const game = new Game()
game.setState(new MainMenu(game))
game.run()

const viewRoot = document.querySelector('#game')
if (!viewRoot) throw new Error('View root not found')
viewRoot.appendChild(game.app.view)
