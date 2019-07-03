
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

  // Listen for events eelectionInstance.ticketsCount()mitted from the contract
  listenForEvents: function() {
    App.contracts.Infraction.deployed().then(function(instance) {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      instance.registeredInfraction({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("Evento Ocorreu", event)
        // Reload when a new infraction is recorded
        //App.render();
      });
    });
  },

  render: function() {
    var electionInstance;
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


    
    // console.log("Conta: "+ App.account);
    console.log("Checkpoint 1");
    // Load contract data
    App.contracts.Infraction.deployed().then(function(instance) {
      
      electionInstance = instance;
      console.log("Aqui" + electionInstance.ticketsCount());

      return electionInstance.ticketsCount();

    }).then(function(ticketsCount) {
      //ticketsCount = electionInstance.ticketsCount();

      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();

      var candidatesSelect = $('#candidatesSelect');
      candidatesSelect.empty();
      console.log("Quantidade de Tickets: " + ticketsCount);

      for (var i = 0; i < ticketsCount; i++) {
          console.log("Iteração: "+i)
        electionInstance.tickets(i).then(function(ticket) {
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
          var candidateTemplate = "<tr><th>" + 
                                      id + "</th><td>" + vehiclePlate + "</td><td>" + infractionCategory + "</td><td>" +
                                      dateInfraction + "</td><td>" + infractionPoints + "</td><td>" + observations +"</td><td>" +
                                      valueToPay + "</td><td>" + statusOfInfraction + "</td><td>" + infractorDriverAddress + "</td><td>" +
                                      authorityResponsableAdress + "</td></tr>"
          
          candidatesResults.append(candidateTemplate);
            
        });
        
      }
      //loader.hide();
      //content.show();

     // return electionInstance.drivers(App.account);
    }).then(function() {
      // Do not allow a user to vote
      /*
      if(hasVoted) {
        $('form').hide();
      }*/
      loader.hide();
      content.show();
    }
    
    ).catch(function(error) {
      console.warn(error);
    });
  },

  castVote: function() {
    /*
    var candidateId = $('#candidatesSelect').val();
    App.contracts.Infraction.deployed().then(function(instance) {
      return instance.vote(candidateId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  */
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});