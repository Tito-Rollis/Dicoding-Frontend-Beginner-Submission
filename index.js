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
const existingArrayString = localStorage.getItem('Books');

// Parse the JSON string into an array or create a new empty array if it doesn't exist
const existingArray = existingArrayString ? JSON.parse(existingArrayString) : [];

// Functions
const isEmpty = () => {
    console.log('change');
};

const getAllBooks = () => {
    isEmpty();
    const getCompletedBooks =
        existingArray.length === 0
            ? []
            : JSON.parse(localStorage.getItem('Books')).filter((book) => book.isComplete === true);

    const getIncompletedBooks =
        existingArray.length === 0
            ? []
            : JSON.parse(localStorage.getItem('Books')).filter((book) => book.isComplete === false);

    // Insert completedBook to readedBooksContainer
    getCompletedBooks.forEach((book) => {
        const newDiv = document.createElement('div');
        newDiv.className = 'box border border-purple-400 rounded-lg p-4 mt-3 gap-y-1';
        newDiv.id = book.id;
        newDiv.innerHTML = `<h1 class="text-xl font-medium">${book.title}</h1>
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

        <div
            class=" h-8 px-4 text-center font-medium flex items-center cursor-pointer text-red-700 border border-red-700 rounded-lg"
        >
            <p>Hapus Buku</p>
        </div>`;

        if (existingArray.length === 0) {
            return;
        } else {
            return readedBooksContainer.appendChild(newDiv);
        }
    });

    // Insert incompletedBook to unreadedBooksContainer
    getIncompletedBooks.forEach((book) => {
        const newDiv = document.createElement('div');
        newDiv.className = 'box border border-purple-400 rounded-lg p-4 mt-3 gap-y-1';
        newDiv.id = book.id;
        newDiv.innerHTML = `
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

                            <div
                                class=" h-8 px-4 text-center font-medium flex items-center cursor-pointer text-red-700 border border-red-700 rounded-lg"
                            >
                                <p>Hapus Buku</p>
                            </div>
                        </div>
    `;

        if (existingArray.length === 0) {
            return;
        } else {
            return unreadBooksContainer.appendChild(newDiv);
        }
    });
};

// Event Listeners
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
    e.preventDefault();
    console.log(
        (judulBukuInput === undefined || judulBukuInput === '') &&
            (penulisBukuInput === undefined || penulisBukuInput === '') &&
            (tahunBukuInput === undefined || tahunBukuInput === '')
    );
    if (
        (judulBukuInput === undefined || judulBukuInput === '') &&
        (penulisBukuInput === undefined || penulisBukuInput === '') &&
        (tahunBukuInput === undefined || tahunBukuInput === '')
    ) {
        alert('Form should be filled');
        return;
    }
    const newBook = {
        id: existingArray.length === 0 ? 0 : existingArray.length - 1,
        title: judulBukuInput,
        author: penulisBukuInput,
        year: tahunBukuInput,
        isComplete: statusBukuInput === 'sudah' ? true : false,
    };

    existingArray.push(newBook);
    localStorage.setItem('Books', JSON.stringify(existingArray));
    return getAllBooks();
    // Reset input values for the next click
    // judulBukuInput = undefined;
    // penulisBukuInput = undefined;
    // tahunBukuInput = undefined;
});
