module.exports = {
    '*.{js,jsx,ts,tsx}': [
        'eslint',
        'jest --bail --watchAll=false --passWithNoTests --findRelatedTests',
    ],
    '*.{js,jsx,ts,tsx,json,css,js,scss}': ['prettier --write'],
};
