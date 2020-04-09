var port = 3000;
app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});
app.listen(port, function (err) {
    if (err) {
        /* eslint-disable-next-line */
        console.log(err);
    }
    else {
        open('http://localhost:' + port);
    }
});
// const connectDB = async () => {
//     try {
//         await mongoose.connect(db);
//         console.log(chalk.blue("MongoDB is Connected..."));
//     } catch (err) {
//         console.error(err.message);
//         process.exit(1);
//     }
// };
