const prompt = require('prompt');

var schema = {
    properties : {
        t_case : {
            description: 'No. of Test Cases ',
            type: 'number',
            pattern: /^\d+$/,
            maximum: 100,
            minimum: 1,
            required: true,
            message: 'Input Number Only 1 <= T <= 100'
        },
        t_num : {
            description: 'No. of Soldiers for Each Case ',
            type: 'array',
            pattern: /^\d+$/,
            maximum: 1000000000,
            minimum: 1,
            required: true,
            message: 'Input Number Only 1 <= N <= 10^8'
        }
    }
};

prompt.start();

prompt.get(schema, function (err, result) {
    if (err) {
        return onErr(err);
    }

    if(result.t_num.length != result.t_case) {
        console.log('No. of Test Cases Doesn\'t Match with Test Cases.')
        return 1;
    }

    console.log('Input Received. Processing ...');

    for(let loop=1; loop<=result.t_case; loop++) {
        console.log('Running Test Case : '+loop);
        let alivePos = getAlive(result.t_num[loop-1]);
        console.log('Soldier Alive in Position : '+alivePos);
    }
});

function onErr(err) {
    console.log(err);
    return 1;
}

function getAlive(manCount = 1) {
    let troopArr = Array();
    for(let pos=1; pos<=manCount; pos++) {
        troopArr.push(pos);
    }

    let loop = 1;
    while(troopArr.length > 1) {
        console.log('Running Encounter : '+loop);
        let isLast;
        for(pos = 0; pos<troopArr.length; pos++) {
            // kill next soldier and pass to next
            // in case last man has sword then next encounter start with him as 1st soldier
            // if last soldier is killed by 2nd last solder then sord passes to 1st next encounter
            if(typeof troopArr[pos + 1] != 'undefined') {
                let deadPos = troopArr.splice(pos + 1, 1);
                console.log('Position '+deadPos.pop()+' is Dead.');
                isLast = true;
            } else {
                isLast = false;
            }
        }

        // make last man as first of new encounter
        // in case sword pass to 1st after killing last soldier
        if(troopArr.length > 1 && (! isLast)) {
            let lastMan = troopArr.pop();
            troopArr.unshift(lastMan);
        }
        console.log('Troop After Encounter '+loop+' : '+troopArr);
        loop++;
    }

    return troopArr.pop();
}