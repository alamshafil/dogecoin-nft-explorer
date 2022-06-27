var ghpages = require('gh-pages');

ghpages.publish(
    'dist', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/alamshafil/dogecoin-nft-explorer.git', // Update to point to your repository  
        user: {
            name: 'Shafil Alam', // update to use your name
            email: 'alamshafil@pm.me' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)

