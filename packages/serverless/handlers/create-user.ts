import db, { query } from '../db';
import { v1 } from 'uuid';

interface User {
    _id: string;
    id: string;
    email: string;
    name: string;
    pic: string;
    language: string;
}

const getRandomQuestions = (num = 5, tag = 'javascript') => {
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

export const createUser = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const { id, email, pic, name, language } = JSON.parse(event.body);
    let user: User = (await query('users').findOne({ id })) as User;
    if (user) {
        return callback(null, {
            statusCode: 200,
            body: user.id,
        });
    }

    user = {
        _id: v1(),
        id,
        email,
        name,
        pic,
        language,
    };

    const created = await query('users').save(user);
    // create test for user in the DB
    const doc = await query('questionsPool').findOne({ _id: id });
    if (doc) {
        const response = {
            statusCode: 404,
            body: 'Already initialized',
        };
        return response;
    }

    const questions = await getRandomQuestions(5, language);
    const newDoc = query('tests').save(
        Object.assign(
            {
                _id: id,
            },
            { questions }
        )
    );

    return {
        statusCode: 201,
        body: user.id,
    };
};
