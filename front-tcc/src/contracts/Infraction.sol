// SPDX-License-Identifier: MIT
 

pragma solidity ^0.7.0;

contract InfractionTcc{

    // Public Variables for easy access
    uint public ticketsCount;
    uint public driversCount;
    uint public authoritiesCount;
    uint public transferTicketsCount;
    uint public cancelTicketsRequestCount;


    //Model a trafic ticket
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

    // Model a Driver
    struct Drivers{
        uint id;
        string name;
        uint numberOfPoints;
        address driverAddress;
    }

    // Model Authoritie
    struct Authorities{
        uint id;
        string name;
        string sigla;
        address authoritieAddress;
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
    }


    // Map Tickets
    mapping(uint => TraficTicket) public tickets;
    mapping(uint => Drivers) public drivers;
    mapping (address => Drivers) driversListAddress; // Just to get driver Id easily 
    mapping(uint => Authorities) public authorities; // Para simular o banco auxiliar de autoridades
    mapping(uint => TransferTicket) public tranferTicketsRequests;
    mapping(uint => CancelTickeRequest) public cancelTicketsRequests;


    // Create Lists to access vlues
    uint[] public ticketList;
    address[] public driversList;
    uint[] public driverListUint;
    address[] public authoritiesList;
    uint[] public authoritiesListUint;


    // Address
    address public ownerInfraction; // Who register the infraction. Ex: Police Man


    // Events
    event registeredInfraction (address indexed authoritieAddress, address indexed driverAddress, string message);

    event registeredDriverEvent (address authoritieAddress);

    event registeredAuthoritieEvent (address authoritieAddress);
    
    event TicketPayedEvent (uint ticketId, address accountThatPayed, string message);
    
    event TransferTicketEvent(string message);
    
    event CancelTicketEvent(string message);
    

    //  ============================================================== CONSTRUCTOR ==============================================================
    //  Adding Some initial informations to the Blockchain

    constructor(){

    }

    //  ============================================================== REGISTER FUNCTIONS ==============================================================

    function registerAuthoritie(string memory _name,string memory _sigla, address _authoritieAddress) public{

        //authoritiesMap[_authoritieAddress] = Authorities(authoritiesCount, _name, _sigla, _authoritieAddress);
        authorities[authoritiesCount] = Authorities(authoritiesCount, _name, _sigla, _authoritieAddress);

        authoritiesCount++;
        emit registeredAuthoritieEvent(msg.sender);
    }


    function registerDriver(string memory _name,uint numberOfPoints, address _driverAddress) public{

        //driversListAddress[_driverAddress] = Drivers(driversCount, _name, numberOfPoints, _driverAddress);
        drivers[driversCount] = Drivers(driversCount, _name, numberOfPoints, _driverAddress);
        driversListAddress[_driverAddress] =  Drivers(driversCount, _name, numberOfPoints, _driverAddress);
        driversCount++;
        emit registeredDriverEvent(msg.sender);
    }


    function registerInfraction(string memory _vehiclePlate, uint _infractionCategory,
                                string memory _dateInfraction, uint _infractionPoints,
                                string memory _observations, uint _valueToPay,
                                string memory _statusOfInfraction, address _infractorDriverAddress, uint _infractorDriverId)public{
        // Require that the account registering the infraction is a authoritie
        //require(authorities[msg.sender]) = true;
        Drivers memory _driver = drivers[_infractorDriverId];


        tickets[ticketsCount] = TraficTicket(ticketsCount, _vehiclePlate, _infractionCategory, _dateInfraction, _infractionPoints, _observations,
                                _valueToPay, _statusOfInfraction, false,  _infractorDriverAddress, msg.sender);

        // Update driver points
        uint driverPointsAfterInfraction = drivers[_infractorDriverId].numberOfPoints + _infractionPoints;
        //driversListAddress[_infractorDriverAddress].numberOfPoints = driverPointsAfterInfraction;
        _driver.numberOfPoints = driverPointsAfterInfraction;
        drivers[_infractorDriverId] = _driver;
        
        

        // trigger infraction registered event
        emit registeredInfraction( msg.sender, _infractorDriverAddress, "Infracao registrada com sucesso!" );
        ticketsCount++;
    }
    
        
    function registerTransferTicketRequest(uint _ticketId,
                                           address _requestedInfractorAddress )public{
         // Get Ticket INFORMATION
        TraficTicket memory _ticket = tickets[_ticketId];
        
        // Checks if is the current owner of infraction that is requesting
        require(_ticket.infractorDriverAddress == msg.sender);
        
        tranferTicketsRequests[transferTicketsCount] = TransferTicket(transferTicketsCount, _ticketId, 0,
                                                                      msg.sender, _requestedInfractorAddress);
        transferTicketsCount++;
        
        emit TransferTicketEvent("Requisicao para transferencia de infracao realizada com sucesso!");
                                                                      
    }
    
    function registerCancelTicketRequest(uint _ticketId, string memory _explanation) public{
         // Get Ticket INFORMATION
        TraficTicket memory _ticket = tickets[_ticketId];
        
        // Checks if is the current owner of infraction that is requesting to cancel
        require(_ticket.infractorDriverAddress == msg.sender);
        
        cancelTicketsRequests[cancelTicketsRequestCount] = CancelTickeRequest(cancelTicketsRequestCount, _ticketId, 0, _explanation, msg.sender, _ticket.authorityResponsableAdress);
        cancelTicketsRequestCount++;
        
        emit CancelTicketEvent("Requisicao para cancelamento de infracao realizada com sucesso!");
                                                                      
    }
     
    //  ============================================================== GET INFORMATION FUNCTIONS ==============================================================

    function getTicketInformationById(uint ticket_id) public view returns(string memory vehiclePlate, uint infractionCategory,
                                string memory dateInfraction, uint infractionPoints,
                                string memory observations, uint valueToPay,
                                string memory statusOfInfraction, address infractorDriverAddress, address authorityResponsableAdress
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

    function getAuthoritieInformationById(uint authoritieId) public view returns (string memory name, string memory sigla, address authoritieAddress){
        name = authorities[authoritieId].name;
        sigla = authorities[authoritieId].sigla;
        authoritieAddress = authorities[authoritieId].authoritieAddress;
    }
    
    function getDriverIdByAddress(address driverAddress) private view returns (uint id){
        id = driversListAddress[driverAddress].id;
    }
    
    // ============================================== TRANSFER INFRACTION FUNCTIONS ==================================================
    
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
        uint oldOwnerId = getDriverIdByAddress(_ticket.infractorDriverAddress);
        
        _ticket.infractorDriverAddress = msg.sender;
        tickets[_transferTicketRequest.ticketId] = _ticket;
        
        // Remove points from old owner and add to current owner
        uint newOwnerId = getDriverIdByAddress(msg.sender);
        
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
        
        // Checks if is the status is Pending 
        require(_transferTicketRequest.status == 0);
        
        // Checks if is the requested owner of infraction that is requesting
        require(_transferTicketRequest.requestedInfractorAddress == msg.sender);
        
        // Update request status
        _transferTicketRequest.status = 2; //Rejected status
        tranferTicketsRequests[_tranferTicketRequestId] = _transferTicketRequest;
        

        emit TransferTicketEvent("Requisicao para transferencia de infracao rejeitada com sucesso!");
                                                                      
    }
    
    
    // =========================================================== PAY INFRACTION ==================================================================================
    
    function payInfraction(uint _ticketId) public payable {
        // Get Ticket INFORMATION
        TraficTicket memory _ticket = tickets[_ticketId];
        
        // Get the authoritie account
        address payable _authoritieReceiver = _ticket.authorityResponsableAdress;
        
        // Checks if is not the authoritie trying to pay the account
        require(_authoritieReceiver != msg.sender);
        
        // Require that there is enough Ether in the transaction
        require(msg.value >= _ticket.valueToPay);
        
        _ticket.payed = true;
        _ticket.statusOfInfraction = "Payed";
        
        tickets[_ticketId] = _ticket;
        
       // address(_authoritieReceiver).transfer(msg.value);
        
        emit TicketPayedEvent(_ticketId, msg.sender, "Infracao paga com sucesso!");
        
    }
    
    // ======================================================== CANCEL INFRACTION ====================================================
    
    function rejectCancelTicketRequest(uint _cancelTicketRequestId) public{
        CancelTickeRequest memory _cancelTicketRequest = cancelTicketsRequests[_cancelTicketRequestId];
        
         // Checks if is the status is Pending 
        require(_cancelTicketRequest.status == 0);
        
        // Checks if user accepting is the authority responsable of infraction
        require(_cancelTicketRequest.authorityResponsableAdress == msg.sender);
        
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
        require(_cancelTicketRequest.authorityResponsableAdress == msg.sender);
        
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
        uint _driverId = getDriverIdByAddress(_ticket.infractorDriverAddress);
        Drivers memory _driver = drivers[_driverId];
        uint driverPointsAfterCancel = drivers[_driverId].numberOfPoints - _ticket.infractionPoints;
        _driver.numberOfPoints = driverPointsAfterCancel;
        drivers[_driverId] = _driver;
        
        
        
        //emit TicketPayed(_ticketId, msg.sender, "Infracao cancelada com sucesso!");
        
    }

}
