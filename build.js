const sass = require('sass');

const sassOptions = {
    includePaths: [
        'node_modules',
        // the below makes things work, both sass and sass-embedded, however it wouldn't be practical to do this for a large collection of packages
       // '@somenamespace/mainSass/node_modules/'
    ],
    outputStyle: 'compressed',
    file: 'src/main.scss'
}

sass.render(sassOptions, (err, result) => {
    if (err) {
        throw new Error(err)
    } else {
        console.log("Successful build: ")
        console.log(result.css.toString())
    }
})
