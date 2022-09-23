function render_products(data) {
    const html = data
        .map(
            (prod) => `<tr>
                    <th scope="row">${prod.id}</th>
                    <th>${prod.title}</th>
                    <th>$${prod.price}</th>
                    <th><img src="${prod.thumbnail}" width="auto" height="30"></th>
                </tr>`
        )
        .join(" ");

    document.getElementById("tbody_products").innerHTML = html;
}

function render_msg(data) {
    const html = data
        .map(
            (msg) => `<p> ${msg.email} ${msg.msg} </p>`
        )
        .join(" ");

    document.getElementById("div_msg").innerHTML = html;
}

const socket = io.connect();

function enviarProducto(event) {
    const title = document.getElementById("floatingTitle").value;
    const price = document.getElementById("floatingPrice").value;
    const thumbnail = document.getElementById("floatingImgUrl").value;
    document.getElementById("floatingTitle").value = "";
    document.getElementById("floatingPrice").value = "";
    document.getElementById("floatingImgUrl").value = "";
    socket.emit("new_product", { title, price, thumbnail });
    return false;
}

function enviarMsg(event) {
    const email = document.getElementById("floatingEmail").value;
    const msg = document.getElementById("floatingMsg").value;
    document.getElementById("floatingMsg").value = "";
    socket.emit("new_msg", { email, msg });
    return false;
}

socket.on("products", (data) => {
    render_products(data);
});

socket.on("mensajes", (data) => {
    render_msg(data);
});