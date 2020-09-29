
App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Infraction.json", function(infraction) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Infraction = TruffleContract(infraction);
      // Connect provider to interact with contract
      App.contracts.Infraction.setProvider(App.web3Provider);

      //App.render();
      App.listenForEvents();

      return App.render();
    });
  },

  // Listen for events einfractionInstance.ticketsCount()mitted from the contract
  listenForEvents: function() {
    App.contracts.Infraction.deployed().then(function(instance) {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      instance.registeredInfraction({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("Evento Ocorreu e Foi escutado", event)
        // Reload when a new infraction is recorded
        
        //App.render();
        
      });
    });
  },

  render: function() {
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Conta: " + account);
      }
    });

    // Render Ticket Information
    App.renderTicketInformations();

    // Render Driver Information
    App.renderDriverInformations();
    
    // Render Authoritie Information
    App.renderAuthoritieInformations();

    loader.hide();
    content.show();

  },

  renderTicketInformations: function(){
    var infractionInstance;

    console.log("Rendering Ticket Informations");
    App.contracts.Infraction.deployed().then(function(instance) {
      
      infractionInstance = instance;

      return infractionInstance.ticketsCount();
    }).then(function(ticketsCount) {
      console.log("Quantidade de Motoristas: " + ticketsCount)
      var ticketResults = $("#ticketResults");
      ticketResults.empty();

      console.log("Quantidade de Tickets: " + ticketsCount);

      for (var i = 0; i < ticketsCount; i++) {
          infractionInstance.tickets(i).then(function(ticket) {
          var id = ticket[0];
          var vehiclePlate = ticket[1];
          var infractionCategory = ticket[2];
          var dateInfraction = ticket[3];
          var infractionPoints = ticket[4];
          var observations = ticket[5];
          var valueToPay = ticket[6];
          var statusOfInfraction = ticket[7];
          var infractorDriverAddress = ticket[8];
          var authorityResponsableAdress = ticket[9];

          // Render candidate Result
          var ticketTemplate = "<tr><th>" + 
                                      id + "</th><td>" + vehiclePlate + "</td><td>" + infractionCategory + "</td><td>" +
                                      dateInfraction + "</td><td>" + infractionPoints + "</td><td>" + observations +"</td><td>" +
                                      valueToPay + "</td><td>" + statusOfInfraction + "</td><td>" + infractorDriverAddress + "</td><td>" +
                                      authorityResponsableAdress + "</td></tr>"
          
          ticketResults.append(ticketTemplate);
        });
        
      }

    }).then(function() {
        // Nothing to do
      }
    ).catch(function(error) {
      console.warn(error);
    });
  },

  renderDriverInformations: function(){
    var infractionInstance;

    console.log("Rendering Drivers Informations");
    App.contracts.Infraction.deployed().then(function(instance) {
      
      infractionInstance = instance;

      return infractionInstance.driversCount();
    }).then(function(driversCount) {
      console.log("Quantidade de Motoristas: " + driversCount)

      var driverResults = $("#driversResults");
      driverResults.empty();


      for (var i = 0; i < driversCount; i++) {
          infractionInstance.drivers(i).then(function(drivers) {
          var id = drivers[0];
          var name = drivers[1];
          var driverAddress = drivers[3];


          // Render candidate Result
          var driverTemplate = "<tr><th>" + id + "</th><td>" + driverAddress + "</td><td>" + name  + "</td></tr>"
          
          driverResults.append(driverTemplate);
        });
        
      }

    }).then(function() {
      // Nothing to do
      }
    ).catch(function(error) {
      console.warn(error);
    });
  },

  renderAuthoritieInformations: function(){
    var infractionInstance;

    console.log("Rendering Authorities Informations");
    App.contracts.Infraction.deployed().then(function(instance) {
      
      infractionInstance = instance;

      return infractionInstance.authoritiesCount();
    }).then(function(authoritiesCount) {
      console.log("Quantidade de Autoridades: " + authoritiesCount)

      var authoritiesResults = $("#authoritiesResults");
      authoritiesResults.empty();


      for (var i = 0; i < authoritiesCount; i++) {
          infractionInstance.authorities(i).then(function(authorities) {
          var id = authorities[0];
          var name = authorities[1];
          var sigla = authorities[2];
          var authoritieAddress = authorities[3];


          // Render candidate Result
          var authoritieTemplate = "<tr><th>" + id + "</th><td>" + authoritieAddress + "</td><td>" + name  + "</td><td>" + sigla +"</td></tr>"
          
          authoritiesResults.append(authoritieTemplate);
        });
        
      }

    }).then(function() {
      // Nothing to do
      }
    ).catch(function(error) {
      console.warn(error);
    });
  },


  registerInfractionFunction: function() {
    // TODO: Call back não está sendo recebido do smart contract
    var vehiclePlateField = $('#vehiclePlateFieldId').val();
    var infractionCategoryField = $('#infractionCategoryFieldId').val();
    var dateInfractionField = $('#dateInfractionFieldId').val();
    var infractionPointsField = $('#infractionPointsFieldId').val();
    var observationsField = $('#observationsFieldId').val();
    var valueToPayField = $('#valueToPayFieldId').val();
    var statusOfInfractionField = $('#statusOfInfractionFieldId').val();
    var infractorDriverAddressField = $('#infractorDriverAddressFieldId').val();
    var authorityResponsableAdressField = $('#authorityResponsableAdressFieldId').val(); 


    
    App.contracts.Infraction.deployed().then(function(instance) {
           result = instance.registerInfraction(vehiclePlateField, infractionCategoryField, dateInfractionField,
                                         infractionPointsField, observationsField, valueToPayField,
                                         statusOfInfractionField, infractorDriverAddressField, 
                                         authorityResponsableAdressField, { from: App.account });
        
    }).then(function(result) {
      //$("#content").hide();
      //$("#loader").show();
      console.log(result)
    }).catch(function(err) {
      console.error(err);
    });
    
  },
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});