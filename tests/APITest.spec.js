const { test, expect } = require('@playwright/test');

let userId;

test("API TEST", async ({ request }) => {
    const response = await request.get("https://dotesthere.com/api/users/1");
    await expect(response.status()).toBe(200);
    console.log(await response.json());
});

test("API TEST 2 post", async ({ request }) => {
    const response = await request.post("https://dotesthere.com/api/users", {
        data: { 
            "email": "ankur.automation@dotesthere.com", 
            "first_name": "Ankur", 
            "job": "QA Engineer" 
        },
        headers: { "Accept": "application/json" }
    });

    expect(response.status()).toBe(201);
    const redId = await response.json();  
    console.log(redId);
    userId = redId.id;
});

test("API Test3 update", async ({ request }) => {
    const response = await request.put(`https://dotesthere.com/api/users/${userId}`, {
        data: { 
            email: "ankur.automation@dotesthere.com", 
            first_name: "Ankur", 
            job: "Senior QA Engineer" 
        },
        headers: { "content-type": "application/json" }
    });

    expect(response.status()).toBe(200);
    console.log(await response.json());
});

test("API Test 4 delete", async ({ request }) => {
    const response = await request.delete(`https://dotesthere.com/api/users/${userId}`);
    expect(response.status()).toBe(204);
});