import db from '../db';

export const allQuestions = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    db.questionsPool.find({}, function(err, docs) {
        if (err) {
            console.error(err);
            return callback(err);
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify(docs),
        };
        return response;
    });
};
