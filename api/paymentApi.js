const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

class PaymentApi {
    constructor() {
    }

    processPayment(orderId, userId, price) {
        let paymentRequestBody = {
            order_id: Number(orderId),
            user_id: Number(userId),
            status: "paid",
            amount: Number(price),
        };

        return new Promise((resolve, reject) => {
            chai.request('http://test.qa.rs/api')
                .post('/payment')
                .send(paymentRequestBody)
                .end((err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        res.should.have.status(200);
                        res.body.should.have.eql('Payment processed');
                        resolve(res);
                    }
                });
        });
    }
}

module.exports = PaymentApi;
