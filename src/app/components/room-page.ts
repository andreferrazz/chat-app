import { Channel, Socket } from 'phoenix';
import { getParams } from '../../utils/location-utils';
import { Component } from './component';

type Message = { sender: string, text: string, date: Date }

const baseTemplate = `
  <div class="content-wrapper">
    <h1 id="roomName">Room: Lobby</h1>
    <div id="messagesContainer" class="messages-container"></div>
    <form id="formMessage" class="form-message">
      <input id="inputMessage" class="input-message" type="text" />
      <button class="btn-send">Send</button>
    </form>
  </div>
`

export class RoomPage extends Component {

  readonly CONN_URL = 'ws://192.168.1.7:4000/socket'

  rootElement: HTMLDivElement

  socket: Socket | undefined
  channel: Channel | undefined
  username: string | null
  roomName: string | undefined

  constructor() {
    super()
    this.rootElement = document.createElement('div')
    this.rootElement.innerHTML = baseTemplate
    this.rootElement.classList.add('room-page')

    const roomName = this.rootElement.querySelector<HTMLTitleElement>('#roomName')!
    const formMessage = this.rootElement.querySelector<HTMLFormElement>('#formMessage')!
    const messagesContainer = this.rootElement.querySelector<HTMLDivElement>('#messagesContainer')!

    this.username = localStorage.getItem('username')

    this.roomName = getParams().get('name')

    roomName.innerText = `Room: ${this.roomName} - Username: ${this.username}`

    this.connectToLobby()

    this.channel?.on('new_msg', payload => {
      payload.message.date = new Date(payload.message.date)
      const messageElement = this.createMessageElement(payload.message)
      messagesContainer.appendChild(messageElement)
    })

    this.setFormMessageListener(formMessage)
  }

  private connectToLobby() {
    this.socket = new Socket(this.CONN_URL, {})

    this.socket.connect()

    this.channel = this.socket.channel(`room:${this.roomName}`, {})

    this.channel.join()
      .receive('ok', response => console.log("Joined successfully", response))
      .receive('error', response => console.log("Unable to join", response))
  }

  private setFormMessageListener(formMessage: HTMLFormElement) {
    const inputMessage = formMessage.querySelector<HTMLInputElement>('#inputMessage')!
    
    formMessage.onsubmit = event => {
      event.preventDefault()

      const messageText = inputMessage.value

      if (messageText.trim().length > 0) {
        this.channel!.push('new_msg', {
          message: {
            sender: this.username,
            text: messageText,
            date: new Date(),
          }
        })
        inputMessage.value = ''
      }
    }
  }

  private createMessageElement({ sender, text, date }: Message): HTMLSpanElement {
    const message = document.createElement('div')

    message.innerHTML = `
      <div class="sender">${sender}</div>
      <span class="text-wrapper">
        <span class="text">${text}</span>
      </span>
      <span class="time">${date.getHours()}:${date.getMinutes()}</span>
    `
    
    const className = sender === this.username ? 'my' : 'others'
    message.classList.add('message-item', className)

    return message
  }
}