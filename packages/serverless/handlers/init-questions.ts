import { query } from '../db';
import { join, resolve } from 'path';
import { v4 } from 'uuid';
import { readFileSync } from 'fs';

import jsQuestions from '../questions/javascript/questions';

export const initQuestions = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const questionsToInsert = jsQuestions.map(q => {
        q._id = v4();
        const descriptionPath = resolve(
            __dirname,
            '..',
            'questions',
            'javascript',
            q.name,
            'question.md'
        );
        q.description = readFileSync(descriptionPath, 'utf-8');
        return q;
    });

    await query('questionsPool').remove();
    await query('questionsPool').insertMany(questionsToInsert);
    return {
        statusCode: 201,
        body: 'ok',
    };
};
