const Books = [
    {
        id: new Date(),
        title: "Harry Potter and the Philosopher's Stone",
        author: 'J.K Rowling',
        year: 1997,
        isComplete: false,
    },
    {
        id: new Date(),
        title: 'Harry Potter and Friends',
        author: 'J.K Rowling',
        year: 1997,
        isComplete: true,
    },
    {
        id: new Date(),
        title: 'Harry Potter',
        author: 'J.K Rowling',
        year: 1997,
        isComplete: true,
    },
];

const getCompletedBook = Books.filter((book) => book.isComplete === true);
const getIncompletedBook = Books.filter((book) => book.isComplete === false);
