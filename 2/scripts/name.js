let name = {
    name: 'Имя',
    getField() {
        return document.getElementById('name');
    },
    rules: {
        min: 1,
        max: 50,
    },
    getFieldValue() {
        return this.getField().value;
    },
    validate() {
        let valid = validators.validateLength(this.rules.min, this.rules.max, this.getFieldValue());
        if (!valid) {
            this.showError();
            return false;
        }
        this.setValid();
        return true;
    },
    showError() {
        this.getField().classList.add('is-invalid');
        document
            .querySelector('.nameError')
            .innerText = `Длина поля ${this.name} должна быть больше ${this.rules.min} и меньше ${this.rules.max}`;
    },
    setValid() {
        let field = this.getField();
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
    },

};