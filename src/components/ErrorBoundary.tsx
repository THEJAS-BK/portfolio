import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Rendered when something inside the boundary throws. */
  fallback?: ReactNode
}

type State = { failed: boolean }

/**
 * Keeps one broken component (most likely the WebGL scene) from taking down
 * the entire page.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (this.state.failed) {
      return (
        this.props.fallback ?? (
          <div className="flex h-full w-full items-center justify-center p-8 text-center">
            <p className="max-w-xs text-sm text-mute">
              The interactive scene could not be loaded on this device.
            </p>
          </div>
        )
      )
    }
    return this.props.children
  }
}
