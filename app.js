const express = require("express");
const bodyParser = require("body-parser");
const QRCode = require("qrcode");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.render('home', {});
});

app.post("/", function (req, res) {
    const link = req.body.QRCode;
    if (!link) {
        res.send("<h1>Please enter the URL</h1>");
    } else {
        QRCode.toDataURL(link, function (err, source) {
            var path = "images/" + Date.now() + ".png";
            QRCode.toFile(path, link, {
                color: {
                    dark: '#000',
                    light: '#0000'
                }
            });
            res.render('code', { QR_code: source, src: path, nameofURL: link });
        });
    }
});
app.get('/download', function (req, res) {
    res.download(req.query.path);
})


app.listen(3000, function () {
    console.log('Server started on port 3000');
});
