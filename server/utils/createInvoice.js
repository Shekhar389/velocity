import PDFDocument from "pdfkit";
import fs from "fs";

export function createInvoice(order, path) {
    return new Promise((resolve, reject) => {
        let doc = new PDFDocument({ margin: 50 });

        generateHeader(doc);
        generateOrderInformation(doc, order);
        generateOrderItemsTable(doc, order);
        generateFooter(doc);

        let stream = fs.createWriteStream(path);
        stream.on('finish', () => resolve(doc));
        stream.on('error', reject);

        doc.pipe(stream);
        doc.end();
    });
}

function generateHeader(doc) {
    doc
        .fontSize(20)
        .text("MKart Invoice", 50, 50)
        .fontSize(10)
        .text("MKart Company", 200, 50, { align: "right" })
        .text("123 Main Street", 200, 65, { align: "right" })
        .text("New Delhi, India, 110001", 200, 80, { align: "right" })
        .moveDown();
}

function generateOrderInformation(doc, order) {
    doc
        .text(`Order ID: ${order._id}`, 50, 160)
        .text(`Order Amount: Rs ${order.totalPrice}`, 50, 180)
        .text(`Date: ${new Date(order.createdAt).toLocaleString()}`, 50, 220)
        .moveDown()
        .text(`Delivery Address: ${order.deliveryAddress}`, 50, 240)
        .moveDown();
}

function generateOrderItemsTable(doc, order) {
    let i;
    const invoiceTableTop = 280;

    generateTableHeader(doc, invoiceTableTop);
    for (i = 0; i < order.cart.length; i++) {
        const item = order.cart[i];
        const position = invoiceTableTop + (i + 1) * 30;
        generateTableRow(
            doc,
            position,
            item.productId.title,
            item.size,
            item.quantity,
            item.productId.price,
            (item.totalItemPrice * 1.12).toFixed(2)
        );
        generateHr(doc, position + 20);
    }
    doc.text(`Shipping : Rs 49`, 370, invoiceTableTop + (i + 1) * 30, { align: "right" });
    doc.text(`Total : Rs ${order.totalPrice}`, 370, invoiceTableTop + (i + 2) * 30, { align: "right" });
}

function generateTableHeader(doc, y) {
    doc
        .fontSize(10)
        .text("Product", 50, y)
        .text("Size", 150, y)
        .text("Quantity", 280, y)
        .text("Price", 370, y, { width: 90, align: "right" })
        .text("Total(+Tax)", 0, y, { align: "right" })
        .moveDown();

    generateHr(doc, y + 20);
}

function generateTableRow(doc, y, product, size, quantity, price, total) {
    doc
        .fontSize(10)
        .text(product, 50, y)
        .text(`${size}UK`, 150, y)
        .text(quantity, 280, y)
        .text(price, 370, y, { width: 90, align: "right" })
        .text(total, 0, y, { align: "right" });
}

function generateHr(doc, y) {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}

function generateFooter(doc) {
    doc
        .fontSize(10)
        .text("Thank you for your business with MKart.", 50, 660, {
            align: "center",
            width: 500
        })
}
