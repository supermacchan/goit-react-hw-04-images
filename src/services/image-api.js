const BASE_URL = 'https://pixabay.com/api/'
const API_KEY = '30551653-aa9d35c8f88064a7bc9ad69bf';
    
async function fetchImages(query, pageNumber) {
    try {
        const fetchUrl = `${BASE_URL}?q=${query}&page=${pageNumber}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
        const response = await fetch(fetchUrl);

        if (response.ok) {
            return response.json();
        }

        return Promise.reject(
            new Error('Oops! No matches found.'),
        );

    } catch (error) {
        return error;
    }           
};

export const imageAPI = {
    fetchImages,
};
