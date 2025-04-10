export function tokenize(text){
    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, '') // remove punctuation
        .split(/\s+/)
        .filter(word => word && !stopWords.has(word));
} 