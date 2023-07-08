// Función para obtener los productos del almacenamiento local
function obtenerProductos() {
  var productosString = localStorage.getItem('productos');
  if (productosString) {
    return JSON.parse(productosString);
  } else {
    return [];
  }
}

// Función para guardar los productos en el almacenamiento local
function guardarProductos(productos) {
  var productosJSON = JSON.stringify(productos);
  localStorage.setItem('productos', productosJSON);
}

// Función para mostrar los productos en la página
function mostrarProductos() {
      var productos = obtenerProductos();
      var listaProductos = $('#lista-productos');
      listaProductos.empty();

      var productGrid = $('<div class="product-grid"></div>');

      for (var i = 0; i < productos.length; i++) {
        var producto = productos[i];
        var productCard = $('<div class="product-card"></div>');

        var img = $('<img src="' + producto.imagen + '">');
        var id = $('<span>ID: ' + producto.id + '</span>');
        var descripcion = $('<span>Descripción: ' + producto.descripcion + '</span>');
        var precio = $('<span>Precio: ' + producto.precio + '</span>');

        productCard.append(img, id, descripcion, precio);
        productGrid.append(productCard);
      }

      listaProductos.append(productGrid);
    }

// Función para agregar un nuevo producto
function agregarProducto() {
  var nuevoProducto = {
    id: $('#id').val(),
    descripcion: $('#descripcion').val(),
    precio: $('#precio').val(),
    imagen: URL.createObjectURL($('#imagen')[0].files[0]) // Obtener la URL de la imagen seleccionada
  };

  var productos = obtenerProductos();
  productos.push(nuevoProducto);
  guardarProductos(productos);

  mostrarProductos();
}

// Función para editar un producto existente
function editarProducto(id) {
  var productos = obtenerProductos();

  for (var i = 0; i < productos.length; i++) {
    if (productos[i].id === id) {
      var productoEditado = productos[i];
      var nuevaDescripcion = prompt('Ingrese la nueva descripción:', productoEditado.descripcion);
      var nuevoPrecio = parseFloat(prompt('Ingrese el nuevo precio:', productoEditado.precio));
      var nuevaImagen = URL.createObjectURL($('#imagen')[0].files[0]); // Obtener la URL de la nueva imagen seleccionada

      productoEditado.descripcion = nuevaDescripcion;
      productoEditado.precio = nuevoPrecio;
      productoEditado.imagen = nuevaImagen;

      guardarProductos(productos);
      mostrarProductos();
      break;
    }
  }
}

// Función para borrar un producto existente
function borrarProducto(id) {
  var productos = obtenerProductos();

  for (var i = 0; i < productos.length; i++) {
    if (productos[i].id === id) {
      productos.splice(i, 1);
      break;
    }
  }

  guardarProductos(productos);
  mostrarProductos();
}

// Esperar a que se cargue completamente el DOM
$(document).ready(function() {
  mostrarProductos();
});
