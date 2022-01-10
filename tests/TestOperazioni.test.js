// indico il file js contenente le funzioni da testare
const operazioni = require('./TestOperazioni');

// indico 
describe('Test di calcolo', () => {
    
    test('1 + 2 dovrebbe ritornare 3', () => { expect(operazioni.addizione(1, 2)).toBe(3); });
    test('5 - 2 dovrebbe ritornare 3', () => { expect(operazioni.sottrazione(5, 2)).toBe(3); });
    test('4 x 3 dovrebbe ritornare 12', () => { expect(operazioni.moltiplicazione(4,3)).toBe(12)});
    test('5^3 dovrebbe ritornare 125', () => {expect(operazioni.potenza(5,3)).toBe(125)});   
    test('14/7 non dovrebbe avere resto', () => {expect(operazioni.haResto(14,7)).toBeFalsy()});
    test('14/8 dovrebbe avere resto', () => {expect(operazioni.haResto(14,8)).toBeTruthy()});

})

// 10/1/22 ore 17:30 laptop12
