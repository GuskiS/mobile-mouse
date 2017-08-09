import { Injectable, NgZone } from "@angular/core"
import { Observable } from "rxjs/Observable"
import { Subscriber } from "rxjs/Subscriber"

@Injectable()
export class ElectronService {
  electron = window.__electron
  observable: Observable<AppInterface>
  watcher: { dispose: Function }

  settings: Settings = {
    app: this.app.get(),
    user: this.user.get()
  }

  constructor(private zone: NgZone) {
    this.observable = new Observable<AppInterface>(this.observer.bind(this)).share()
    this.observable.subscribe()
  }

  clean(): void {
    this.zone.runOutsideAngular(() => this.watcher.dispose())
  }

  get app() {
    return this.electron.settings.app
  }

  get user() {
    return this.electron.settings.user
  }

  get controls() {
    return this.electron.controls
  }

  get shell() {
    return this.electron.shell
  }

  private observer(observer: Subscriber<AppInterface>): void {
    this.watcher = this.app.watch((result: AppInterface) => {
      this.zone.run(() => {
        this.settings.app = result
        observer.next(result)
      })
    })
  }
}
