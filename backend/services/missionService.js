function similarity(a, b) {

    let score = 0;

    for(let i = 0; i < Math.min(a.length,b.length); i++){

        if(a[i] === b[i])
            score++;
        else
            break;
    }

    return score;
}

module.exports = {similarity}