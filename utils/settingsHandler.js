
const fs = require('fs')

const loadSettings = (filePathSettings) => {
    try {
        const dataBuffer = fs.readFileSync(filePathSettings)
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return [];
    }
}

const saveSettings = (settings, filePathSettings) => {
    const dataJSON = JSON.stringify(settings)
    fs.writeFileSync(filePathSettings, dataJSON)
}

module.exports = {
    loadSettings: loadSettings,
    saveSettings: saveSettings
}