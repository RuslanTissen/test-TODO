function requestlogger(req, res, next) {
	console.log("R" + req.method + " " + req.url)
	next()
}

export default requestlogger