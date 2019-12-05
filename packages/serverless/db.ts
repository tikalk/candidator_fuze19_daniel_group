import mongojs from 'mongojs';

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PWD;
const url = process.env.MONGO_URL;
const dbName = process.env.MONGO_DB_NAME;

const connectionString: string = `mongodb+srv://${user}:${password}@${url}/${dbName}?retryWrites=true&w=majority`;
const collections: string[] = ['questionsPool', 'tests', 'users'];

const db = mongojs(connectionString, collections);

export default db;

export const query = (collection: string) => {
    return {
        find: args =>
            new Promise((resolve, reject) => {
                db[collection].find(args, (err, doc) => {
                    if (err) return reject(err);
                    return resolve(doc);
                });
            }),

        findOne: args =>
            new Promise((resolve, reject) => {
                db[collection].findOne(args, (err, doc) => {
                    if (err) return reject(err);
                    return resolve(doc);
                });
            }),
        save: args =>
            new Promise((resolve, reject) => {
                db[collection].save(args, (err, doc) => {
                    if (err) return reject(err);
                    return resolve(doc);
                });
            }),
        insertMany: args =>
            new Promise((resolve, reject) => {
                db[collection].insertMany(args, (err, doc) => {
                    if (err) return reject(err);
                    return resolve(doc);
                });
            }),
        remove: args =>
            new Promise((resolve, reject) => {
                db[collection].remove(args, (err, doc) => {
                    if (err) return reject(err);
                    return resolve(doc);
                });
            }),
    };
};

export const countAttempts = (tikalId: string, questionId: string) =>
    new Promise((resolve, reject) => {
        db.candidateResponses
            .find({ tikalId, 'question._id': questionId })
            .count((err, num) => {
                if (err) {
                    return reject(err);
                }
                return resolve(num);
            });
    });
