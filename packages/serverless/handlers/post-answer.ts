import { join } from 'path';
const chai = require('chai');
import { runInNewContext } from 'vm';
import { query, countAttempts } from '../db';

function safeEval(code, context, opts) {
    var sandbox = {};
    var resultKey = 'SAFE_EVAL_' + Math.floor(Math.random() * 1000000);
    sandbox[resultKey] = {};
    code = resultKey + '=' + code;
    if (context) {
        Object.keys(context).forEach(function(key) {
            sandbox[key] = context[key];
        });
    }
    runInNewContext(code, sandbox, opts);
    return sandbox[resultKey];
}

export interface TestResult {
    pass: boolean;
    error: any;
    attempts: number;
}

export const postAnswer = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const { code, questionId, tikalId, time } = JSON.parse(event.body);
    const { questions } = (await query('tests').findOne({
        _id: tikalId,
    })) as any;
    const question = questions.find(q => q._id === questionId);
    const attempts: number = (await countAttempts(
        tikalId,
        questionId
    )) as number;
    const testResult: TestResult = {
        pass: false,
        error: null,
        attempts: attempts + 1;
    };
    try {
        if (attempts >= question.attempts) {
            throw new Error('Too many attempts');
        }

        const path = join(
            '..',
            'questions',
            'javascript',
            question.name,
            'test'
        );

        const { test } = require(path);

        test(safeEval(code), chai);
        testResult.pass = true;
    } catch (err) {
        console.log('err', err);
        testResult.pass = false;
        testResult.error = err.message;
    }

    const answer = {
        tikalId,
        code,
        question,
        time,
        testResult,
    };
    await query('candidateResponses').save(answer);
    return {
        statusCode: 200,
        body: JSON.stringify(testResult, null, 2),
    };
};
