	//Subscriptions
	Meteor.subscribe("chats", function(){
		return Chats.find().fetch();
	});
	Meteor.subscribe("userData", function(){
		return Meteor.users.find().fetch();
	});
  ///
  // helper functions 
  /// 
  Template.available_user_list.helpers({
    users:function(){
      return Meteor.users.find();
    }
  }); /*remains equal*/

 Template.available_user.helpers({
    getUserName: function(userId){
     var user = Meteor.users.findOne({_id:userId});
      return user.profile.username;
    }, 
    isMyUser: function(userId){
      if (userId == Meteor.userId()){
        return true;
      }
      else {
        return false;
      }
    }
  }); /*remains equal*/


  Template.chat_page.helpers({
    messages:function(){
      var chat = Chats.findOne(
      	{
      		_id:Session.get("chatId")
      	}
      	);
      return chat.messages;
    }, 
    other_userName:function(){
    	var otherUser;
    	var chat = Chats.findOne({
    		_id: Session.get("chatId")
    	});
    	if(chat.user1Id != Meteor.userId()){
    		otherUser = chat.user1Id;
    	}
    	else{
    		otherUser = chat.user2Id;
    	}
    	return Meteor.users.findOne({
    		_id:otherUser
    	}).profile.username;
    }, 
     other_userAvatar:function(){
    	var otherUser;
    	var chat = Chats.findOne({
    		_id: Session.get("chatId")
    	});
    	if(chat.user1Id != Meteor.userId()){
    		otherUser = chat.user1Id;
    	}
    	else{
    		otherUser = chat.user2Id;
    	}
    	return Meteor.users.findOne({
    		_id:otherUser
    	}).profile.avatar;
    }
  });

  Template.chat_message.helpers({
  	getUserById: function (sentBy) {
  		return Meteor.users.findOne(
  			{
  				_id: sentBy
  			}).profile.username;
  	},
  	messageBackgroundClass: function(sentBy){
  		if(sentBy == Meteor.userId()){
  			return "bg-success";
  		}else{
  			return "bg-info";
  		}
  	}
  });

 Template.chat_page.events({
  // this event fires when the user sends a message on the chat page
  'submit .js-send-chat':function(event){
    // stop the form from triggering a page reload
    event.preventDefault();
    // see if we can find a chat object in the database
    // to which we'll add the message
  	//Callback
  	Meteor.call('sendMessage', Session.get("chatId"), 
  		event.target.chat.value);
  	event.target.chat.value = ""; //for reset form
  }//end
 });