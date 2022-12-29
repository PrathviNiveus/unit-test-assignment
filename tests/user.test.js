const supertest = require('supertest');
const app = require('../server');


describe('Get user route', () => {
    describe('If user  exists', () => {
        it("Should return array of users", async () => {
            const users = await supertest(app).get('/api/users');
            expect(users.status).toEqual(200);
            expect(users._body.length).toBeGreaterThan(0)
        });
    });
    describe('If user does not exists', () => {
        it("Should return empty array of users", async () => {
            const users = await supertest(app).get('/api/users');
            console.log("uuu", users._body.length);
            expect(users.status).toEqual(200);
            expect(users._body.length).toBeLessThan(0)
        });
    });
});

describe('Post User Route', () => {

    it('Should return true if post api body exists.', async () => {
        const res = await supertest(app)
            .post('/api/create/user')
            .send({
                userId: "ABC123",
                fullName: "Ramesh Lagade",
                emailId: "prathviraj.thokal@niveussolutions.com",
                location: "Mumbai"
            });
        console.log("RRRRR", res.request._data);
        expect(!!res.request._data).toBe(true)
    });

    it('Should return error message if user is already exists', async () => {
        const res = await supertest(app)
            .post('/api/create/user')
            .send({
                userId: "ABC123",
                fullName: "Ramesh Lagade",
                emailId: "prathviraj.thokal@niveussolutions.com",
                location: "Mumbai"
            });
        expect(res.statusCode).toEqual(501)
        expect(res.body.message).toEqual('User already exists.')
    });

    it('Should return success message once user created', async () => {
        const res = await supertest(app)
            .post('/api/create/user')
            .send({
                userId: "ABC12345",
                fullName: "Ramesh Lagade",
                contactNumber: 7208806389,
                emailId: "prathviraj.thokal@niveussolutions.com",
                location: "Mumbai"
            });
        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toEqual('User Created.')
    });
})

describe('Update User Route', () => {

    it('Should return true if update api body exists.', async () => {
        const res = await supertest(app)
            .put('/api/create/user')
            .send({
                userId: "ABC123",
                fullName: "Ramesh Lagade",
                emailId: "prathviraj.thokal@niveussolutions.com",
                location: "Mumbai"
            });
        expect(!!res.request._data).toBe(true)
    });

    it('Should return error message if user is not exists in database', async () => {
        const res = await supertest(app)
            .put('/api/update/user')
            .send({
                userId: "ABC123",
                fullName: "yashraj Thokal",
            });
        expect(res.statusCode).toEqual(501)
        expect(res.body.message).toEqual('User not exists.')
    });

    it('Should return success message if user is updated in database', async () => {
        const res = await supertest(app)
            .put('/api/update/user')
            .send({
                userId: "ABC123",
                fullName: "yashraj Thokal",
            });
        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toEqual('User Updated.')
    });

})