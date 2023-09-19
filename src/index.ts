type Handler<T extends readonly any[] = []> = ((...args: T) => void) | undefined

function handlers(
  checks: Partial<{
    invalidNodeEnv: Handler
    uncaughtException: Handler<
      [error: unknown, origin: NodeJS.UncaughtExceptionOrigin]
    >
    unhandledRejection: Handler<[reason: unknown, promise: Promise<unknown>]>
  }>
) {
  if (
    checks.invalidNodeEnv &&
    (typeof process.env.NODE_ENV !== 'string' || !process.env.NODE_ENV.trim())
  ) {
    checks.invalidNodeEnv()
  }

  if (checks.uncaughtException) {
    process.on('uncaughtException', checks.uncaughtException)
  }

  if (checks.unhandledRejection) {
    process.on('unhandledRejection', checks.unhandledRejection)
  }
}

export { handlers }
