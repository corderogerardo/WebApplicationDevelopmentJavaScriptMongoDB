 // set up the main template the the router will use to build pages
  Router.configure({
    layoutTemplate: 'ApplicationLayout'
  });
  // specify the top level route, the page users see when they arrive at the site
  Router.route('/', function () {
    console.log("rendering root /");
    this.render("navbar", {to:"header"});
    this.render("lobby_page", {to:"main"});  
  });

  // specify a route that allows the current user to chat to another users
  Router.route('/chat/:_id', function () {
   var route = this;

   route.render("navbar", {
   	to: "header"
   });

   Session.set('chatId',"");

   Meteor.call('getChat', this.params._id, function (err,res){
   		if(err){
   			console.log("Error with getchat "+err);
   		}
   		else{
   			Session.set("chatId", res);
   			route.render("chat_page",{
   				to:"main"
   			});
   		}
   });//end callback

  });