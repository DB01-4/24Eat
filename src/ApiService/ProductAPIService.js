const PRODUCTS_REST_API = 'https://db01-4-menuservice.herokuapp.com/api/public/categories/';
const CATEGORIESBYID_REST_API = 'http://localhost:8080/products/category/';
const PRODUCTSBYID_REST_API = 'http://localhost:8080/products/';


class ProductAPIService {   

    getProducts(){
        return fetch(PRODUCTS_REST_API,{ 
            method: 'get',
                headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                },
                'credentials': 'same-origin'
        })
        .then(res => res.json());        
    }

    getCategories(){
        return fetch(PRODUCTS_REST_API)
        .then(res => res.json());        
    }

    getProductsByCategoryId(){

        return fetch(categoryUrl ,{ 
            method: 'get',
                headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                },
                'credentials': 'same-origin'
        })
        .then(res => res.json());        
    }

    getProductsById(){

        return fetch(PRODUCTS_REST_API +'/' ,{ 
            method: 'get',
                headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                },
                'credentials': 'same-origin'
        })
        .then(res => res.json());        
    }
}

export default new ProductAPIService();

