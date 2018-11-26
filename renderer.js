let renderer = {
    map: "",
    render() {
        for (let row = 0; row < config.rowCount; row++) {
            for (let col = 0; col < config.colsCount; col++) {
                if (player.y === row && player.x === col) {
                    this.map += "0 ";
                } else {
                    this.map += "x ";
                }
            }
            this.map += "\n";
        }

        console.log(this.map);
    },

    clear() {
        console.clear();
        this.map = "";
    }
};