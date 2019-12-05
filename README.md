# Candidator

### WIP

A system for performing online coding tests.

Once registering the candidate recievs a set of questions that the answer needs to be in a form of a pure function (currently only supports Javascript).
The function is then submitted and a set of unit tests are executed to ensure the correctness of the submitted implemention. If the answer is correct, the candidate recieves the nest question.

Once done a report should be sent to the initiator.

## Installation

This repo contains 2 major packages: `theseus` (a react-based client app) and `serverless` (a set of serverless lambda functions).

### Running `serverless`

First Create a `.env` file based on the `example.env`

then:

```bash
$ cd packages/serverless
$ yarn install
$ source .env
$ yarn develop
```

For deployment see the [`serverless.com` documentation](https://serverless.com/framework/docs/providers/aws/guide/deploying/)

### Setting up the DB
Currently MongoDB is supported

DB name: `candidator-[stage]`

Collections:
- candidateResponses
- questionsPool
- tests
- users

#### Initializing data
Do a `GET` request to '/init'


### Running 'theseus`

First Create a `.env` file based on the `example.env`

then:

```bash
$ cd packages/theseus
$ yarn install
$ source .env
$ yarn start
```
