function parseText(inStr){
    let strArr = inStr.toLowerCase().replace(/\,+/g, '').split(' ');
    return strArr;
}

function generateWordPairs(inStr){
    let pairs = {};
    let strArr = parseText(inStr);

    for(let i = 1; i < strArr.length; i++){
        //helper variables
        let curKey = strArr[i - 1]
        let curValue = strArr[i]

        //we already delt with converting existing pair to array after this point
        //if multiple value wanted to add to the same key we push to array, otherwise create new key
        if(pairs[curKey]){
            pairs[curKey].push(curValue);
        } else {
            pairs[curKey] = [curValue];
        }

    }
    return pairs;
}

function writeLine(chain, numOfWords){
    let line = '';
    let keys = Object.keys(chain);
    let numOfKeys = keys.length;
    //pick a randome key to begin with
    let curKey = keys[randomInt(numOfKeys)];
    let word;

    for(let i = 0; i < numOfWords; i++){
        if(!chain[curKey]){
            if(Array.isArray(curKey)){
                curKey = chain[curKey][randomInt(chain[curKey].length)];
            } else {
                curKey = keys[randomInt(numOfKeys)];
            }
        }
        if(Array.isArray(chain[curKey])){
            word = chain[curKey][randomInt(chain[curKey].length)];
        } else {
            word = chain[curKey];
        }
        line += word + ' ';
        curKey = word;
    }
    console.log(line);
}

//helper function (gives a random number)
function randomInt(max){
    return Math.floor(Math.random() * max);
}

function generatePoem(corpus, numOfLines){
    let chain = generateWordPairs(corpus);
    let minimumWords = 4;
    let maxWords = 10;
    for(let i = 0; i < numOfLines; i++){
        writeLine(chain, randomInt(maxWords - minimumWords) + minimumWords)
    }
}

let text = "We're no strangers to love, You know the rules and so do I, a full commitment's what I'm thinking of, You wouldn't get this from any other guy, I just wanna tell you how I'm feeling Gotta make you understand"

generatePoem(text, 10)