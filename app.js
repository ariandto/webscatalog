const express = require('express');
const app = express();
const port = 8000;

const mysql = require('mysql');
app.use(express.static('public'));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'catalog_app',
});
app.get('/', (req, res) => {
    connection.query(
        'SELECT * FROM barang',
        (error, results) => {
            res.render('beranda.ejs', { items: results});
        }
    )
})

app.get('/detail/:id', (req, res) => {
    connection.query(
        'SELECT * FROM barang WHERE id = ?',
        [req.params.id],
        (error,results) => {
            res.render('detail.ejs', {item: results[0] })
        }
    )
})
app.get('/Contact', (req, res) => {
    res.render('kontak.ejs');
})

//test koneksi ke beranda dan lain lain
// app.get('/',(req, res) =>{
//     res.render('beranda.ejs')
// })
// connection.connect((error) => {
//     if (error) throw error;
//     console.log('connected')
// })
app.listen(port, () => {
    console.log('Apps run on port '+port)
})