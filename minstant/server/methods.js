Meteor.methods({
	/*form methods*/
	sendMessage: function(chatId, text){
		if(this.userId){
			var chat = Chats.findOne({
				_id:chatId
			});
			if(chat){
				var msgs = chat.messages;
				if(!msgs){
					msgs = [];
				}/*end if msgs*/
				msgs.push({
					timeStamp: new Date().toUTCString(),
					sentBy: this.userId,
					text:text
				}); // end push message

				chat.messages = msgs; //messages array to the object
				Chats.update(chat._id, chat); //update db
				return "Chat updated "+ new Date().toUTCString();
			}//endif chat
		}//endif this userId
	},

	getChat: function(otherUserId){
		var chatId;
		var filter = {
				$or: [
				{
					user1Id: this.userId,
					user2Id: otherUserId
				},
				{
					user2Id: this.UserId,
					user1Id: otherUserId
				}
				]
			}; //end filter
			var chat = Chats.findOne(filter);
			if(!chat){
				chatId = Chats.insert({
					user1Id: this.userId,
					user2Id: otherUserId
				});
			}//endif
			else{
				chatId = chat._id;
			}
			return chatId;
	}
});