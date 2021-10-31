import { Component } from './component';

const baseTemplate = `
  <div class="dark">
    <div class="content">
      <h1 class="title">Chat App</h1>
      
      <div class="field-wrapper">
        <span class="label">Nome</span>
        <input id="username" class="input-username" type="text" />
      </div>
      
      <div class="field-wrapper">
        <span class="label">Room</span>
        <select id="rooms" class="select-rooms">
          <option value="" disabled selected>Select the room</option>
          <option value="lobby">Lobby</option>
          <option value="2">Room 2</option>
          <option value="3">Room 3</option>
        </select>
      </div>
      
      <button id="btnContinue" class="btn-continue" type="button">Continue</button>
      
      <a class="link-github" href="https://github.com/andreferrazz" target="_blank">
        <img src="/src/assets/images/GitHub-Mark-32px.png" />
        <span>Check the source code on Github</span>
      <a/>
    </div>
  </div>
`

export class LoginPage extends Component {
  rootElement: HTMLDivElement

  constructor() {
    super()
    this.rootElement = document.createElement('div')
    this.rootElement.innerHTML = baseTemplate
    this.rootElement.classList.add('login-page')

    const inputUsername = this.rootElement.querySelector<HTMLInputElement>('#username')!
    const selectRooms = this.rootElement.querySelector<HTMLInputElement>('#rooms')!
    const btnContinue = this.rootElement.querySelector<HTMLInputElement>('#btnContinue')!

    btnContinue.onclick = _event => {
      this.saveNameInLocalStorage(inputUsername.value)
      window.history.pushState({ id: selectRooms.value }, '', `/room?name=${selectRooms.value}`)
    }
  }

  private saveNameInLocalStorage(username: string) {
    localStorage.setItem('username', username)
  }
}