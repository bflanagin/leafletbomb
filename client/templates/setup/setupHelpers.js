Template.marketerSetup.helpers ({

  userId: function() {return Meteor.users.findOne()._id;},
  companyLogo:function() { 
                          var file = CompanyAssets.findOne({"companyId":Meteor.userId(), "type":"companyLogo"}).filename;
                          return Images.findOne({_id:file}).url();
   },
  companyLogoSmall:function(){
                            var file = CompanyAssets.findOne({"companyId":Meteor.userId() , "type":"companyLogoSmall"}).filename;
                          return Images.findOne({_id:file}).url();
    
   },
   companySPImg:function(){
                            var file = CompanyAssets.findOne({"companyId":Meteor.userId() , "type":"companySPImg"}).filename;
                          return Images.findOne({_id:file}).url();
   }

    
});

Template.influencerSetup.helpers ({

    userId: function() {return Meteor.users.findOne()._id;},
    
    companyLogo:function() { 
                          var file = CompanyAssets.findOne({"companyId":Meteor.userId() , "type":"companyLogo"}).filename;
                          return Images.findOne({_id:file}).url();
   },
  companyLogoSmall:function(){
                            var file = CompanyAssets.findOne({"companyId":Meteor.userId() , "type":"companyLogoSmall"}).filename;
                          return Images.findOne({_id:file}).url();
    
   },
   companySPImg:function(){
                            var file = CompanyAssets.findOne({"companyId":Meteor.userId() , "type":"companySPImg"}).filename;
                          return Images.findOne({_id:file}).url();
   }

});

Template.marketerSetup.events ({


'submit form': function(e) {
            e.preventDefault();
                var theId =  Meteor.users.findOne()._id;
    var info = {
    
        userId:theId,
        companyName:$(e.target).find('[name=companyName]').val(),
        companyLogo:CompanyAssets.findOne({"companyId":Meteor.userId()} && {"type":"companyLogo"}).filename,
        companyLogoSmall:CompanyAssets.findOne({"companyId":Meteor.userId()} && {"type":"companyLogoSmall"}).filename,
        companyAddress:$(e.target).find('[name=companyAddress]').val(),
        companyCity:$(e.target).find('[name=companyCity]').val(),
        companyState:$(e.target).find('[name=companyState]').val(),
        companyCountry:$(e.target).find('[name=companyCountry]').val(),
        companyPhone:$(e.target).find('[name=companyPhone]').val(),
        companySP:$(e.target).find('[name=companySP]').val(),
        companySPImg:CompanyAssets.findOne({"companyId":Meteor.userId()} && {"type":"companySPImg"}).filename,
        about:$(e.target).find('[name=about]').val(),
        url:$(e.target).find('[name=url]').val(),
        email:$(e.target).find('[name=email]').val(),
        twitter:$(e.target).find('[name=twitter]').val(),
        facebook:$(e.target).find('[name=facebook]').val(),
        category:$(e.target).find('[name=category]').val(),
        keywords:$(e.target).find('[name=keywords]').val(),
        othersites:$(e.target).find('[name=othersites]').val(),
        accountType:"marketer"
    };
    
    Company.insert(info);
    
    Router.go("/dashboard/"+theId);
    

},

'change .LogoInput': function(event, template) {
    var files = event.target.files;
    
    var theId = Meteor.userId();
    
   
     
    for (var i = 0, ln = files.length; i < ln; i++) {
      Images.insert(files[i], function (err, fileObj) {
        if (err) {
        
        } else {
            var info = {
                    companyId:theId,
                    type:"companyLogo",
                   filename:fileObj._id
            };
            CompanyAssets.insert(info);
          }
        
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      }); 
    }
  },
'change .LogoSmallInput': function(event, template) {
    var files = event.target.files;
    
    var theId = Meteor.userId();
    
    
     
    for (var i = 0, ln = files.length; i < ln; i++) {
      Images.insert(files[i], function (err, fileObj) {
        if (err) {
        
        } else {
            var info = {
                    companyId:theId,
                    type:"companyLogoSmall",
                   filename:fileObj._id
            };
            CompanyAssets.insert(info);
          }
        
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      }); 
    }
  },     
      
      
      
 'change .SPImgInput': function(event, template) {
    var files = event.target.files;
    
    var theId = Meteor.userId();
    
    var docs = Posts.find({userId:theId}).count();
     
    for (var i = 0, ln = files.length; i < ln; i++) {
      Images.insert(files[i], function (err, fileObj) {
        if (err) {
        
        } else {
            var info = {
                    companyId:theId,
                    type:"companySPImg",
                   filename:fileObj._id
            };
            CompanyAssets.insert(info);
          }
        
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      }); 
      }
  } 
      

});

Template.influencerSetup.events ({


'submit form': function(e) {
            e.preventDefault();
                var theId =  Meteor.users.findOne()._id;
    var info = {
    
        userId:theId,
        companyName:$(e.target).find('[name=companyName]').val(),
        companyLogo:CompanyAssets.findOne({"companyId":Meteor.userId()} && {"type":"companyLogo"}).filename,
        companyLogoSmall:CompanyAssets.findOne({"companyId":Meteor.userId()} && {"type":"companyLogoSmall"}).filename,
        companyAddress:$(e.target).find('[name=companyAddress]').val(),
        companyCity:$(e.target).find('[name=companyCity]').val(),
        companyState:$(e.target).find('[name=companyState]').val(),
        companyCountry:$(e.target).find('[name=companyCountry]').val(),
        companyPhone:$(e.target).find('[name=companyPhone]').val(),
        companySP:$(e.target).find('[name=companySP]').val(),
        companySPImg:CompanyAssets.findOne({"companyId":Meteor.userId()} && {"type":"companySPImg"}).filename,
        about:$(e.target).find('[name=about]').val(),
        url:$(e.target).find('[name=url]').val(),
        email:$(e.target).find('[name=email]').val(),
        twitter:$(e.target).find('[name=twitter]').val(),
        facebook:$(e.target).find('[name=facebook]').val(),
        category:$(e.target).find('[name=category]').val(),
        keywords:$(e.target).find('[name=keywords]').val(),
        othersites:$(e.target).find('[name=othersites]').val(),
        accountType:"influencer"
    };
    
    Company.insert(info);
    
    Router.go("/influence/"+theId);
},

'change .LogoInput': function(event, template) {
    var files = event.target.files;
    
    var theId = Meteor.userId();
    
   
     
    for (var i = 0, ln = files.length; i < ln; i++) {
      Images.insert(files[i], function (err, fileObj) {
        if (err) {
        
        } else {
            var info = {
                    companyId:theId,
                    type:"companyLogo",
                   filename:fileObj._id
            };
            CompanyAssets.insert(info);
          }
        
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      }); 
    }
  },
'change .LogoSmallInput': function(event, template) {
    var files = event.target.files;
    
    var theId = Meteor.userId();
    
    
     
    for (var i = 0, ln = files.length; i < ln; i++) {
      Images.insert(files[i], function (err, fileObj) {
        if (err) {
        
        } else {
            var info = {
                    companyId:theId,
                    type:"companyLogoSmall",
                   filename:fileObj._id
            };
            CompanyAssets.insert(info);
          }
        
        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      }); 
    }
  }



});
