const {test, expect} = require('@playwright/test');

test('Make HTTP GET request', async ({page}) =>
{
    // Make an HTTP GET request using page.request
    const response = await page.request.get('https://jsonplaceholder.typicode.com/posts/1');
    
    // Verify the response status is 200 (OK)
    expect(response.status()).toBe(200);
    
    // Get the response body as JSON
    const data = await response.json();
    
    // Verify the response contains expected data
    expect(data.id).toBe(1);
    expect(data.userId).toBe(1);
    expect(data.title).toBeTruthy();
    expect(data.body).toBeTruthy();
    
    // Log the response data
    console.log('Response Data:', data);
});

test('Make HTTP GET request with headers', async ({page}) =>
{
    // Make a GET request with custom headers
    const response = await page.request.get('https://jsonplaceholder.typicode.com/users/1', {
        headers: {
            'Accept': 'application/json',
            'User-Agent': 'Playwright Test'
        }
    });
    
    // Verify response
    expect(response.status()).toBe(200);
    
    const user = await response.json();
    expect(user.id).toBe(1);
    expect(user.name).toBeTruthy();
    expect(user.email).toBeTruthy();
    
    console.log('User Data:', user);
});

test('Make HTTP GET request and validate headers', async ({page}) =>
{
    const response = await page.request.get('https://jsonplaceholder.typicode.com/posts');
    
    // Check response headers
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
    
    // Get response body
    const posts = await response.json();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
    
    console.log('Number of posts:', posts.length);
});
