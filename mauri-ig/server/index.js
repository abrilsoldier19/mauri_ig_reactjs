const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const multer = require("multer"); // Importa multer
const path = require("path");

const app = express();
const RegistrarModel = require("./models/Registrar");
const Schema = mongoose.Schema;



// middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.static(path.join(__dirname, 'public/Images')));

const productoSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  precio: Number,
  imagen: String // Agrega un campo para la ruta de la imagen en el esquema
});

const ProductoModel = mongoose.model("productos", productoSchema);

// Configura multer para manejar la carga de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Images') // Directorio donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname)) 
  }
});

const upload = multer({ storage: storage });

// Endpoint para crear un producto con imagen
app.post('/crear-producto', upload.single('imagen'), (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  let imagen = req.file.path.replace(/\\/g, '/'); // Replace backslashes with forward slashes

  ProductoModel.findOne({ descripcion: descripcion })
    .then(producto => {
      if (producto) {
        res.status(400).json({ message: "El producto ya está creado" });
      } else {
        ProductoModel.create({ nombre, descripcion, precio, imagen })
          .then(result => {
            res.status(201).json({ message: "Producto agregado exitosamente" });
          })
          .catch(err => {
            res.status(500).json({ message: "Error al agregar producto", error: err.message });
          });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error al buscar producto", error: err.message });
    });
});
// Endpoint para buscar productos por nombre
app.get('/buscar-producto', async (req, res) => {
  const { nombre } = req.query; // Obtén el término de búsqueda del query string
  try {
    // Utiliza una expresión regular para buscar coincidencias parciales del nombre
    const productos = await ProductoModel.find({ nombre: { $regex: nombre, $options: 'i' } });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar productos", error: error.message });
  }
});


//conexion a base datos
mongoose  
  .connect('mongodb+srv://mauri_ig:3tSgWpRAXkqQ6OPu@mydatabase.h9ekiao.mongodb.net/?retryWrites=true&w=majority');

  app.post('/sign-up', (req, res) => {
    const { nombre, correo, password } = req.body;
    RegistrarModel.findOne({ correo: correo })
      .then(usuario => {
        if (usuario) {
          res.status(400).json({ message: "El usuario ya está registrado" });
        } else {
          RegistrarModel.create({ nombre: nombre, correo: correo, password: password })
            .then(result => {
              res.status(201).json({ message: "Usuario registrado exitosamente" });
            })
            .catch(err => {
              res.status(500).json({ message: "Error al registrar al usuario", error: err.message });
            });
        }
      })
      .catch(err => {
        res.status(500).json({ message: "Error al buscar usuario", error: err.message });
      });
  });

  app.post('/login', (req, res) => {
    const { correo, password } = req.body;
    RegistrarModel.findOne({ correo: correo })
    .then(usuario => {
      if (usuario) {
        if (usuario.password === password) {
          res.json({ message: "Ingresado exitosamente", userName: usuario.nombre });
        } else {
          res.json("La contraseña es incorrecta");
        }
      } else {
        res.json("No existe usuario");
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error al buscar usuario", error: err.message });
    });
});

app.get('/home', async (req, res) => { 
  const items = await RegistrarModel.find(); 
  res.json(items); 
}); 

app.get('/productos', async (req, res) => { 
  const items = await ProductoModel.find(); 
  res.json(items); 
}); 
app.get("/",cors(),(req,res)=>{

})
  
  const port = 8000;
  app.listen(port, () => console.log(`Server is running on port ${port}`));

