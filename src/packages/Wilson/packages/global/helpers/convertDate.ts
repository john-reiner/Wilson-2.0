export const convertDate = (
    date: string | undefined
) => {
    if (!date) return
    let modified = new Date(date)
    let now = new Date()
    let milliseconds = (+now - +modified)
    let midnight = new Date().setUTCHours(0, 0, 0, 0);
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    if (seconds < 60) {
        return `${seconds} seconds ago`
    }
    if (minutes < 60) {
        return `${minutes} minutes ago`
    }
    if (hours < 24) {
        return `${hours} hours ago`
    }
    return modified.toLocaleDateString('en-US')
}