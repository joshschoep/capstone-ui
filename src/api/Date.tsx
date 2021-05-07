export function convertUnixToString(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleDateString(undefined, { year: "numeric", month: "2-digit", day: "2-digit" })
}