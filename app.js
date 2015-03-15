var github = new Github({
    username: "pashanitw",
    password: "preetipasha786",
    auth: "basic"
});
var firstLevelRegex=/data\/([^\/]*)$/;
var secondLevelRegex=/data\/([^\/]*)\/([^\/]*)$/;
var thirdLevelRegex=/data\/([^\/]*)\/([^\/]*)\/([^\/]*\.json)$/;
var repo = github.getRepo("pashanitw", "Gazetted-Officer-Data");
var data={}
repo.show(function(err, details) {

    //console.log(repo);
    repo.getTree('master?recursive=true', function(err, tree) {
        console.log(tree);
        tree.forEach(function(value,index){
           var match;
            match=value.path.match(firstLevelRegex);
            if(match){
                data[match[1]]=data[match[1]]||{};
            }
            match=value.path.match(secondLevelRegex);
            if(match){
                data[match[1]][match[2]]=data[match[1]][match[2]]||{};
            }
            match=value.path.match(thirdLevelRegex);
            if(match){
                repo.read('master', match[0], function(err, result) {
                    data[match[1]][match[2]][match[3]]=JSON.parse(result);
                });

            }

        });
        console.log(data);
        repo.read('master', tree[13].path, function(err, data) {
            console.log(JSON.parse(data));
        });
    });

});
