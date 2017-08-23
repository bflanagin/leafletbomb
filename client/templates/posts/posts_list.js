Template.postsList.helpers({
   posts: function() {
                if(Posts.find().count() == 0) {
                        Router.go("/welcome");
                        } else {
                        return Posts.find();
                        }
            } 
            });
           
            
