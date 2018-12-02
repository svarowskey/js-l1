let form = document.forms[0];
form.addEventListener('submit', function (event) {
    if (!name.validate() || !phone.validate() || !passwords.validate()) {
        event.preventDefault();
    }
});