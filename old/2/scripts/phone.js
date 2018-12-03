let phone = {
    name: 'Телефон',
    getField() {
        return document.getElementById('phone');
    },
    rules: {
        type: "number",
        typeRu: "число",
        length: 11,
    },
    getFieldValue() {
        return this.getField().value;
    },
    validate() {
        let validNumber = validators.validateForNumber(parseInt(this.getFieldValue()));
        let validLenght = validators.validateLength(this.rules.length, this.rules.length, this.getFieldValue());
        if (!validNumber || !validLenght) {
            this.showError();
            return false;
        }
        this.setValid();
        return true;
    },
    showError() {
        this.getField().classList.add('is-invalid');
        document
            .querySelector('.phoneError')
            .innerText = `Длина поля ${this.name} должна быть ${this.rules.length} и быть типом ${this.rules.typeRu}`;
    },
    setValid() {
        let field = this.getField();
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
    },

};