const completeBtn = document.getElementById('completed-btn');
const judulBuku = document.getElementById('judul-buku');
const penulisBuku = document.getElementById('penulis-buku');
const tahunBuku = document.getElementById('tahun-buku');
const readedBooksContainer = document.getElementById('readed-books-container');
const unreadBooksContainer = document.getElementById('unread-books-container');
const statusBuku = document.getElementById('read-checked');

let penulisBukuInput = '';
let judulBukuInput = '';
let tahunBukuInput = '';
let statusBukuInput = '';

// Retrieve existing array from localStorage
const getLocalStorage = localStorage.getItem('Books');

// Parse the JSON string into an array or create a new empty array if it doesn't exist
const existingArray = getLocalStorage ? JSON.parse(getLocalStorage) : [];

// Functions

const getUnreadBooks = () => {
    let newDiv = '<h1 class="text-2xl font-semibold">Belum Selesai Dibaca</h1> ';
    const getIncompletedBooks =
        existingArray.length === 0 ? [] : existingArray.filter((book) => book.isComplete === false);

    getIncompletedBooks.forEach((book) => {
        newDiv += `
        <div id="${book.id}" class="box border border-purple-400 rounded-lg p-4 mt-3 gap-y-1">
    <h1 class="text-xl font-medium">${book.title}</h1>
                        <p>Penulis: ${book.author}</p>
                        <p>Tahun Buku: ${book.year}</p>

                        <!-- Info -->
                        <div class="flex items-center justify-between w-full">
                            <!-- Chips -->
                            <div
                                class="box whitespace-nowrap justify-center rounded-lg text-sm h-8 px-4 w-min text-center leading-5 bg-yellow-400 text-yellow-700 font-medium"
                            >
                                <p>Belum dibaca</p>
                            </div>

                            <div onclick="deleteHandler(${getIncompletedBooks.findIndex((e) => e.id === book.id)})"
                                class=" h-8 px-4 text-center font-medium flex items-center cursor-pointer text-red-700 border border-red-700 rounded-lg"
                            >
                                <p>Hapus Buku</p>
                            </div>
                        </div>
                        </div>
    `;
    });
    return (unreadBooksContainer.innerHTML = newDiv);
};

const getReadBooks = () => {
    let newDiv = '<h1 class="text-2xl font-semibold">Selesai Dibaca</h1>';
    const getCompletedBooks =
        existingArray.length === 0 ? [] : existingArray.filter((book) => book.isComplete === true);

    getCompletedBooks.forEach((book) => {
        newDiv += `
        <div id="${book.id}" class="box border border-purple-400 rounded-lg p-4 mt-3 gap-y-1">
        <h1 class="text-xl font-medium">${book.title}</h1>
        <p>Penulis: ${book.author}</p>
        <p>Tahun Buku: ${book.year}</p>
    
        <!-- Info -->
        <div class="flex items-center justify-between w-full">
            <!-- Chips -->
            <div
                class="box whitespace-nowrap justify-center rounded-lg text-sm h-8 px-4 w-min text-center leading-5 bg-green-400 text-green-700 font-medium"
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

judulBuku.addEventListener('input', (e) => (judulBukuInput = e.target.value));
penulisBuku.addEventListener('input', (e) => (penulisBukuInput = e.target.value));
tahunBuku.addEventListener('input', (e) => (tahunBukuInput = e.target.value));
statusBuku.addEventListener('input', (e) => (statusBukuInput = e.target.value));
completeBtn.addEventListener('click', (e) => {

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
