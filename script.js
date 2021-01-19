let number = 0;
const name = "Softgraf";

let arrNames = ["Seu Barriga", "Joaquina", "Chaves", "Chiquinha"];

let arrAges = [55, 39, 20, 8, 5];

// for (let index = 0; index < arrAges.length; index++) {
//     console.log(arrAges[index]);
// }

// arrAges.forEach(item => {
//     if(item > 10) {
//         console.log(item);
//     }
// })

let indexAge = arrAges.findIndex(item => item == 20);
arrAges[indexAge] = 22;

console.log(indexAge)
console.log(arrAges)

let age = arrAges.find(item => item == 22);
console.log('age', age);

const person = {
    id: 1,
    name: "Gabriel",
    age: 23,
    gender: "M",
    habilities: ["HTML5", "CSS", "IONIC", "ANGULAR", "JS"]
}

const persons = [
    {
        id: 2,
        name: "Joaquina",
        age: 19,
        gender: "F",
        habilities: ["DJango", "Python", "PHP", "Laravel"]
    }
];

persons.push(person);

// Exibir informações
let pessoa = persons.find(pessoa => pessoa.id == 1);

//Quando se deseja editar alguma informação
let personIndex = persons.findIndex(person => person.id == 2);
if(personIndex > -1) {
    // achou a pessoa
    persons[personIndex].name = "Felipe"
} else {
    // não achou a pessoa
    alert("Pessoa não encontrada!");
}

let newPersons = persons.map(pessoa => {
    return {
        name: pessoa.name,
        age: pessoa.age*2
    }
})

console.log('pessoa', pessoa);
console.log('persons', persons);
console.log('newPersons', newPersons);