import { query, countAttempts } from '../db';

export const userQuestions = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const { id } = event.pathParameters;

    const doc = await query('tests').findOne({ _id: id });

    const response = {
        statusCode: 200,
        body: JSON.stringify(doc),
    };
    return response;
};

export const attempts = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const { tikalId, questionId } = event.pathParameters;

    const attempts: number = (await countAttempts(
        tikalId,
        questionId
    )) as number;

    const response = {
        statusCode: 200,
        body: attempts,
    };
    return response;
};
