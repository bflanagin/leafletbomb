Template.dashBoard.helpers({
 
            userId:function() {    
                return Company.findOne().userId;
            },
            
        companyName:function() {
                       if(Company.find().count() === 0) {
                            Router.go("/marketerSetup/"+Meteor.userId());
                            console.log("setup needed");
                            }
                    return Company.findOne().companyName;
            }, 
        companyLogo:function() { 
                          var file = CompanyAssets.findOne({"companyId":Meteor.userId() , "type":"companyLogo"}).filename;
                          return Images.findOne({_id:file}).url();
   }, 
        companyLogoSmall: function() {var file = CompanyAssets.findOne({"companyId":Meteor.userId() , "type":"companyLogoSmall"}).filename;
                          return Images.findOne({_id:file}).url();
    
   }, 
        companyAddress:function() {
               
                return Company.findOne().companyAddress;
            }, 
        companyCity:function() {
                
                
                return Company.findOne().companyCity;
            }, 
        companyState:function() {
               
                
                return Company.findOne().companyState;
            }, 
        companyCountry:function() {
               
                
                return Company.findOne().companyCountry;
            }, 
        companyPhone:function() {
                
                
                return Company.findOne().companyPhone;
            }, 
        companySP:function() {
               
                
                return Company.findOne().companySP;
            }, 
        companySPImg:function() {
               
                
                return Company.findOne().companySPImg;
            }, 
         about: function() {
                
                
                return Company.findOne().about;
            },
        url:function() {
                
                return Company.findOne().url;
            }, 
        email:function() {
              
                return Company.findOne().email;
            }, 
        twitter:function() {
                
                return Company.findOne().twitter;
            }, 
        facebook:function() {
               
                return Company.findOne().facebook;
            },
        dashposts:function() {
                    var id= Meteor.users.findOne()._id;
                return Posts.find({userId: id, status:0 }, {sort:{releasedate: -1}});
            },
        distributionlists:function() {
                        
                        return DistributionLists.find();
                    },
         influencerlist:function() {
                        
                        return Influencers.find();
                    },
         presslist:function() {
                        
                        return Influencers.find();
                    },           
                                
        teamlist:function() {
                        var list = [general,tech,losers];
                        return list;
                    },
                    
                                       
            
            });
            
            
            
            
