
const Base_url = 'http://localhost:3001'

export const fetcher = async (url) =>{
    let responseObject = {errorMesssage: '',data: [] };

    try {
        const response = await fetch(Base_url + url)
        if (!response.ok) {
            throw new Error(`HTTP ERROR ${response.status}`)
        }
        const responseData = await response.json()
        responseObject.errorMesssage = '';
        responseObject.data = responseData;

        return responseObject;
    } 
    catch (err) {
        responseObject.errorMesssage = err.messsage
        return responseObject;
    }
    
}

export const getCategories = () =>{
    return fetcher('/categories');
}

export const getProducts = id =>{
    return fetcher('/products?catId='+id);
}

export const getProductById = id =>{
    return fetcher('/products/' + id);
}