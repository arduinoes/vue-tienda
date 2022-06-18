import { defineStore } from "pinia";
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc  } from 'firebase/firestore';
import { db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRoute } from 'vue-router'

const router = useRoute()

export const memoria = defineStore({
  id: "principal",

  state: () => ({
    file: null,
    datoImagen: null,
    error: null,
    editar: false,
    loading: false,
    urlDescarga: '',

    productos: [],
    producto: {
    id: '',
    title: '',
    image: '',
    price: '',
    description: '',
   
  },
  }),
  actions: {
    async obtenerDatos() {
      this.productos = [];
      const querySnapshot = await getDocs(collection(db, "productos"));
      querySnapshot.forEach((doc) => {
        let producto = doc.data();
        producto.id = doc.id;
        this.productos.push(producto);
        console.log(producto);
      });
    },
    // DELETE / ELIMINAR / BORRAR
    async eliminarDato(id) {
      await deleteDoc(doc(db, "productos", id));
      router.go("/");
    },
    // GET BY ID / OBTENER POR ID
    async obtenerDatoID(id) {
      const docRef = doc(db, "productos", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.producto = docSnap.data();
        this.producto.id = docSnap.id;
      } else {
        console.log("¡No existe el documento!");
      }
    },

    // BUSCAR IMAGEN
    buscarImagen(event) {
      const tipoArchivo = event.target.files[0].type;
      if (tipoArchivo === "image/jpeg" || tipoArchivo === "image/png") {
        this.file = event.target.files[0];
        this.error = null;
      } else {
        this.error = "Archivo no válido";
        this.file = null;
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (e) => {
        this.datoImagen = e.target.result;
      };
    },
    // SUBIR IMAGEN STORAGE
    async agregarDato() {
      try {
        this.loading = true;
        const storageRef = ref(storage, "imagenes/" + this.file.name);
        const uploadTask = uploadBytesResumable(storageRef, this.file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {},
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
            });
          }
        );

        const urlDescarga = await getDownloadURL(storageRef);

        await addDoc(collection(db, "productos"), {
          title: this.producto.title,
          price: this.producto.price,
          description: this.producto.description,
          image: urlDescarga,
        });
        this.error = "Imagen subida con éxito";
        this.file = null;
      } catch (error) {
        console.log(error);
      } finally {
        const router = useRoute()
        router.push("/");
        this.loading = false;
      }
    },

    // MÉTODO actualizarDato
    async actualizarDato() {
      try {
        this.loading = true;
        const storageRef = ref(storage, "imagenes/" + this.file.name);
        const uploadTask = uploadBytesResumable(storageRef, this.file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {},
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
            });
          }
        );

        const urlDescarga = await getDownloadURL(storageRef);

        const elemento = doc(db, "productos", this.producto.id);
        await updateDoc(elemento, {
          title: this.producto.title,
          price: this.producto.price,
          description: this.producto.description,
          image: urlDescarga,
        });
        this.error = "Imagen subida con éxito";
        this.file = null;
      } catch (error) {
        console.log(error);
      } finally {
        router.push("/");
        this.loading = false;
      }
    },
  },
});
