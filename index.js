const completeBtn = document.getElementById('completed-btn');
const judulBuku = document.getElementById('judul-buku');
const penulisBuku = document.getElementById('penulis-buku');
const tahunBuku = document.getElementById('tahun-buku');
const readedBooksContainer = document.getElementById('readed-books-container');
const unreadBooksContainer = document.getElementById('unread-books-container');
const statusBuku = document.getElementById('read-checked');
const searchBook = document.getElementById('search-book');
const unreadBooksTemplate = document.querySelector('[unread-books-template]');

let penulisBukuInput = '';
let judulBukuInput = '';
let tahunBukuInput = '';
let statusBukuInput = '';
let searchBukuInput = '';

// Retrieve existing array from localStorage
const getLocalStorage = localStorage.getItem('Books');

// Parse the JSON string into an array or create a new empty array if it doesn't exist
let existingArray = getLocalStorage ? JSON.parse(getLocalStorage) : [];

// Functions
const getUnreadBooks = () => {
    const getIncompletedBooks =
        existingArray.length === 0 ? [] : existingArray.filter((book) => book.isComplete === false);

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

        title.textContent = book.title;
        author.textContent = book.author;
        tahunBuku.textContent = `Tahun Buku: ${book.year}`;

        bookContainer.setAttribute('id', `${book.id}`);

        deleteBtn.addEventListener('click', () =>
            deleteHandler(getIncompletedBooks.findIndex((el) => el.id === book.id))
        );

        return unreadBooksContainer.append(bookContainer);
    });
};

const getReadBooks = () => {
    let newDiv = '<h1 class="text-2xl font-semibold">Selesai Dibaca</h1>';
    const getCompletedBooks =
        existingArray.length === 0 ? [] : existingArray.filter((book) => book.isComplete === true);

    getCompletedBooks.forEach((book) => {
        newDiv += `
        <div id="${book.id}" class="box book border border-purple-400 rounded-lg p-4 mt-3 gap-y-1">
        <h1 class="text-xl font-medium">${book.title}</h1>
        <p>Penulis: ${book.author}</p>
        <p>Tahun Buku: ${book.year}</p>
    
        <!-- Info -->
        <div class="flex items-center justify-between w-full">
            <!-- Chips -->
            <div
                class="box whiunreadBooksTemplatepace-nowrap justify-center rounded-lg text-sm h-8 px-4 w-max text-center leading-5 bg-green-400 text-green-700 font-medium"
            >
                <p>Sudah dibaca</p>
            </div>
    
            <div onclick="deleteHandler(${getCompletedBooks.findIndex((e) => e.id === book.id)})"
                class=" h-8 px-4 text-center font-medium flex items-center cursor-pointer text-red-700 border border-red-700 rounded-lg"
            >
                <p>Hapus Buku</p>
            </div>
            
            </div></div>`;
    });

    return (readedBooksContainer.innerHTML = newDiv);
};

const getAllBooks = () => {
    getReadBooks();

    getUnreadBooks();
};

// Event Listeners
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
};

const searchBookHandler = (e) => {
    const searchBukuInput = existingArray.filter((book) =>
        book.title.toLowerCase().includes(e.target.value.toLowerCase())
    );

    // If no search then reset to begin
    if (e.target.value.length === 0) {
        existingArray = JSON.parse(getLocalStorage);
    } else {
        existingArray = searchBukuInput;
    }
    getAllBooks();
};

judulBuku.addEventListener('input', (e) => (judulBukuInput = e.target.value));
penulisBuku.addEventListener('input', (e) => (penulisBukuInput = e.target.value));
tahunBuku.addEventListener('input', (e) => (tahunBukuInput = e.target.value));
statusBuku.addEventListener('input', (e) => {
    statusBukuInput = e.target;
    console.log(statusBukuInput);
});
completeBtn.addEventListener('click', (e) => {
    console.log(statusBukuInput);
    // Set id manually for each new book
    const id = existingArray.length === 0 ? 0 : existingArray[existingArray.length - 1].id + 1;

    const newBook = {
        id,
        title: judulBukuInput,
        author: penulisBukuInput,
        year: tahunBukuInput,
        isComplete: statusBukuInput === 'sudah' ? true : false,
    };

    existingArray.push(newBook);
    localStorage.setItem('Books', JSON.stringify(existingArray));
    return getAllBooks();
});
searchBook.addEventListener('input', (e) => searchBookHandler(e));
