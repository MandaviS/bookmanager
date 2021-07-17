let books = [
    {
        ISBN: "12345ONE",
        title: "Getting Started with MERN",
        authors: [1,2,3],
        language: "en",
        pubDate: "2021-07-07",
        numOfPage: 225,
        category: ["fiction","programming","tech","web dev"],
        publication: 1,
    },
    {
        ISBN: "12345TWO",
        title: "Getting Started with Python",
        authors: [1,2],
        language: "en",
        pubDate: "2021-07-07",
        numOfPage: 225,
        category: ["fiction","tech","web dev"],
        publication: 1,
    },
];

let authors = [
    {
     id: 1,
     name: "pavan",
     books: ["12345ONE", "12345TWO"],
    },
    {
     id: 2,
     name: "Deepak",
     books: ["12345ONE"], 
    },
];

const publications = [
    {
        id: 1,
        name: "Chakra",
        books: ["12345ONE"],
    },
    {
        id: 2,
        name: "UI",
        books: [],
    },
];

module.exports = { books,authors,publications };