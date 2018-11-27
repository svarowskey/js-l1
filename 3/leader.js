let leader = {
    askQuestion(question) {
        let variations = "";
        for (key in question.variants) {
            variations += `${key}: ${question.variants[key]}\n`;
        }
        let answer = prompt(`${question.text}, варианты ответа:\n${variations}`);
        if (answer === question.correctAnswerIndex) {
            return true;
        }
        return false;
    }
};