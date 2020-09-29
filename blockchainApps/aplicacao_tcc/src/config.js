export const APP_ADDRESS = '0xdDa5209dbd6fff0CE4d5f0249f2e7d52e6AC7533'
export const APP_ABI = [
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "authoritieAddress",
          "type": "address"
        }
      ],
      "name": "registeredAuthoritieEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "authoritieAddress",
          "type": "address"
        }
      ],
      "name": "registeredDriverEvent",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "authoritieAddress",
          "type": "address"
        }
      ],
      "name": "registeredInfraction",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "authorities",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "sigla",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "authoritieAddress",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "authoritiesCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "authoritiesList",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "authoritiesListUint",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "authoritiesMap",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "sigla",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "authoritieAddress",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "driverListUint",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "drivers",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "numberOfPoints",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "driverAddress",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "driversCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "driversList",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "driversMap",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "numberOfPoints",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "driverAddress",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "ownerInfraction",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "ticketList",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "tickets",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "vehiclePlate",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "infractionCategory",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "dateInfraction",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "infractionPoints",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "observations",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "valueToPay",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "statusOfInfraction",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "infractorDriverAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "authorityResponsableAdress",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "ticketsCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_sigla",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_authoritieAddress",
          "type": "address"
        }
      ],
      "name": "registerAuthoritie",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "numberOfPoints",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_driverAddress",
          "type": "address"
        }
      ],
      "name": "registerDriver",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "_vehiclePlate",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_infractionCategory",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_dateInfraction",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_infractionPoints",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_observations",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_valueToPay",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_statusOfInfraction",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_infractorDriverAddress",
          "type": "address"
        }
      ],
      "name": "registerInfraction",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "ticket_id",
          "type": "uint256"
        }
      ],
      "name": "getTicketInformation",
      "outputs": [
        {
          "internalType": "string",
          "name": "vehiclePlate",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "infractionCategory",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "dateInfraction",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "infractionPoints",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "observations",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "valueToPay",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "statusOfInfraction",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "infractorDriverAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "authorityResponsableAdress",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "driverId",
          "type": "uint256"
        }
      ],
      "name": "getDriverInformation",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "numberOfPoints",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "driverAddress",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "authoritieId",
          "type": "uint256"
        }
      ],
      "name": "getAuthoritieInformation",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "sigla",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "authoritieAddress",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]