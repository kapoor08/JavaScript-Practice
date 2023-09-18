var students = [
    {name: 'John', grade: 8, gender: 'M'},
    {name: 'Sarah', grade: 12, gender: 'F'},
    {name: 'Bob', grade: 16, gender: 'M'},
    {name: 'Johnny', grade: 2, gender: 'M'},
    {name: 'Ethan', grade: 4, gender: 'M'},
    {name: 'Paula', grade: 18, gender: 'F'},
    {name: 'Donald', grade: 5, gender: 'M'},
    {name: 'Jennifer', grade: 13, gender: 'F'},
    {name: 'Courtney', grade: 15, gender: 'F'},
    {name: 'Jane', grade: 9, gender: 'F'},
    {name: 'Steve', grade: 12, gender: 'M'},
    {name: 'Serena', grade: 18, gender: 'F'}
]

// - The highest grade from the class
const gradesArray = students.map(student => student.grade)
const highest = Math.max(...gradesArray)

// The average grade of this class
const totalGrades = students.reduce((acc,curr)=>{
    return acc + curr.grade;
},0);

const totalStudents = students.reduce((acc,curr)=>{
    return acc + curr.gender.length;
},0);

const avgGrades = totalGrades / totalStudents;
console.log("Average grade of class: " + avgGrades);



// - The average grade of the boys
const boysArray = students.filter((std) =>{
    return std.gender === 'M';
});

const totalGradesOfBoys = boysArray.reduce((acc, curr)=>{
    return acc + curr.grade;
},0);

const averageGradeOfBoys = totalGradesOfBoys / boysArray.length;
console.log("Average grade of Boys of this class: " + averageGradeOfBoys.toFixed(2));



// - The average grade of the girls
const girlsArray = students.filter((std) =>{
    return std.gender === 'F';
});

const totalGradesOfGirls = girlsArray.reduce((acc, curr)=>{
    return acc + curr.grade;
},0);

const averageGradeOfGirls = totalGradesOfGirls / girlsArray.length;
console.log("Average grade of Girls of this class: " + averageGradeOfGirls.toFixed(2));



// - The highest grade from the class
const highestGrade = students.reduce((max, student)=>{
    if(student.grade > max.grade){
        return student;
    }
    else{
        return max;
    }
});
console.log(highestGrade);



// - The highest grade among the boys
const boysArr = students.filter((std) =>{
    return std.gender === 'M';
});

const highestGradeOfBoys = boysArr.reduce((max, student)=>{
    if(student.grade > max.grade){
        return student;
    }
    else{
        return max;
    }
});
console.log(highestGradeOfBoys);



// - The highest grade among the girls
const girlsArr = students.filter((std) =>{
    return std.gender === 'F';
});

const highestGradeOfGirls = girlsArr.reduce((max, student)=>{
    if(student.grade > max.grade){
        return student;
    }
    else{
        return max;
    }
});
console.log(highestGradeOfGirls);



// - The total grades of the class
const totalGradesOfClass = students.reduce((acc,curr)=>{
    return acc + curr.grade;
},0);
console.log("Total grades of class: " + totalGradesOfClass);



// - The unique grades of the class
const uniqueGrades = students.reduce((gradeGroup, student)=>{
    const marks = student.grade;
    if(gradeGroup[marks] == null){
        gradeGroup[marks] = [];
    }
    gradeGroup[marks].push(student);

    return gradeGroup;
},{});
console.log(uniqueGrades);



// - Display the array of students who are passed, if passing marks is 10.
const stdArray = students.filter((student)=>{
    if(student.grade > 10) return student;
})

console.log(stdArray);