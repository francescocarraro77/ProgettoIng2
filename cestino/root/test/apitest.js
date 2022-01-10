const app = require("./api.js");
const fetch = require("node-fetch");
const url = "http://localhost:3000/courses"


describe('api.test', () => {

    let server;

    beforeAll( () => {
        const port = process.env.PORT || 3000;

        // Promisifying app.listen and return promise,
        // letting Jest wait for its resolution before starting tests.
        // https://github.com/nodejs/node/issues/21482
        // https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Promise
        return new Promise( (resolve, reject) => {
            server = app.listen(port, resolve());
            console.log(`Server listening on port ${port}`);
        });

    });

    afterAll( (done) => {
        // Notifying Jest by calling done() in the callback of the close method.
        // No promise used here.
        // https://github.com/visionmedia/supertest/issues/520
        console.log(`Closing server`);
        server.close( done() );
    });

    it('works with get and post', () => {
        var store=1
        expect.assertions(2);
        return fetch(url)
            .then(r => r.json())
            .then( data => {
                expect(data[0]).toEqual({"id": 21, "name": "HCI"})
                store +=  data[0].id
            } )
            .then(r => {
                return fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({name: 'hello course'+ store}),
                    headers: { 'Content-Type': 'application/json' },
                })
            })
            .then(r => r.json())
            .then( data => {
                expect(data.id).toEqual("hellocourse"+store)
            })
    })


    it('works with get', async () => {
        expect.assertions(1)
        var response = await fetch(url)
        expect(response.status).toEqual(200)
    })


    it('works with post', async () => {
        expect.assertions(1)
        var response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({name: 'hello course'}),
            headers: {
            'Content-Type': 'application/json',
            }
        })
        var json = await response.json()
        expect(response.status).toEqual(201)
    });

});