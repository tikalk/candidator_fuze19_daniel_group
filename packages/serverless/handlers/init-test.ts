import db, { query } from '../db';

const getRandomQuestions = (num = 5, tag) => {
    const queryTag = tag.toLowerCase();
    return new Promise((resolve, reject) => {
        db.questionsPool
            .aggregate([
                { $match: { tags: { $elemMatch: { $eq: queryTag } } } },
                { $sample: { size: num } },
            ])
            .toArray((err, doc) => {
                if (err) {
                    reject(err);
                }
                resolve(doc);
            });
    });
};

//export const find = promisify(db.questionsPool.find);
export const initTest = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const { id } = event.pathParameters;

    // create test for user in the DB
    const doc = await query('questionsPool').findOne({ _id: id });
    if (doc) {
        const response = {
            statusCode: 404,
            body: 'Already initialized',
        };
        return response;
    }

    const questions = await getRandomQuestions(5, 'javascript');
    const newDoc = await query('tests').save(
        Object.assign(
            {
                _id: id,
            },
            { questions }
        )
    );

    const response = {
        statusCode: 200,
        body: JSON.stringify(newDoc),
    };
    return response;
};
