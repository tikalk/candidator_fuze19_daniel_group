import { query } from '../db';

export const question = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const doc = await query('questionsPool').findOne({
        _id: event.pathParameters.id,
    });
    const response = {
        statusCode: 200,
        body: JSON.stringify(doc),
    };
    return response;
};
