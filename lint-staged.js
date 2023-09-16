module.exports = {
    '*.{js,jsx,ts,tsx}': [
        'eslint',
        'jest --bail --watchAll=false --passWithNoTests --findRelatedTests',
        () => 'tsc-files --noEmit',
    ],
    '*.{js,jsx,ts,tsx,json,css,js}': ['prettier --write'],
}
