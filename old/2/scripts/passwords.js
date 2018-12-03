let passwords = {
    namePass: 'Пароль',
    namePassRepeat: 'Повтор пароля',
    getFieldPass() {
        return document.getElementById('pass');
    },
    getFieldPassRepeat() {
        return document.getElementById('pass_repeat');
    },
    validate() {
        let pass = this.getFieldPass().value;
        let pass_repeat = this.getFieldPassRepeat().value;
        if (pass !== pass_repeat || pass === "") {
            this.showError();
            return false;
        }
        this.setValid();
        return true;
    },
    showError() {
        this.getFieldPass().classList.add('is-invalid');
        this.getFieldPassRepeat().classList.add('is-invalid');
        document
            .querySelector('.passError')
            .innerText = `Пароли должны совпадать. Поле пароль не может быть пустым.`;
    },
    setValid() {
        let fieldPass = this.getFieldPass();
        fieldPass.classList.remove('is-invalid');
        fieldPass.classList.add('is-valid');
        let fieldPassRepeat = this.getFieldPassRepeat();
        fieldPassRepeat.classList.remove('is-invalid');
        fieldPassRepeat.classList.add('is-valid');
    },
};