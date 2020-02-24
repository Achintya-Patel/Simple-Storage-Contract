contractABI =  [
    {
      "constant": true,
      "inputs": [],
      "name": "data",
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
          "internalType": "uint256",
          "name": "_data",
          "type": "uint256"
        }
      ],
      "name": "set",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "get",
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
    }
  ];
  contractAddress = '0x18f2685807434e3ba0114Dce4645818B894a9721';
  const web3 = new Web3('http://localhost:9545');
  const simpleStorage = new web3.eth.Contract(contractABI, contractAddress);

  document.addEventListener('DOMContentLoaded', () => {
      const $setData = document.getElementById('setData');
      const $data = document.getElementById('data');
      let accounts = [];

      web3.eth.getAccounts().then(_accounts => {
          accounts = _accounts;
      });

      const getData = () => {
        simpleStorage.methods.get().call().then((result) => {
            $data.innerHTML = result;
        })
      };
      getData();

      $setData.addEventListener('submit', (e) => {
          e.preventDefault();
          const data = e.target.elements[0].value;
          simpleStorage.methods.set(data).send({from: accounts[0]}).then(getData);
      });
  });