interface Settings {
  app: AppInterface
  user: UserInterface
}

interface ObjectConstructor {
  values(target: Object): any[]
}
