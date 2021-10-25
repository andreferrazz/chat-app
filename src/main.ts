import { RoomPage } from './app/components/room-page';
import { LoginPage } from './app/components/login-page'
import { Router } from './router'
import './style.css'


const app = document.querySelector<HTMLDivElement>('#app')!

const router = new Router(
  [
    { path: '/', component: LoginPage },
    { path: '/room', component: RoomPage },
  ],
  { path: '/', component: LoginPage }
)

router.appendRouterToElement(app)
