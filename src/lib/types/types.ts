export interface GlobalErrorResponse {
    success: boolean
    statusCode: number
    message: string
    errors: Record<string, string[]>
}