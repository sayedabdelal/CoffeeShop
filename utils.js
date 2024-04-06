const getProductFromLocalStorage = ()=> {
    const storedProduct = localStorage.getItem("products");
    if (storedProduct) {
        return JSON.parse(storedProduct);
    } else {
        return [];
    }

}