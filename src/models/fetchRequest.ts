import { FetchRequest } from '../types/interfaces.js';

export async function fetchRequest(request: FetchRequest) {
    if (!request.url) throw new Error('No URL provided');

    const url = request.url;

    delete request.url;

    return await fetch(url, request);
}
