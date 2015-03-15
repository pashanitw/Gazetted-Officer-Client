var github = new Github({
    token:"13eaca36dc377c2f5b99c2449ae4882b80aae47e",
    auth: "oauth"
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
            if(!value.path) return;
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
                   var str="<pre>-----Topic Name--------- : "+match[0]+"\n";
                    str+=result+'</pre>';
                    var ele=$(str);
                    $("#topics").prepend(ele);
                });


            }

        });
        console.log(data);

    });

});
