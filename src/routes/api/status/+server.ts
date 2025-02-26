import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const GET: RequestHandler = async () => {
    const targetUrl = env.OLLAMA_API_URL;
    if (!targetUrl) {
        return new Response(JSON.stringify({ error: 'API_URL not set in environment variables' }), { status: 500 });
    }

    try {
        const response = await fetch(targetUrl, { method: 'GET' });
        return new Response(JSON.stringify({ status: response.status, statusText: response.statusText }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch URL' }), { status: 500 });
    }
};