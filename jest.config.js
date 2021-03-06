module.exports = {
  "moduleDirectories": [
    "node_modules", ".", "<rootDir>"
  ],
  "roots": [
    "<rootDir>"
  ],
  "modulePaths": [
    "<rootDir>"
  ],
  "moduleFileExtensions": [
    "js",
    "jsx"
  ],
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/tests/__mocks__/fileMock.js",
    "\\.(css|less|scss)$": "<rootDir>/tests/__mocks__/styleMock.js"
  },
  "setupFilesAfterEnv": [
    "<rootDir>/enzyme.config.js"
  ]
};
