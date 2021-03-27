export interface SnackbarOptions {
  content: string
  duration: number
  action: string
  icon?: string
  onAction?: () => void
}
