import ghpages from 'gh-pages';

ghpages.publish('build', {dotfiles: true}, function(err) {console.log(err)});
