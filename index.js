const completeBtn = document.getElementById('completed-btn');
const judulBuku = document.getElementById('judul-buku-input');
const penulisBuku = document.getElementById('penulis-buku-input');
const tahunBuku = document.getElementById('tahun-buku-input');
const readedBooksContainer = document.getElementById('readed-books-container');
const unreadBooksContainer = document.getElementById('unread-books-container');
const inputFormContainer = document.querySelector('[input-form-container]');
const statusBuku = document.getElementById('read-checked');
const searchBook = document.getElementById('search-book');
const unreadBooksTemplate = document.querySelector('[unread-books-template]');
const readBooksTemplate = document.querySelector('[read-books-template]');

let penulisBukuInput = '';
let judulBukuInput = '';
let tahunBukuInput = '';
let statusBukuInput = '';
let searchBukuInput = '';

// Retrieve existing array from localStorage
const getLocalStorage = localStorage.getItem('Books');
const getRakSudahDibaca = localStorage.getItem('rak-sudah-dibaca');
const getRakBelumDibaca = localStorage.getItem('rak-belum-dibaca');

// Parse the JSON string into an array or create a new empty array if it doesn't exist

let existingArray = getLocalStorage ? JSON.parse(getLocalStorage) : [];
let rakSudahDibaca = getRakSudahDibaca ? JSON.parse(getRakSudahDibaca) : [];
let rakBelumDibaca = getRakBelumDibaca ? JSON.parse(getRakBelumDibaca) : [];

// Functions
const getUnreadBooks = () => {
    const getIncompletedBooks =
        rakBelumDibaca.length === 0 ? [] : rakBelumDibaca.filter((book) => book.isComplete === false);

    // RECATCH the unread Books if getIncompleteBooks have 1 or more books
    if (getIncompletedBooks.length >= 1) {
        unreadBooksContainer.textContent = '';
    }

    // Adding all unread books to unreadBooksContainer as Child Element
    getIncompletedBooks.forEach((book) => {
        const bookContainer = unreadBooksTemplate.content.cloneNode(true).children[0];
        let title = bookContainer.querySelector('[unread-title]');
        let author = bookContainer.querySelector('[unread-author]');
        let tahunBuku = bookContainer.querySelector('[unread-tahun]');
        let deleteBtn = bookContainer.querySelector('[unread-delete-btn]');
        let sudahBacaBtn = bookContainer.querySelector('[sudah-baca-handler]');

        title.textContent = book.title;
        author.textContent = book.author;
        tahunBuku.textContent = `Tahun Buku: ${book.year}`;
        bookContainer.style.display = book.title.toLowerCase().includes(searchBukuInput) ? 'block' : 'none';

        bookContainer.setAttribute('id', `${book.id}`);
        console.log(book);
        deleteBtn.addEventListener('click', () => deleteHandler(rakBelumDibaca.findIndex((el) => el.id === book.id)));
        sudahBacaBtn.addEventListener('click', () => sudahBacaHandler(book));

        return unreadBooksContainer.append(bookContainer);
    });
};

const getReadBooks = () => {
    const getCompletedBooks =
        rakSudahDibaca.length === 0 ? [] : rakSudahDibaca.filter((book) => book.isComplete === true);

    // RECATCH the unread Books if getIncompleteBooks have 1 or more books
    if (getCompletedBooks.length >= 1) {
        readedBooksContainer.textContent = '';
    }

    getCompletedBooks.forEach((book) => {
        const bookContainer = readBooksTemplate.content.cloneNode(true).children[0];
        let title = bookContainer.querySelector('[read-title]');
        let author = bookContainer.querySelector('[read-author]');
        let tahunBuku = bookContainer.querySelector('[read-tahun]');
        let deleteBtn = bookContainer.querySelector('[read-delete-btn]');

        title.textContent = book.title;
        author.textContent = book.author;
        tahunBuku.textContent = `Tahun Buku: ${book.year}`;
        bookContainer.style.display = book.title.toLowerCase().includes(searchBukuInput) ? 'block' : 'none';

        bookContainer.setAttribute('id', `${book.id}`);

        deleteBtn.addEventListener('click', () => deleteHandler(rakSudahDibaca.findIndex((el) => el.id === book.id)));

        return readedBooksContainer.append(bookContainer);
    });
};
const getAllBooks = () => {
    getReadBooks();

    getUnreadBooks();
};

