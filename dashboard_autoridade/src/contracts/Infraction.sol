// SPDX-License-Identifier: MIT
 
pragma solidity ^0.7.0;

contract InfractionTcc{

    // Public Variables for easy access
    uint public ticketsCount;
    uint public driversCount;
    uint public authoritiesCount;
    uint public transferTicketsCount;
    uint public cancelTicketsRequestCount;

    struct TraficTicket{
        uint id;
        string vehiclePlate;
        uint infractionCategory; // 1-Leve 2-Média 3-Grave 4-Gravíssima
        string dateInfraction;
        uint infractionPoints;
        string observations;
        uint valueToPay; // Value in ethers
        string statusOfInfraction; // Active, Payed, Canceled, Transfered
        bool payed;
        address infractorDriverAddress;
        address payable authorityResponsableAdress; // Authoritie that registered the infraction(and will receive the payement of the debt)
    }

    struct Drivers{
        uint id;
        string name;
        uint numberOfPoints;
        address driverAddress;
        bool exist;
    }

    // Model Authoritie
    struct Authorities{
        uint id;
        string name;
        string sigla;
        address authoritieAddress;
        bool exist;
        bool isTransitBoard;
    }
    
    struct TransferTicket{
        uint id;
        uint ticketId;
        uint status; // 0 -> Pending, 1 -> Accepted, 2 -> Rejected
        address currentOwnerAddress;
        address requestedInfractorAddress;
    }
    
    struct CancelTickeRequest{
        uint id;
        uint ticketId;
        uint status; // 0 -> Pending, 1 -> Accepted, 2 -> Rejected
        string explanation;
        address driverAddress;
        address authorityResponsableAdress;
        address transitBoardResponsible;
    }
    
    address TransitBoardResponsible = 0x16B746E98118020E4a23d23F00db97c757ea19Ca;

    // Map Tickets
    mapping(uint => TraficTicket) public tickets;
    mapping(uint => Drivers) public drivers;
    mapping(address => Drivers) driversListAddress; // Just to get driver Id easily 
    mapping(uint => Authorities) public authorities; // 
    mapping(address => Authorities) authoritiesListAddress; // Just to get authoritie  easily 
    mapping(uint => TransferTicket) public tranferTicketsRequests;
    mapping(uint => CancelTickeRequest) public cancelTicketsRequests;

    // Events
    event registeredInfraction (address indexed authoritieAddress, address indexed driverAddress, string message);
    event registeredDriverEvent (address authoritieAddress);
    event registeredAuthoritieEvent (address authoritieAddress);
    event TicketPayedEvent (uint ticketId, address accountThatPayed, string message);
    event TransferTicketEvent(string message);
    event CancelTicketEvent(string message);
    
    //  Adding Some initial informations to the Smart Contract
    constructor(){
        registerAuthoritie("Joao Paulo","JPNS", 0x2af609914ac3996113e52E133d78329A3c90c3CB, false);
        registerAuthoritie("Junta de Transito","JunTran", 0x16B746E98118020E4a23d23F00db97c757ea19Ca,true );
        registerDriver("Jaqueline", 0, 0xd4f64F2c38c5712F0082787E17BaB4192Bc7373F);
        registerDriver("Irineu", 0, 0x89044E6D53B2Ff837f0FA9584e112139E9E35861);
        registerDriver("Luciene", 0,0xedbCDDb7DE91A24783Ba2FFf5420f73F7A7e439F);
        registerDriver("Mariana", 0, 0x50A1Fc5774B42132B2101Eb7B3b7eeBA9df8eA83);
    }

    //  ============================================================== REGISTER FUNCTIONS ==============================================================

    function registerAuthoritie(string memory _name,string memory _sigla, address _authoritieAddress, bool _isTransitBoard) public{
        authorities[authoritiesCount] = Authorities(authoritiesCount, _name, _sigla, _authoritieAddress, true, _isTransitBoard);
        authoritiesListAddress[_authoritieAddress] = Authorities(authoritiesCount, _name, _sigla, _authoritieAddress, true, _isTransitBoard);
        authoritiesCount++;
        emit registeredAuthoritieEvent(msg.sender);
    }

    function registerDriver(string memory _name,uint numberOfPoints, address _driverAddress) public{
        drivers[driversCount] = Drivers(driversCount, _name, numberOfPoints, _driverAddress, true);
        driversListAddress[_driverAddress] =  Drivers(driversCount, _name, numberOfPoints, _driverAddress, true);
        driversCount++;
        emit registeredDriverEvent(msg.sender);
    }

    function registerInfraction(string memory _vehiclePlate, uint _infractionCategory, string memory _dateInfraction, uint _infractionPoints, string memory _observations, uint _valueToPay, string memory _statusOfInfraction, address _infractorDriverAddress)public{
        // Require that the account registering the infraction is a authoritie
        require(authoritiesListAddress[msg.sender].exist == true);
        uint infractorDriverId = driversListAddress[_infractorDriverAddress].id;
        
        Drivers memory _driver = drivers[infractorDriverId];
        tickets[ticketsCount] = TraficTicket(ticketsCount, _vehiclePlate, _infractionCategory, _dateInfraction, _infractionPoints, _observations, _valueToPay, _statusOfInfraction, false,  _infractorDriverAddress, msg.sender);

        // Update driver points
        uint driverPointsAfterInfraction = drivers[infractorDriverId].numberOfPoints + _infractionPoints;
        _driver.numberOfPoints = driverPointsAfterInfraction;
        drivers[infractorDriverId] = _driver;
        
        emit registeredInfraction( msg.sender, _infractorDriverAddress, "Infracao registrada com sucesso!" );
        ticketsCount++;
    }
    
    function registerTransferTicketRequest(uint _ticketId, address _requestedInfractorAddress )public{
        // Checks if is the current owner of infraction that is requesting
        require(tickets[_ticketId].infractorDriverAddress == msg.sender);
        
        tranferTicketsRequests[transferTicketsCount] = TransferTicket(transferTicketsCount, _ticketId, 0, msg.sender, _requestedInfractorAddress);
        transferTicketsCount++;
        
        emit TransferTicketEvent("Requisicao para transferencia de infracao realizada com sucesso!");
    }
    
    function registerCancelTicketRequest(uint _ticketId, string memory _explanation) public{
        // Checks if is the current owner of infraction that is requesting to cancel
        require(tickets[_ticketId].infractorDriverAddress == msg.sender);
        
        cancelTicketsRequests[cancelTicketsRequestCount] = CancelTickeRequest(cancelTicketsRequestCount, _ticketId, 0, _explanation, msg.sender, tickets[_ticketId].authorityResponsableAdress, TransitBoardResponsible);
        cancelTicketsRequestCount++;
        
        emit CancelTicketEvent("Requisicao para cancelamento de infracao realizada com sucesso!");
    }
     
    //  ============================================================== GET INFORMATION FUNCTIONS ==============================================================

    function getTicketInformationById(uint ticket_id) public view returns(string memory vehiclePlate, uint infractionCategory, string memory dateInfraction, uint infractionPoints, string memory observations, uint valueToPay, string memory statusOfInfraction, address infractorDriverAddress, address authorityResponsableAdress
    ){
        vehiclePlate = tickets[ticket_id].vehiclePlate;
        infractionCategory = tickets[ticket_id].infractionCategory;
        dateInfraction = tickets[ticket_id].dateInfraction;
        infractionPoints = tickets[ticket_id].infractionPoints;
        observations = tickets[ticket_id].observations;
        valueToPay = tickets[ticket_id].valueToPay;
        statusOfInfraction = tickets[ticket_id].statusOfInfraction;
        infractorDriverAddress = tickets[ticket_id].infractorDriverAddress;
        authorityResponsableAdress = tickets[ticket_id].authorityResponsableAdress;
    }


    function getDriverInformationById(uint driverId) public view returns (string memory name,uint numberOfPoints, address driverAddress, uint id){
        id = drivers[driverId].id;
        name = drivers[driverId].name;
        driverAddress = drivers[driverId].driverAddress;
        numberOfPoints = drivers[driverId].numberOfPoints;
    }

    function getDriverInformationByAddress(address _driverAddress) public view returns (string memory name,uint numberOfPoints, address driverAddress, uint id, bool exist){
        for (uint i=0; i<driversCount; i++) {
          if (drivers[i].driverAddress == _driverAddress) {
                    id = drivers[i].id;
                    name = drivers[i].name;
                    driverAddress = drivers[i].driverAddress;
                    numberOfPoints = drivers[i].numberOfPoints;
                    exist = drivers[i].exist;
            break;
          }
        }
    }
    
    function checkIfDriverIsRegisteredByAddress(address driverAddress) public view returns (bool registered){
        registered = driversListAddress[driverAddress].exist;
    }
    
    function checkIfAuthoritieExistsByAddress(address authoritieAddress) public view returns (bool exists){
        exists = authoritiesListAddress[authoritieAddress].exist;
    }
    
    function acceptTransferTicketRequest(uint _tranferTicketRequestId) public{
         // Get Transfer request informations
        TransferTicket memory _transferTicketRequest = tranferTicketsRequests[_tranferTicketRequestId];
        
        // Checks if is the status is Pending 
        require(_transferTicketRequest.status == 0);
        
        // Checks if is the requested owner of infraction that is requesting
        require(_transferTicketRequest.requestedInfractorAddress == msg.sender);
        
        // Update request status
        _transferTicketRequest.status = 1; //Accepted status
        tranferTicketsRequests[_tranferTicketRequestId] = _transferTicketRequest;
        
        // Load Ticket and update current owner information
        TraficTicket memory _ticket = tickets[_transferTicketRequest.ticketId];
        uint oldOwnerId = authoritiesListAddress[_ticket.infractorDriverAddress].id;
        
        _ticket.infractorDriverAddress = msg.sender;
        tickets[_transferTicketRequest.ticketId] = _ticket;
        
        // Remove points from old owner and add to current owner
        uint newOwnerId = authoritiesListAddress[_ticket.infractorDriverAddress].id;
        
        // Update old driver points
        Drivers memory _oldTicketOwnerDriver = drivers[oldOwnerId];
        uint oldDriverPointsAfterInfraction = drivers[oldOwnerId].numberOfPoints - _ticket.infractionPoints;
        _oldTicketOwnerDriver.numberOfPoints = oldDriverPointsAfterInfraction;
        drivers[oldOwnerId] = _oldTicketOwnerDriver;
        
        // Update new driver points
        Drivers memory _newTicketOwnerDriver = drivers[newOwnerId];
        uint newDriverPointsAfterInfraction = drivers[newOwnerId].numberOfPoints + _ticket.infractionPoints;
        _newTicketOwnerDriver.numberOfPoints = newDriverPointsAfterInfraction;
        drivers[newOwnerId] = _newTicketOwnerDriver;
        
        emit TransferTicketEvent("Requisicao para transferencia de infracao aceitada com sucesso!");
    }
    
    function rejectTransferTicketRequest(uint _tranferTicketRequestId) public{
         // Get Transfer request informations
        TransferTicket memory _transferTicketRequest = tranferTicketsRequests[_tranferTicketRequestId];
        
        // Checks if is the status is Pending and checks if is the requested owner of infraction that is requesting
        require(_transferTicketRequest.status == 0);
        require(_transferTicketRequest.requestedInfractorAddress == msg.sender);
        
        // Update request status
        _transferTicketRequest.status = 2; //Rejected status
        tranferTicketsRequests[_tranferTicketRequestId] = _transferTicketRequest;
        
        emit TransferTicketEvent("Requisicao para transferencia de infracao rejeitada com sucesso!");
    }
    
    function payInfraction(uint _ticketId) public payable {
        // Get Ticket INFORMATION
        TraficTicket memory _ticket = tickets[_ticketId];
        
        // Get the authoritie account
        address payable _authoritieReceiver = _ticket.authorityResponsableAdress;
        
        // Checks if is not the authoritie trying to pay the account and Require that there is enough Ether in the transaction
        require(_authoritieReceiver != msg.sender);
        require(msg.value >= _ticket.valueToPay);
        
        _ticket.payed = true;
        _ticket.statusOfInfraction = "Payed";
        tickets[_ticketId] = _ticket;
        
        //Cast to payable address
        address(uint160(_authoritieReceiver)).transfer(msg.value);
        
        emit TicketPayedEvent(_ticketId, msg.sender, "Infracao paga com sucesso!");
        
    }
    
    function rejectCancelTicketRequest(uint _cancelTicketRequestId) public{
        CancelTickeRequest memory _cancelTicketRequest = cancelTicketsRequests[_cancelTicketRequestId];
        
         // Checks if is the status is Pending 
        require(_cancelTicketRequest.status == 0);
        
        // Checks if user accepting is the authority responsable of infraction
        require(_cancelTicketRequest.transitBoardResponsible == msg.sender);
        
        // Update the request status
        _cancelTicketRequest.status = 2;
        cancelTicketsRequests[_cancelTicketRequestId] = _cancelTicketRequest;

        CancelTicketEvent( "Pedido de cancelamento rejeitado!");
    }
    
    function acceptCancelTicketRequest(uint _cancelTicketRequestId) public{
        CancelTickeRequest memory _cancelTicketRequest = cancelTicketsRequests[_cancelTicketRequestId];
        
         // Checks if is the status is Pending 
        require(_cancelTicketRequest.status == 0);
        
        // Checks if user accepting is the authority responsable of infraction
        require(_cancelTicketRequest.transitBoardResponsible == msg.sender);
        
        // Update the request status
        _cancelTicketRequest.status = 1;
        cancelTicketsRequests[_cancelTicketRequestId] = _cancelTicketRequest;
        
        // Call the function to cancel the infraction
        cancelInfraction(_cancelTicketRequest.ticketId);
    }
    
    function cancelInfraction(uint _ticketId) private {
        // Get Ticket INFORMATION
        TraficTicket memory _ticket = tickets[_ticketId];

        // Checks if is the responsible authoritie
        require(_ticket.authorityResponsableAdress == msg.sender);

        _ticket.payed = false;
        _ticket.statusOfInfraction = "Canceled";

        tickets[_ticketId] = _ticket;

        // Remove driver points
        uint _driverId = driversListAddress[_ticket.infractorDriverAddress].id;
        Drivers memory _driver = drivers[_driverId];
        uint driverPointsAfterCancel = drivers[_driverId].numberOfPoints - _ticket.infractionPoints;
        _driver.numberOfPoints = driverPointsAfterCancel;
        drivers[_driverId] = _driver;
        
        emit TicketPayedEvent(_ticketId, msg.sender, "Infracao cancelada com sucesso!");
    }
}
