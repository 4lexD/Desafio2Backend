const fs = require("fs");

class ProductManager{
    constructor(path){
        this._path = path
    }

    async getById(id){
        try{
            const products = await this.getProducts();
            const producto = products.find(element=>element.id === id)
            return producto;
        }catch(error){
            return "el archivo no  ha podido ser leido"
        }
    }

    async deleteProduct(id){
        try {
            const products = await this.getProducts();
            const newProducts = products.filter(element=>element.id !== id);
            await fs.promises.writeFile(this._path,JSON.stringify(newProducts,null,2))
            return "producto eliminado"
        } catch (error) {
            return "el elemento no puede ser eliminado"
        }
    }
    async addProducts(product){
        try{
            if(fs.existsSync(this._name)){
                const productos = await this.getProducts()
                if(productos.length>0){
                    const id = productos[productos.length-1].id+1
                    product.id = id 
                    productos.push(product)
                    await fs.promises.writeFile(this._path,JSON.stringify(productos,null,2))
                }else{
                    product.id=1
                    await fs.promises.writeFile(this._path,JSON.stringify([product],null,2))
                }
            }
            else{
                product.id=1
                await fs.promises.writeFile(this._path,JSON.stringify([product],null,2))
            }

        } catch(error){
            return "el producto no pudo ser guardado"
        }
    }

    async getProducts(){
        try{
            const content = await fs.promises.readFile(this._path, "utf-8");
            if(content.length>0){
                const Product = JSON.parse(content);
                return Product;
            } else{
               return [] 
            }
        } catch(error){
         return "el archivo no pudo ser leido"
        }
    }

    async updateProduct(id, updatedProperties) {
        try {
            const products = await this.getProducts();
            const index = products.findIndex(product => product.id === id);
            if (index === -1) {
                return "El producto no existe";
            }
            const updatedProduct = { ...products[index], ...updatedProperties };
            products.splice(index, 1, updatedProduct);
            await fs.promises.writeFile(this._path, JSON.stringify(products, null, 2));
            return "Producto actualizado correctamente";
        } catch (error) {
            return "El producto no pudo ser actualizado";
        }
    }

}

const productManager = new ProductManager('products.json');

const product1 = {
    title: "Producto",
    description: "Descripcion del Producto",
    price: 420,
    thumbnail: "producto.jpg",
    code: "Hv1Kv2PzK",
    stock: 17,
  };
  
  const product2 = {
    title: "Producto2",
    description: "Descripcion del Producto2",
    price: 8320,
    thumbnail: "producto2.jpg",
    code: "Z8uIlzc",
    stock: 19,
  };
  
  const product3 = {
    title: "Producto3",
    description: "Descripcion del Producto3",
    price: 560,
    thumbnail: "producto3.jpg",
    code: "Hov3vv2PzK",
    stock: 22,
  };

const getData = async()=>{
    
    //const addP = await productManager.addProducts(product1)
    //const showProducts = await productManager.getAll();
    //console.log("ShowProducts",showProducts);
   const productFinded = await productManager.getById(1);
    console.log("Producto: ", productFinded)

    const update = await productManager.updateProduct(1,product2)
    console.log("Producto: ", productFinded)
}
getData()
