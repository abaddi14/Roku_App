(() => {


    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const myPlaintextPassword = 's0/\/\P4$$w0rD';
    const someOtherPlaintextPassword = 'not_bacon';

    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    });
    bcrypt.compare(myPlaintextPassword, hash, function(err, res) {

    });
    bcrypt.compare(someOtherPlaintextPassword, hash, function(err, res) {
    });

})();
