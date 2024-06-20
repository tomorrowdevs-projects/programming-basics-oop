const {
  generateBingoCardNumbers,
  designDashedLine,
  designBingoCardHead,
  designBingoCardRow,
  designBingoCard
} = require( './index.js' );



/** Test for generateBingoCardNumbers */



// [{"B": 5, "G": 53, "I": 21, "N": 35, "O": 74}, {"B": 14, "G": 58, "I": 30, "N": 34, "O": 68}, {"B": 10, "G": 46, "I": 25, "N": 38, "O": 66}, {"B": 9, "G": 54, "I": 23, "N": 37, "O": 71}, {"B": 1, "G": 50, "I": 24, "N": 43, "O": 69}]

test('La funzione genera un array di 5 oggetti con stringhe casuali', () => {
  const result = generateBingoCardNumbers();
  expect(result).toHaveLength(5); // Verifica che l'array abbia 5 elementi

  result.forEach(obj => {
    // expect(obj).toHaveProperty('value'); // Verifica che ogni oggetto abbia la proprietà 'value'
    expect(typeof obj.value).toBe('string'); // Verifica che il valore di 'value' sia una stringa
  });
});



/** Test for designDashedLine */
test('returns --- for 3', () => {
  expect( designDashedLine(3) ).toEqual('---');
});
test('returns --- for [3]', () => {
  expect( designDashedLine([3]) ).toEqual('---');
});
test('returns \'\' for 0', () => {
  expect( designDashedLine(0) ).toEqual('');
});
test('returns \'\' for \'abcdef\'', () => {
  expect( designDashedLine('abcdef') ).toEqual('');
});






/** Test for isBoolean */
/*
test('returns true for true', () => {
  expect( isBoolean( true ) ).toEqual( true );
});

test('returns true for false', () => {
  expect( isBoolean( false ) ).toEqual( true );
});

test('returns false for 0', () => {
  expect( isBoolean( 0 ) ).toEqual( false );
});
*/


/** Test for parseOrdinalNumber */
/*
test('returns first for 1', () => {
  expect( parseOrdinalNumber( 1 ) ).toEqual( 'first' );
});

test('returns tenth for 10', () => {
  expect( parseOrdinalNumber( 10 ) ).toEqual( 'tenth' );
});

test('returns twelfth for 12', () => {
  expect( parseOrdinalNumber( 12 ) ).toEqual( 'twelfth' );
});

test('returns false for 13', () => {
  expect( parseOrdinalNumber( 13 ) ).toEqual( '' );
});
*/

/** Test for parseOrdinalNumberNew */
/*
test('returns 1st for 1', () => {
  expect( parseOrdinalNumberNew( 1, 10 ) ).toEqual( '1st' );
});

test('returns 10th for 10', () => {
  expect( parseOrdinalNumberNew( 10, 15 ) ).toEqual( '10th' );
});

test('returns 32nd for 32', () => {
  expect( parseOrdinalNumberNew( 32, 100 ) ).toEqual( '32nd' );
});

test('returns 33rd for 33', () => {
  expect( parseOrdinalNumberNew( 33, 100 ) ).toEqual( '33rd' );
});
*/