// Event Handlers
const deleteHandler = (id) => {
    existingArray.splice(id, 1);
    localStorage.setItem('Books', JSON.stringify(existingArray));
    getAllBooks();
};

const formChangeHandler = () => {
    if (judulBukuInput !== '' && penulisBukuInput !== '' && tahunBukuInput !== '') {
        completeBtn.style.pointerEvents = 'auto';
        completeBtn.classList.remove('bg-gray-400');
        completeBtn.classList.add('bg-purple-700');
    } else {
        completeBtn.style.pointerEvents = 'none';
        completeBtn.classList.remove('bg-purple-700');
        completeBtn.classList.add('bg-gray-400');
    }

    // Check if book were existed
    // existingArray.map((book) => {
    //     if (book.title.toLowerCase() === judulBukuInput.toLowerCase()) {
    //         alert(`Buku dengan judul "${judulBukuInput}" sudah ada!`);
    //     }
    // });
};

const searchBookHandler = (e) => {
    searchBukuInput = e.target.value.toLowerCase();
    getAllBooks();
};

const sudahBacaHandler = (item) => {
    for (existing of existingArray) {
        if (existing.title === item.title) {
            existing.isComplete = true;
        }
    }
    localStorage.setItem('Books', JSON.stringify(existingArray));
    return getAllBooks();

    // existingArray.map((book) => {
    //     ({ ...book, author: 'tes' });
    //     return book;
    //     // if (book.title === 'belom 2') {
    //     //     return { ...book, author: 'tes' };

    //     //     // localStorage.setItem('Books', JSON.stringify(existingArray));
    //     //     // return getAllBooks();
    //     // }
    // });
};
const belumBacaHandler = () => {};

// Event Listener
inputFormContainer.addEventListener('input', () => formChangeHandler());
judulBuku.addEventListener('input', (e) => (judulBukuInput = e.target.value));
penulisBuku.addEventListener('input', (e) => (penulisBukuInput = e.target.value));
tahunBuku.addEventListener('input', (e) => (tahunBukuInput = e.target.value));
statusBuku.addEventListener('input', () => (statusBukuInput = statusBuku.checked));
completeBtn.addEventListener('click', () => {
    // If the book not read yet then push it to rakBelumBaca
    if (statusBukuInput === '' || statusBukuInput === false) {
        const newBook = {
            id: rakBelumDibaca.length === 0 ? 0 : rakBelumDibaca[rakBelumDibaca.length - 1].id + 1,
            title: judulBukuInput,
            author: penulisBukuInput,
            year: tahunBukuInput,
            isComplete: statusBukuInput === '' || statusBukuInput === false ? false : true,
        };
        rakBelumDibaca.push(newBook);
        localStorage.setItem('rak-belum-dibaca', JSON.stringify(rakBelumDibaca));
    }
    // If the book was read then push it to rakSudahBaca
    else {
        const newBook = {
            id: rakSudahDibaca.length === 0 ? 0 : rakSudahDibaca[rakSudahDibaca.length - 1].id + 1,
            title: judulBukuInput,
            author: penulisBukuInput,
            year: tahunBukuInput,
            isComplete: statusBukuInput === '' || statusBukuInput === false ? false : true,
        };
        rakSudahDibaca.push(newBook);
        localStorage.setItem('rak-sudah-dibaca', JSON.stringify(rakSudahDibaca));
    }

    // existingArray.push(newBook);
    // localStorage.setItem('Books', JSON.stringify(existingArray));
    return getAllBooks();
});

searchBook.addEventListener('input', (e) => searchBookHandler(e));
