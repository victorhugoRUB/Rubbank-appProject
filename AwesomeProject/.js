const pessoa1 = {
    nome: 'Luiz',
    notas: [10, 6, 8, 7]
}



console.info(pessoa1);

//const pessoa2  = {...pessoa1}
const pessoa2 = structuredClone(pessoa1);
if(pessoa1 !== pessoa2) {
    console.log('pessoa1 e pessoa2 são objetos diferentes');
} else {
    console.log('pessoa1 e pessoa2 são objetos iguais');
}
pessoa2.notas[2] = 1.5;

console.info(pessoa2);

console.info(pessoa1);


