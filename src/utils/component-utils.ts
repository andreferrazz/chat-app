export function setBehaviourOfAnchorChildren(element: HTMLElement) {
  element
    .querySelectorAll<HTMLAnchorElement>('a')
    .forEach(setAnchorBehaviour)
}

export function setAnchorBehaviour(anchor: HTMLAnchorElement) {
  anchor.onclick = anchorOnClick
}

function anchorOnClick(event: MouseEvent) {
  const link = event.target as HTMLAnchorElement

  if (link.hostname === window.location.hostname) {
    event.preventDefault()
    window.history.pushState({ id: link.id }, '', link.href)
  }
}
