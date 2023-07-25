const { OrderModel } = require("../database/models/order.model");
const { sendEmail } = require("../helpers/sendEmail");
const { addOrderSchema } = require("../schemas/add-order.schema");
const { createHttpException } = require("../services");


const orderCreate = async (req, res, next) => {

    const { name, phone, email, comment, communicateBy } = req.body;

    const { error, value } = addOrderSchema.validate({ email, phone, name, comment, communicateBy });
    if (error) {
        const invalidField = error.details[0].path[0];
        throw createHttpException(
            400,
            `Missing or not valid field ${invalidField} => ${error.message}`
        );
    }

    const newOrder = await OrderModel.create({
        name,
        phone,
        email,
        comment,
        communicateBy
    });

    const html = `
    <p style="font-family: Courier New">
      Customer info:
      <br />
      <br />
      Name: ${newOrder.name}
      <br />
      Phone: ${newOrder.phone}
      <br />
      Email: <a href="mailto:${newOrder.email}">${newOrder.email}</a>
      <br />
      Communicate by: ${newOrder.communicateBy}
      <br />
      Comment: ${newOrder.comment}
      <br />
      <br />
    </p>
  `;

    const data = {
        to: email,
        subject: "Order received",
        html,
    };

    sendEmail(data);
    res.status(201).json(newOrder);
};

module.exports = {
    orderCreate,
};


