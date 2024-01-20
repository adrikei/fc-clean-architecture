export type NotificationErrorProps = {
  message: string
  context: string
}

export default class Notification {
  private errors: NotificationErrorProps[] = []

  addError(error: NotificationErrorProps) {
    this.errors.push(error)
  }

  hasErrors(): boolean {
    return this.errors.length > 0
  }

  getErrors(): NotificationErrorProps[] {
    return this.errors
  }

  messages(filterContext?: string): string {
    return this.errors
      .filter((error) => filterContext === undefined || error.context === filterContext)
      .map((error) => `${error.context}: ${error.message}`)
      .join(', ')
  }
}
