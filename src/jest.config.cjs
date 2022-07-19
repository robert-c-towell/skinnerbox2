module.exports = {
    collectCoverage: true,
    verbose: true,
    testEnvironment: 'jest-environment-node',
    transform: {
        "^.+\\.jsx?$": "babel-jest"
    },
}