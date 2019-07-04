var Infraction = artifacts.require("./Infraction.sol");

contract("Infraction", function(accounts) {
  var infractionInstance;

  it("Initializes with 4 drivers", function() {
    return Infraction.deployed().then(function(instance) {
      return instance.driversCount();
    }).then(function(count) {
      assert.equal(count, 4);
    });
  });

  it("Initializes with 2 authorities", function() {
    return Infraction.deployed().then(function(instance) {
      return instance.authoritiesCount();
    }).then(function(count) {
      assert.equal(count, 2);
    });
  });

  it("Initializes with 3 tickets", function() {
    return Infraction.deployed().then(function(instance) {
      return instance.ticketsCount();
    }).then(function(count) {
      assert.equal(count, 3);
    });
  });

  it("It initializes the drivers with the correct values", function() {
    return Infraction.deployed().then(function(instance) {
      infractionInstance = instance;
      return infractionInstance.drivers(0);
    }).then(function(driver) {
      assert.equal(driver[1], "João", "Contains the correct Name.");
      assert.equal(driver[2], 0, "Contains the correct number of points.");
      assert.equal(driver[3], 0xf6A3D407E0013b400Eb355F70B99ac71644583F1, "Contains the correct driver address");
      return infractionInstance.drivers(1);
    }).then(function(driver) {
      assert.equal(driver[1], "Paulo", "Contains the correct Name.");
      assert.equal(driver[2], 0, "Contains the correct number of points.");
      assert.equal(driver[3], 0x21AeE1a9597Bc9e8E1EF14C4fD6D3fE55A9027b4, "Contains the correct driver address");
      return infractionInstance.drivers(2);
    }).then(function(driver) {
        assert.equal(driver[1], "Nunes", "Contains the correct Name.");
        assert.equal(driver[2], 0, "Contains the correct number of points.");
        assert.equal(driver[3], 0xBbD25469b0f2F569511C195a73408D7DcceB9eDb, "Contains the correct driver address");
        return infractionInstance.drivers(3);
    }).then(function(driver) {
        assert.equal(driver[1], "Soares", "Contains the correct Name.");
        assert.equal(driver[2], 0, "Contains the correct number of points.");
        assert.equal(driver[3], 0x3c5B21D203802D2600cA0AcBffd7B24075C0Ff79, "Contains the correct driver address");
     });
  });

  it("It initializes the authorities with the correct values", function() {
    return Infraction.deployed().then(function(instance) {
      infractionInstance = instance;
      return infractionInstance.authorities(0);
    }).then(function(authoritie) {
      assert.equal(authoritie[1], "Departamento Nacional de Trânsito", "Contains the correct Name.");
      assert.equal(authoritie[2], "DNIT", "Contains the correct 'SIGLA'.");
      assert.equal(authoritie[3], 0x4Ec72B1Bd5b4f6c6aECF9630a0e6F0479c0b2477, "Contains the correct authoritie address");
      return infractionInstance.authorities(1);
    }).then(function(authoritie) {
        assert.equal(authoritie[1], "Departamento Estadual de Trânsito do Distrito Federal", "Contains the correct Name.");
        assert.equal(authoritie[2], "DETRAN-DF", "Contains the correct number of points.");
        assert.equal(authoritie[3], 0x7Fe8C20672FA2147d0db1fAa8C49fBEbA00f0c23, "Contains the correct authoritie address");
     });
  });

  it("It initializes the tickets with the correct values", function() {
    return Infraction.deployed().then(function(instance) {
      infractionInstance = instance;
      return infractionInstance.tickets(0);
    }).then(function(ticket) {
      assert.equal(ticket[1], "ABC-1234", "Contains the correct vehicle plate.");
      assert.equal(ticket[2], 1, "Contains the correct category.");
      assert.equal(ticket[3], "01/01/2019", "Contains the correct date.");
      assert.equal(ticket[4], 5, "Contains the correct number of points.");
      assert.equal(ticket[5], "Estava a 110 na via de 80", "Contains the correct observation.");
      assert.equal(ticket[6], 1, "Contains the correct value to pay.");
      assert.equal(ticket[7], 0, "Contains the correct status.");
      assert.equal(ticket[8], 0xf6A3D407E0013b400Eb355F70B99ac71644583F1, "Contains the correct infractor driver address.");
      return infractionInstance.tickets(1);
    }).then(function(ticket) {
        assert.equal(ticket[1], "DEF-5678", "Contains the correct vehicle plate.");
        assert.equal(ticket[2], 2, "Contains the correct category.");
        assert.equal(ticket[3], "02/01/2019", "Contains the correct date.");
        assert.equal(ticket[4], 3, "Contains the correct number of points.");
        assert.equal(ticket[5], "Estava a 90 na via de 50", "Contains the correct observation.");
        assert.equal(ticket[6], 2, "Contains the correct value to pay.");
        assert.equal(ticket[7], 1, "Contains the correct status.");
        assert.equal(ticket[8], 0x21AeE1a9597Bc9e8E1EF14C4fD6D3fE55A9027b4, "Contains the correct infractor driver address.");
        return infractionInstance.tickets(2);
    }).then(function(ticket) {
        assert.equal(ticket[1], "GHI-9910", "Contains the correct vehicle plate.");
        assert.equal(ticket[2], 2, "Contains the correct category.");
        assert.equal(ticket[3], "03/01/2019", "Contains the correct date.");
        assert.equal(ticket[4], 3, "Contains the correct number of points.");
        assert.equal(ticket[5], "Estava a 90 na via de 50", "Contains the correct observation.");
        assert.equal(ticket[6], 2, "Contains the correct value to pay.");
        assert.equal(ticket[7], 1, "Contains the correct status.");
        assert.equal(ticket[8], 0xBbD25469b0f2F569511C195a73408D7DcceB9eDb, "Contains the correct infractor driver address.");
    });
  });




});
