import { defineStore } from 'pinia';
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
  }
interface ProductState {
  items: Record<string, Product>;
  ids: string[];
  productos: [];
  total: number;
}

export const useProductStore = defineStore({
  id: 'products',

  state: (): ProductState => ({
    items: {},
    ids: [],
    productos: [],
    total: 0
  }),
  getters: {
    list(): Product[] {
      return this.ids.map((i) => this.items[i]);
    },
    loaded(): boolean {
      return this.ids.length > 0;
    },
  },
  actions: {
    async obtenerDatos() {
      const first = query(collection(db, "productos"), orderBy("title"));
      this.productos = [];
      const querySnapshot = await getDocs(first);
      querySnapshot.forEach((doc) => {
        
        let producto = doc.data();
        producto.id = doc.id;
        this.total = this.productos.push(producto);
        console.log(this.total)
      });
      console.log("Este es el array productos", this.productos)
      const data: Product[] = this.productos;
      this.ids = data.map((product) => {
      this.items[product.id] = product ;
      return product.id;
      });
      console.log("Este es el array ids", this.ids)
      console.log("Este es el objeto items", this.items)
    },
  },
});
