import { Component, NgZone } from '@angular/core';
import Web3 from 'web3';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ethBalance: any;
  ethAddress: any;
  ethAddressList: any[];
  baseCurrency: String = 'ETH';
  name: String;

  constructor(private zone: NgZone) {
    this.name = 'ETHEREUM';
    var web3: any = window['web3'];
    // var Web3: any = window['Web3'];
    var jsonData = [
      {
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        type: 'function'
      },
      {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        type: 'function'
      },
      {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [{ name: '', type: 'uint8' }],
        payable: false,
        type: 'function'
      },
      {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        type: 'function'
      },
      {
        constant: true,
        inputs: [{ name: '_owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: 'balance', type: 'uint256' }],
        payable: false,
        type: 'function'
      },
      {
        constant: false,
        inputs: [
          { name: '_to', type: 'address' },
          { name: '_value', type: 'uint256' }
        ],
        name: 'transfer',
        outputs: [{ name: 'success', type: 'bool' }],
        payable: false,
        type: 'function'
      },
      {
        constant: false,
        inputs: [
          { name: '_from', type: 'address' },
          { name: '_to', type: 'address' },
          { name: '_value', type: 'uint256' }
        ],
        name: 'transferFrom',
        outputs: [{ name: 'success', type: 'bool' }],
        payable: false,
        type: 'function'
      },
      {
        constant: false,
        inputs: [
          { name: '_spender', type: 'address' },
          { name: '_value', type: 'uint256' }
        ],
        name: 'approve',
        outputs: [{ name: 'success', type: 'bool' }],
        payable: false,
        type: 'function'
      },
      {
        constant: true,
        inputs: [
          { name: '_owner', type: 'address' },
          { name: '_spender', type: 'address' }
        ],
        name: 'allowance',
        outputs: [{ name: 'remaining', type: 'uint256' }],
        payable: false,
        type: 'function'
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: '_from', type: 'address' },
          { indexed: true, name: '_to', type: 'address' },
          { indexed: false, name: '_value', type: 'uint256' }
        ],
        name: 'Transfer',
        type: 'event'
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, name: '_owner', type: 'address' },
          { indexed: true, name: '_spender', type: 'address' },
          { indexed: false, name: '_value', type: 'uint256' }
        ],
        name: 'Approval',
        type: 'event'
      },
      {
        inputs: [
          { name: '_initialAmount', type: 'uint256' },
          { name: '_tokenName', type: 'string' },
          { name: '_decimalUnits', type: 'uint8' },
          { name: '_tokenSymbol', type: 'string' }
        ],
        payable: false,
        type: 'constructor'
      },
      {
        constant: false,
        inputs: [
          { name: '_spender', type: 'address' },
          { name: '_value', type: 'uint256' },
          { name: '_extraData', type: 'bytes' }
        ],
        name: 'approveAndCall',
        outputs: [{ name: 'success', type: 'bool' }],
        payable: false,
        type: 'function'
      },
      {
        constant: true,
        inputs: [],
        name: 'version',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        type: 'function'
      }
    ];

    if (typeof web3 !== 'undefined') {
      var w3js = new Web3(web3.currentProvider);
      var mythis = this;
      var contractAddress = '0x5b7093fe2491dfb058c94bcd62a1cd4d822f884c';
      w3js.eth.getAccounts(function(err, res) {
        mythis.ethAddressList = [];
        console.log(res.length);

        if (res.length > 0) {
          for (let i = 0; i < res.length; i++) {
            console.log(res[i]);
            var tokenInst = w3js.eth.contract(jsonData).at(contractAddress);
            var tokenbalance = tokenInst.balanceOf.call(
              '0x46c522ad7a8f9834e6d0fd35224cc0b5e93d154a',
              function(err, res) {
                console.log(res);
              }
            );
            var balance = w3js.fromWei(tokenbalance, 'ether');
            console.log(tokenbalance);
            console.log(balance);
          }
        } else {
          mythis.zone.run(() => {
            let obj = {
              address: 'Please authorise you account to view',

              balance: 'Please authorise you account to view'
            };
            mythis.ethAddressList.push(obj);
          });
        }
      });
    } else {
      alert('Web3 Not Supported/not autorized');
    }
  }

  ngOnInit() {}
}
