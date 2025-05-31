const predlozi = new Set(["od", "do", "iz", "ispred", "iza", "iznad", "ispod", "između", "pored", "pre", "posle", "osim", "uz", "kroz", "na", "o", "po", "pri", "u", "s", "sa", "za", "radi", "zbog", "kod"]);

const prilozi = new Set(["ovde", "onde", "negde", "nigde", "unutra", "napolju", "tamo", "napred", "svejedno", "levo", "desno", "daleko", "blizu", "juče", "tek", "lako", "brzo", "malo", "zato"]);

const uzvici = new Set(["jao", "joj", "oj", "uh", "ah", "oh", "uf", "ura", "ua", "vau", "opa", "op", "ups", "oho", "mrš", "kuš", "iš", "mac", "ej", "hej"]);

const veznici = new Set(["i", "pa", "te", "ni", "niti", "ili", "samo", "zato", "tek", "a", "ali", "nego", "no", "već", "kad", "iako", "ako", "čim", "dok"]);

const recce = new Set(["da", "ne", "valjda", "dakle", "međutim", "samo", "jedino", "kao", "eno", "eto", "gle", "baš", "još"]);

export function tokenize(text){

    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, '') // remove punctuation
        .split(/\s+/)
        .filter(word => word && !predlozi.has(word) && !prilozi.has(word) && !uzvici.has(word) && !veznici.has(word) && !recce.has(word) );
        
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