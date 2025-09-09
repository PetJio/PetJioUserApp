// Test if Boarding component can be imported
try {
    const Boarding = require('./src/screens/Boarding/Boarding.tsx').default;
    console.log('Boarding component imported successfully:', typeof Boarding);
} catch (error) {
    console.error('Error importing Boarding:', error.message);
}

try {
    const { Boarding } = require('./src/screens/index.ts');
    console.log('Boarding from index imported successfully:', typeof Boarding);
} catch (error) {
    console.error('Error importing from index:', error.message);
}
