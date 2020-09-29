pragma solidity ^0.7.0;

contract Infraction{

    // Public Variables
    uint public ticketsCount;
    uint public driversCount;
    uint public authoritiesCount;


    //Model a trafic ticket
    struct TraficTicket{
        uint id;
        string vehiclePlate;
        uint infractionCategory; // 1-Leve 2-Média 3-Grave 4-Gravíssima
        string dateInfraction;
        uint infractionPoints;
        string observations;
        uint valueToPay;
        uint statusOfInfraction;

        address infractorDriverAddress;
        address authorityResponsableAdress;//Owner
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


    // Map Tickets
    mapping(uint => TraficTicket) public tickets;
    mapping(uint => Drivers) public drivers; // Para simular o banco auxiliar de motoristas
    mapping(address => Drivers) public driversMap;
    mapping(address => Authorities) public authoritiesMap;
    mapping(uint => Authorities) public authorities; // Para simular o banco auxiliar de autoridades

    // Create Lists
    uint[] public ticketList;
    address[] public driversList;
    uint[] public driverListUint;
    address[] public authoritiesList;
    uint[] public authoritiesListUint;

    // Address
    address public ownerInfraction; // Who register the infraction. Ex: Police Man


    // Events
    event registeredInfraction (
        address authoritieAddress
    );
    event registeredDriverEvent (
        address authoritieAddress
    );
    event registeredAuthoritieEvent (
        address authoritieAddress
    );


    //  ============================================================== CONSTRUCTOR ==============================================================
    //  Adding Some initial informations to the Blockchain

    constructor() public {
        /*
            AUTHORITIES GANACHE ACCOUNTS
            - INDEX 0 -> 0x0b3C91ffcF7e0f01633Ed11C6d3667272aB0B4a7
            - INDEX 1 -> 0x131939c0114374A718Be8cA9D62C92CD64890fe3
        */
        //Register some Authorities
        registerAuthoritie("Departamento Nacional de Transito","DNIT",0x4Ec72B1Bd5b4f6c6aECF9630a0e6F0479c0b2477);
        registerAuthoritie("Departamento Estadual de Transito do Distrito Federal","DETRAN-DF",0x7Fe8C20672FA2147d0db1fAa8C49fBEbA00f0c23);

        /*
                        DRIVERS GANACHE ACCOUNTS
            - INDEX 2 -> 0x49c5b42DeD7c979A0fc825A12ddba4529B846aA3
            - INDEX 3 -> 0xF879DEA577453A50b7bE8a4deA0928c118C0A574
            - INDEX 4 -> 0x310c0a6bf27bB70acAd16767F42F8c9dA79D7e61
        */
        // Register some drivers
        registerDriver("Joao",0,0x49c5b42DeD7c979A0fc825A12ddba4529B846aA3);
        registerDriver("Paulo",0,0xF879DEA577453A50b7bE8a4deA0928c118C0A574);
        registerDriver("Nunes",0,0x310c0a6bf27bB70acAd16767F42F8c9dA79D7e61);

        // Registering Some Tickets
        registerInfraction("ABC-1234",1,"01/01/2019",5,"Estava a 110 na via de 80",1,0,0x49c5b42DeD7c979A0fc825A12ddba4529B846aA3);
        registerInfraction("DEF-5678",2,"02/01/2019",3,"Estava a 90 na via de 50",2,1,0xF879DEA577453A50b7bE8a4deA0928c118C0A574);
        registerInfraction("GHI-9910",2,"03/01/2019",3,"Estava a 90 na via de 50",2,1,0x310c0a6bf27bB70acAd16767F42F8c9dA79D7e61);

    }

    //  ============================================================== REGISTER FUNCTIONS ==============================================================

    function registerAuthoritie(string memory _name,string memory _sigla, address _authoritieAddress) public{

        authoritiesMap[_authoritieAddress] = Authorities(authoritiesCount, _name, _sigla, _authoritieAddress);
        authorities[authoritiesCount] = Authorities(authoritiesCount, _name, _sigla, _authoritieAddress);

        authoritiesCount++;
        emit registeredAuthoritieEvent(msg.sender);
    }


    function registerDriver(string memory _name,uint numberOfPoints, address _driverAddress) public{

        driversMap[_driverAddress] = Drivers(driversCount, _name, numberOfPoints, _driverAddress);
        drivers[driversCount] = Drivers(driversCount, _name, numberOfPoints, _driverAddress);

        driversCount++;
        emit registeredDriverEvent(msg.sender);
    }


    function registerInfraction(string memory _vehiclePlate, uint _infractionCategory,
                                string memory _dateInfraction, uint _infractionPoints,
                                string memory _observations, uint _valueToPay,
                                uint _statusOfInfraction, address _infractorDriverAddress
    )public{
        // Require that the account registering the infraction is a authoritie
        //require(authorities[msg.sender]) = true;

        tickets[ticketsCount] = TraficTicket(ticketsCount, _vehiclePlate, _infractionCategory, _dateInfraction, _infractionPoints, _observations,
                                _valueToPay, _statusOfInfraction, _infractorDriverAddress, msg.sender);

        // Update driver points
        uint driverPointsAfterInfraction = driversMap[_infractorDriverAddress].numberOfPoints + _infractionPoints;
        driversMap[_infractorDriverAddress].numberOfPoints = driverPointsAfterInfraction;

        // trigger infraction registered event
        emit registeredInfraction(msg.sender);
        ticketsCount++;
    }

    //  ============================================================== GET INFORMATION FUNCTIONS ==============================================================

    function getTicketInformation(uint ticket_id) public view returns(string memory vehiclePlate, uint infractionCategory,
                                string memory dateInfraction, uint infractionPoints,
                                string memory observations, uint valueToPay,
                                uint statusOfInfraction, address infractorDriverAddress, address authorityResponsableAdress
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


    /*function getDriverInformation(address driverAddress) public view returns (string memory name,uint numberOfPoints){
        name = drivers[driverAddress].name;
        numberOfPoints = drivers[driverAddress].numberOfPoints;

    }*/


    function getDriverInformation(uint driverId) public view returns (string memory name,uint numberOfPoints, address driverAddress){
        name = drivers[driverId].name;
        driverAddress = drivers[driverId].driverAddress;
        numberOfPoints = drivers[driverId].numberOfPoints;
    }

    /*function getAuthoritieInformation(address authoritieAddress) public view returns (string memory name, string memory sigla){
        name = authorities[authoritieAddress].name;
        sigla = authorities[authoritieAddress].sigla;

    }*/

    function getAuthoritieInformation(uint authoritieId) public view returns (string memory name, string memory sigla,
    address authoritieAddress){
        name = authorities[authoritieId].name;
        sigla = authorities[authoritieId].sigla;
        authoritieAddress = authorities[authoritieId].authoritieAddress;
    }


}
