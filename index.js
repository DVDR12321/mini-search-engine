const stopWords = new Set(["the", "is", "and", "a", "an", "of", "for"]);

export function tokenize(text){

    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, '') // remove punctuation
        .split(/\s+/)
        .filter(word => word && !stopWords.has(word));
} 

export function buildIndex(docs){
    console.time('buildIndex');
    let index = {};

    let indexKeys = new Set([]);

    docs.forEach((doc) => {
        let tokenizedText = tokenize(doc.description);
        tokenizedText.forEach((word) => {
            if(!indexKeys.has(word)){
                indexKeys.add(word);
                index[word] = new Set([]);
            }
            index[word].add(doc.jobID);
        })
    })
    console.timeEnd('buildIndex');
    return index;
}