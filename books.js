const mongoose = require('mongoose');

main().then(() => {
    console.log("connection successfull");
})
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 20,
    },
    author: {
        type: String,
    },
    price: {
        type: Number,
        min: [100, 'Price is too low for Amazon'],
    },
    discount: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        enum: ["fiction", "non-fiction"],
    },
    genre: [String]
});

const Book = mongoose.model("Book", bookSchema);

// let book1 = new Book({
//     title: "Marvel Comics v2",
//     author: "Stan Lee",
//     price: 200,
//     category: "fiction",
//     genre: ["comics", "superhero", "fiction"]
// });

// book1
//     .save()
//     .then((res) => {
//         console.log(res)
//     }).catch((err) => {
//         console.log(err)
//     })

Book.findByIdAndUpdate('6808d666f6cb39a1a3881511', { price: -30 }, { runValidators: true })
    .then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err.errors.price.properties.message)
    })