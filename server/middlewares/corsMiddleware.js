exports.useCORS = (req, res, next) => {

    //res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Origin", 'http://localhost:5173');
    res.setHeader("Access-Control-Allow-Credentials", true);

    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Enctype, X-Authorization');

    next();
}