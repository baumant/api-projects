function timestamp() {
    this.getDate = function(req, res) {
        var input = new Date(req.params.input);
        var date = {
            unix: null,
            natural: null
        }

        if (input == 'Invalid Date') {
            input = new Date(parseInt(req.params.input));
        }

        if (input == 'Invalid Date') {
            res.json(date);
        }
        else {

            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var month = months[input.getMonth()];
            date.natural = month + ' ' + input.getDate() + ', ' + input.getFullYear();

            date.unix = input.getTime();
            res.json(date);
        }
    }
}

module.exports = new timestamp();