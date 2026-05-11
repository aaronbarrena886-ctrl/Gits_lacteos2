let listaProductos = [];
listaProductos.push(new Producto (222, "Queso Gauda 500g", "Quesos", "Nacional", 1800));
listaProductos.push(new Producto (111, "Leche entera 1L", "Leches", "Nacional", 10000));
listaProductos.push(new Producto (333, "Yogurt griego", "Yogurts", "Importado", 1500));

const consultarProducto =() => {
    let c = document.getElementById("txtcod").value;
    if(c.trim().length === 0){
        alert("Digite un codigo");
    }
    else{
        let sw = 0;
        for(let i=0; i<listaProductos.length; i++){
            let p = listaProductos[i];
            if(Number(c) === p.codigo){
                sw = 1
                document.getElementById("txtnom").value = p.nombre;
                document.getElementById("cbocat").value = p.categoria;

                if(p.origen === "Nacional"){
                    document.getElementById("opori1").checked = true;
                }
                else if(p.origen === "Importado"){
                    document.getElementById("opori2").checked = true;
                }
                document.getElementById("txtpre").value = p.precio;
                break;
            }
        }

        let msg = "";
        if(sw === 0){
            msg = ` <div class="mt-3 alert alert-success alert-dismissible fade show" role="alert">
            <strong>Producto (${c}) No encontrado!</strong> Puede Registrar!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;

            document.getElementById("txtnom").value = "";
            document.getElementById("cbocat").value = "";
            document.getElementById("opori1").checked = true;
            document.getElementById("txtpre").value = "";
        }else if(sw === 1){
            msg = `
            <div class="mt-3 alert alert-success alert-dismissible fade show" role="alert">
            <strong>Producto (${c}) Encontrado!</strong> Puede modificar o eliminar.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
        }

        document.getElementById("mensajes").innerHTML = msg;
    }
};

const registrarProducto = () => {
    let c = document.getElementById("txtcod").value;
    let n = document.getElementById("txtnom").value;
    let cat = document.getElementById("cbocat").value;
    let pre = document.getElementById("txtpre").value;
    let ori = "";

    if(document.getElementById("opori1").checked){
        ori = "Nacional";
    }
    else{
        ori = "Importado";
    }

    if(c.trim().length === 0 || n.trim().length === 0 || cat === "" || pre.trim().length === 0){
        alert("todos los campos son obligatorios!!");
    }
    else if(n.trim().length < 3 || n.trim().length > 40){
        alert("El nombre debe tener entre 3 y 40 caracteres");
    }
    else{
        let sw = 0;
        for(let i=0; i<listaProductos.length; i++){
            if(Number(c) === listaProductos[i].codigo){
                sw = 1;
                break;
            }
        }

        let msg = "";
        if(sw === 1){
            msg = `<div class="mt-3 alert alert-danger alert-dismissible fade show" role="alert">
            <strong>error</strong> El Codigo (${c}) ya existe!.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;
        }else{
            listaProductos.push(new Producto(Number(c), n, cat, ori, Number(pre)));
            
            msg = `
            <div class="mt-3 alert alert-success alert-dismissible fade show" role="alert">
            <strong>exito</strong> producto (${c}) registrado correctamente!.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;

            document.getElementById("txtcod").value = "";
            document.getElementById("txtnom").value = "";
            document.getElementById("cbocat").value = "";
            document.getElementById("opori1").checked = true;
            document.getElementById("txtpre").value = "";
        }

        document.getElementById("mensajes").innerHTML = msg;
    }
};

