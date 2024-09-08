import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
    const name = req.cookies["name"];
    res.send(`Hello ${name}`);
});

app.post('/login', (req, res) => {
    const name = req.body.name;
    res.cookie("Login", name, {path: "/"});
    res.send(`Hello ${name}`);
});

test("Test Cookie Read", async () => {
    const response = await request(app).get("/")
        .set("Cookie", "name=Me;author=FranXX Code");
    expect(response.text).toBe("Hello Me");
});

test("Test Cookie Write", async () => {
    const response = await request(app).post("/login")
        .send({name: "Me"});
    console.info(response.get("Set-Cookie"))
    expect(response.get("Set-Cookie").toString()).toBe("Login=Me; Path=/");
    expect(response.text).toBe("Hello Me");
});
