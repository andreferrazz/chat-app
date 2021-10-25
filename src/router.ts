import { Component } from './app/components/component';

export class Router {

  routerContainer: HTMLDivElement

  routes: Array<Route>

  defaultRoute: Route

  constructor(
    routes: Array<Route>,
    defaultRoute?: Route,
    initialPath = window.location.pathname + window.location.search
  ) {
    this.routes = routes

    this.defaultRoute = defaultRoute || routes[0]

    this.routerContainer = document.createElement('div')

    window.addEventListener('locationchange', () => {
      this.renderRoute(window.location.pathname)
    })

    window.history.pushState({ initialPath }, '', initialPath)
  }

  appendRouterToElement(element: HTMLElement) {
    element.appendChild(this.routerContainer)
  }

  private renderRoute(path: string) {
    const route = this.routes.find(route => route.path === path)

    if (route) {
      // RENDER SELECTED ROUTE
      const { component } = route
      this.routerContainer.replaceChildren()
      this.routerContainer.appendChild(new component().rootElement!)
    } else {
      // RENDER DEFAULT ROUTE
      const { component, path } = this.defaultRoute
      window.location.pathname = path
      this.routerContainer.replaceChildren()
      this.routerContainer.appendChild(new component().rootElement!)
    }
  }


}

type Route = { path: string, component: typeof Component }