Template.dashBoard.events({

        'click #edit' : function(e) {
                    var id= Meteor.users.findOne()._id;
                Router.go('/marketerSetup/'+id+'?edit="all"')
        
        
        },

        'click #distroadd' : function(e) {
                                $("#distroaddwindow").css('visibility', 'visible');
                                $("#distroaddwindow").find('[name=listname]').val("");
                                $("#distroaddwindow").find('[name=message]').val("");
                                Influencers.find().forEach( function(stuff) { 
                                                             $("#distroaddwindow").find('[name="'+stuff.Name+'"]').prop("checked", false);
                                                               
                                                                           } );
                            
                    },
        'click #influenceradd' : function(e) {
                                $("#influenceraddwindow").css('visibility', 'visible');
                                
                    },
         'click #teamadd' : function(e) {
                                $("#teamaddwindow").css('visibility', 'visible');
                            
                    },           
                    
        'click #distrocancel' : function(e) {
                                $("#distroaddwindow").css('visibility', 'hidden');
                            
                    },
        'click #influencercancel' : function(e) {
                                $("#influenceraddwindow").css('visibility', 'hidden');
                            
                    } ,
                    
        'click #teamcancel' : function(e) {
                                $("#teamaddwindow").css('visibility', 'hidden');
                            
                    } ,
                    
                    
                    
                    'submit #influencerform': function(e) {
            e.preventDefault();
                var theId =  Meteor.users.findOne()._id;
                        var info = {
    
                                    userId:theId,
                                    Name:$(e.target).find('[name=name]').val(),
                                    companyName:$(e.target).find('[name=company]').val(),
                                    email:$(e.target).find('[name=email]').val(),
                                    url:$(e.target).find('[name=url]').val(),
                                    address:$(e.target).find('[name=address]').val(),
                                    state:$(e.target).find('[name=state]').val(),
                                    country:$(e.target).find('[name=country]').val(),
                                    notes:$(e.target).find('[name=notes]').val()
                            };
    
                        
                        
                         if(Influencers.find({"Name":$(e.target).find('[name=name]').val()}).count() == 0) {
    
                                Influencers.insert(info);
                        
                              } else {
                                    var listId = Influencers.findOne({"Name":$(e.target).find('[name=name]').val()})._id;
                                         Influencers.update({"_id": listId},{$set: info}); 
                              }
                        
                        
                        
                        
                        
                            $("#influenceraddwindow").css('visibility', 'hidden');
                    
                },
                
                        'submit #distributionform': function(e) {
            e.preventDefault();
                var theId =  Meteor.users.findOne()._id;
                            
                            var thelist = [];
                            
                                Influencers.find().forEach( function(stuff) { 
                                                                            if($(e.target).find('[name="'+stuff.Name+'"]').is(":checked")) {
                                                                                     thelist.push ($(e.target).find('[name="'+stuff.Name+'"]').val() );
                                                                                }
                                                                           } );
                                                                         
                
                        var info = {
                                    userId:theId,
                                    listname:$(e.target).find('[name=listname]').val(),
                                    message:$(e.target).find('[name=message]').val(),
                                    list:thelist
                                    
                                    
                            };
                            
                           if(DistributionLists.find({"listname":$(e.target).find('[name=listname]').val()}).count() == 0) {
    
                                DistributionLists.insert(info); 
                        
                              } else {
                                    var listId = DistributionLists.findOne({"listname":$(e.target).find('[name=listname]').val()})._id;
                                         DistributionLists.update({"_id": listId},{$set: info}); 
                              }
                        
                            $("#distroaddwindow").css('visibility', 'hidden');
    
                    
                }                 




});   


Template.distrilist.events({


'click' : function(e) {

                                var thelist = [];
                                
                                thelist = DistributionLists.findOne({"listname":this.listname}).list;
                                var num = 0;
                                while(num < thelist.length) {
                                var Name = Influencers.findOne({"_id":thelist[num]}).Name; 
                                     
                                                        $("#distroaddwindow").find('[name="'+Name+'"]').prop("checked", true);
                                                           
                                                               
                                                  num = num + 1;                       
                                                  }                       
                                $("#distroaddwindow").css('visibility', 'visible');
                                $("#distroaddwindow").find('[name=listname]').val(this.listname);
                                $("#distroaddwindow").find('[name=message]').val(this.message);
                                
                                
}




});

Template.influencer.events({


'click' : function(e) {

                                var thelist = [];
                                
                              //  thelist = DistributionLists.findOne({"listname":this.listname}).list;
                                var num = 0;
                              //  while(num < thelist.length) {
                              //  var Name = Influencers.findOne({"_id":thelist[num]}).Name; 
                                     
                               //                         $("#distroaddwindow").find('[name="'+Name+'"]').prop("checked", true);
                                                           
                                                               
                                //                  num = num + 1;                       
                                  //                }                       
                                $("#influenceraddwindow").css('visibility', 'visible');
                                $("#influenceraddwindow").find('[name=name]').val(this.Name);
                                $("#influenceraddwindow").find('[name=company]').val(this.companyName);
                                $("#influenceraddwindow").find('[name=email]').val(this.email);
                                $("#influenceraddwindow").find('[name=url]').val(this.url);
                                $("#influenceraddwindow").find('[name=address]').val(this.address);
                                $("#influenceraddwindow").find('[name=country]').val(this.country);
                                $("#influenceraddwindow").find('[name=state]').val(this.state);
                                $("#influenceraddwindow").find('[name=phone]').val(this.phone);
                                $("#influenceraddwindow").find('[name=notes]').val(this.notes);
                                
                                
}




});          
