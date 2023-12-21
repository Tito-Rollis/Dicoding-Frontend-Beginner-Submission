const completeBtn = document.getElementById('completed-btn');
const judulBuku = document.getElementById('judul-buku');
const penulisBuku = document.getElementById('penulis-buku');
const tahunBuku = document.getElementById('tahun-buku');
const readedBooksContainer = document.getElementById('readed-books-container');
const unreadBooksContainer = document.getElementById('unread-books-container');

let penulisBukuInput;
let judulBukuInput;
let tahunBukuInput;

const Books = [
    // {
    //     id: Math.floor(Math.random() * 100) + 1,
    //     title: "Harry Potter and the Philosopher's Stone",
    //     author: 'J.K Rowling',
    //     year: 1997,
    //     isComplete: false,
    // },
    // {
    //     id: Math.floor(Math.random() * 100) + 1,
    //     title: 'Harry Potter and Friends',
    //     author: 'J.K Rowling',
    //     year: 1997,
    //     isComplete: true,
    // },
    // {
    //     id: Math.floor(Math.random() * 100) + 1,
    //     title: 'Harry Potter',
    //     author: 'J.K Rowling',
    //     year: 1997,
    //     isComplete: true,
    // },
];

// Methods
const getBooks = () => console.log(Books);

// Event Listeners
judulBuku.addEventListener('change', (e) => (judulBukuInput = e.target.value));
penulisBuku.addEventListener('change', (e) => (penulisBukuInput = e.target.value));
tahunBuku.addEventListener('change', (e) => (tahunBukuInput = e.target.value));

// Add event button setup
let numberId = 0;

// Retrieve existing array from localStorage
const existingArrayString = localStorage.getItem('Books');

// Parse the JSON string into an array or create a new empty array if it doesn't exist
const existingArray = existingArrayString ? JSON.parse(existingArrayString) : [];

completeBtn.addEventListener('click', () => {
    const newBook = {
        id: existingArray.length === 0 ? 0 : existingArray.length - 1,
        title: judulBukuInput,
        author: penulisBukuInput,
        year: tahunBukuInput,
        isComplete: false,
    };
    if (judulBukuInput === undefined && penulisBukuInput === undefined && tahunBukuInput === undefined) {
        return alert('Form should be filled');
    }
    existingArray.push(newBook);
    localStorage.setItem('Books', JSON.stringify(existingArray));
});

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
    newDiv.className = 'container border border-purple-400 rounded-lg p-4 mt-3 gap-y-1';
    newDiv.id = book.id;
    newDiv.innerHTML = `<h1 class="text-xl font-medium">${book.title}</h1>
    <p>Penulis: ${book.author}</p>
    <p>Tahun Buku: ${book.year}</p>

    <!-- Info -->
    <div class="flex items-center justify-between w-full">
        <!-- Chips -->
        <div
            class="container whitespace-nowrap justify-center rounded-lg text-sm h-8 px-4 w-min text-center leading-5 bg-green-400 text-green-700 font-medium"
        >
            <p>Sudah dibaca</p>
        </div>

        <div
            class=" h-8 px-4 text-center font-medium flex items-center cursor-pointer text-red-700 border border-red-700 rounded-lg"
        >
            <p>Hapus Buku</p>
        </div>`;

    readedBooksContainer.appendChild(newDiv);
});

// Insert incompletedBook to unreadedBooksContainer
getIncompletedBooks.forEach((book) => {
    const newDiv = document.createElement('div');
    newDiv.className = 'container border border-purple-400 rounded-lg p-4 mt-3 gap-y-1';
    newDiv.id = book.id;
    newDiv.innerHTML = `
    <h1 class="text-xl font-medium">${book.title}</h1>
                        <p>Penulis: ${book.author}</p>
                        <p>Tahun Buku: ${book.year}</p>

                        <!-- Info -->
                        <div class="flex items-center justify-between w-full">
                            <!-- Chips -->
                            <div
                                class="container whitespace-nowrap justify-center rounded-lg text-sm h-8 px-4 w-min text-center leading-5 bg-yellow-400 text-yellow-700 font-medium"
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

    unreadBooksContainer.appendChild(newDiv);
});