const modificarProducto = () => {
    let c = document.getElementById("txtcod").value;
    let n = document.getElementById("txtnom").value;
    let cat = document.getElementById("cbocat").value;
    let pre = document.getElementById("txtpre").value;
    let ori = "";

    if(document.getElementById("opori1").checked){
        ori = "Nacional";
    }
    else{
        ori = "Importado";
    }

    if(c.trim().length === 0 || n.trim().length === 0 || cat === "" || pre.trim().length === 0){
        alert("Todos Los Campos Son Obligatorios!!");
    }
    else if(n.trim().length < 3 || n.trim().length > 40){
        alert("El nmbre debe tener entre 3 y 40 caracteres!!");
    }
    else{
        let sw = 0;
        for(let i=0; i<listaProductos.length; i++){
            if(Number(c) === listaProductos[i].codigo){
                sw = 1;
                listaProductos[i].nombre = n;
                listaProductos[i].categoria = cat;
                listaProductos[i].origen = ori;
                listaProductos[i].precio = Number(pre);
                break;
            }
        }

        let msg = "";
        if(sw === 0){
            msg = `
            <div class="mt-3 alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Producto (${c}) no encontrado</strong> imposible modificar!.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;
        }
        else if(sw === 1){
            msg = `
            <div class="mt-3 alert alert-success alert-dismissible fade show" role="alert">
            <strong>Accion ejecutada!</strong> Producto (${c}) modificado correctamente!.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;
            // Limpiar
            document.getElementById("txtcod").value = "";
            document.getElementById("txtnom").value = "";
            document.getElementById("cbocat").value = "";
            document.getElementById("opori1").checked = true;
            document.getElementById("txtpre").value = "";
        }
        document.getElementById("mensajes").innerHTML = msg;
    }
};

const eliminarProducto = () => {
    let c = document.getElementById("txtcod").value;
    
    if(c.trim().length === 0){
        alert("Digite codigo para eliminar!!");
    }
    else{
        let sw = 0;
        for(let i=0; i<listaProductos.length; i++){
            if(Number(c) === listaProductos[i].codigo){
                if(confirm("seguro que desea eliminar el producto?")){
                    listaProductos.splice(i, 1);
                    sw = 1;
                }else{
                    sw = 2;
                }
                break;
            }
        }

        let msg = "";
        if(sw === 0){
            msg = `
            <div class="mt-3 alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Producto (${c}) no encontrado!</strong> imposible eliminar!.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;
            document.getElementById("txtcod").value = "";
            document.getElementById("txtnom").value = "";
            document.getElementById("cbocat").value = "";
            document.getElementById("opori1").checked = true;
            document.getElementById("txtpre").value = "";

        }
        else if(sw === 1){
            msg = `
            <div class="mt-3 alert alert-success alert-dismissible fade show" role="alert">
            <strong>Accion ejecutada!</strong> Producto (${c}) eliminado correctamente!.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            `;
            document.getElementById("txtcod").value = "";
            document.getElementById("txtnom").value = "";
            document.getElementById("cbocat").value = "";
            document.getElementById("opori1").checked = true;
            document.getElementById("txtpre").value = "";

        }
        else if(sw === 2){
            msg = "";
        }

        document.getElementById("mensajes").innerHTML = msg;
    }
};

const listarProductos = () => {
    let filas = "";
    let suma = 0;
    let cant = 0;

    for(let i=0; i<listaProductos.length; i++){
        let p = listaProductos[i];
        filas += `
            <tr>
            <td>${p.codigo}</td>
            <td>${p.nombre}</td>
            <td>${p.categoria}</td>
            <td>${p.origen}</td>
            <td>$${p.precio}</td>
            </tr>`;
        suma += p.precio;
        cant++;
    }

    document.getElementById("datos").innerHTML = filas;

    let prom = 0;
    if(cant > 0) prom = suma / cant;

    document.getElementById("estadisticas").innerHTML = `
        <strong>Cantidad total:</strong> ${cant} | 
        <strong>Suma de drecios:</strong> $${suma} | 
        <strong>Promedio de precios:</strong> $${Math.round(prom)}`;
};

const filtrarSeleccion = () =>{
    let catSel = document.getElementById("cbocat").value;
    let filas = "";

    for(let i=0; i<listaProductos.length; i++){
        let p = listaProductos[i];
        if(p.categoria === catSel || catSel === ""){
            filas += `<tr><td>${p.codigo}</td><td>${p.nombre}</td><td>${p.categoria}</td><td>${p.origen}</td><td>$${p.precio}</td></tr>`;
        }
    }
    document.getElementById("datos").innerHTML = filas;
};

const filtrarOpcion = () =>{
    let oriSel = "";
    if(document.getElementById("opori1").checked){
        oriSel = "Nacional";
    }
    else{
        oriSel = "Importado";

    }

    let filas = "";
    for(let i=0; i<listaProductos.length; i++){
        let p = listaProductos[i];
        if(p.origen === oriSel){
            filas += `<tr><td>${p.codigo}</td><td>${p.nombre}</td><td>${p.categoria}</td><td>${p.origen}</td><td>$${p.precio}</td></tr>`;
        }
    }
    document.getElementById("datos").innerHTML = filas;
};