const baseUrl = "https://raw.githubusercontent.com/avenaki/speech-recognition-dataset/master/recordings/"

// filename to url
export function filenameToUrl(filename: string): string {
    return `${baseUrl}${filename}`
}

// filename to phrase id (second part of the filename)
export function filenameToPhraseId(filename: string): string {
    const parts = filename.split(".")
    return parts[1]
}

// filename list (load from filename.txt)
export async function loadFilenameList(): Promise<string[]> {
    const response = await fetch("/listening/filename.txt")
    const text = await response.text()
    const lines = text.split("\n")
    return lines.filter(line => line.trim() !== "")
}

// phrase list (load from phrase.csv, line format: id,phrase)
export async function loadPhraseList(): Promise<{ id: string, phrase: string }[]> {
    const response = await fetch("/listening/phrase.csv")
    const text = await response.text()
    const lines = text.split("\n")
    return lines
        .filter(line => line.trim() !== "")
        .map(line => {
            const [id, phrase] = line.split(",")
            return { id, phrase }
        })
}