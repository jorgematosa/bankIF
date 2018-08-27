import { NodeService } from './../node.service';
import { MainService } from './../main.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '../../../../node_modules/@angular/material';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  transfer = false;
  getClientInfo = false;
  listClients = false;
  listClientBalance = false;
  inputFieldsNumber = 2;
  input1: string = null;
  input2: string = null;
  input3: string = null;
  output1: string = null;
  output2: string = null;
  output3: string = null;
  option: string = null;
  clients: Clients[];
  message: any;
  actions: Actions[];
  displayedColumns: string[] = ['actionName', 'actionTime', 'clientName', 'balance'];
  displayedColumns2: string[] = ['clientName'];
  dataSource = new MatTableDataSource(this.actions);
  dataSource2 = new MatTableDataSource(this.clients);


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private mainService: MainService, private nodeService: NodeService) { }

  ngOnInit() {
    this.mainService.option.subscribe(
      (option: string) => {
        this.option = option;
        if (option === 'Transfer Money') {
          this.inputFieldsNumber = 3;
          this.input1 = 'Source Client Name';
          this.input2 = 'Target Client Name';
          this.input3 = 'Balance to Transfer';
        } else if (option === 'Remove Client' || option === 'Get Client Balance') {
          this.inputFieldsNumber = 1;
          this.input1 = 'Client Name';
        } else if (option === 'List Clients' || option === 'List Actions') {
          this.inputFieldsNumber = 0;
          this.onSubmit(null, null, null);
        } else {
          this.inputFieldsNumber = 2;
          this.input1 = 'Client Name';
          this.input2 = 'Balance';
        }
        this.message = null;
        this.output1 = null;
        this.output2 = null;
        this.output3 = null;
      }
    );
  }

  setFalse() {
    this.transfer = false;
    this.getClientInfo = false;
    this.listClients = false;
    this.listClientBalance = false;
  }

  onClick(value1: string, value2: string , value3: string) {
    console.log('input1: ' + value1);
    console.log('input2: ' + value2);
    console.log('input3: ' + value3);
  }

  onSubmit(output1: string, output2: string, output3: string) {
    if (this.option === 'Add Client') {
      const client = {clientName: output1, clientBalance: output2 };
      this.nodeService.addClient(client).subscribe(
        (result: any) => {
          console.log(result);
          this.message = result.outptString;
        }
      );
    }
    if (this.option === 'Remove Client') {
      const client = {clientName: output1};
      this.nodeService.removeClient(client).subscribe(
        (result: any) => {
          console.log(result);
          this.message = result.outptString;
        }
      );
    }
    if (this.option === 'Get Client Balance') {
      const client = {clientName: output1};
      this.nodeService.getClientBalance(client).subscribe(
        (result: any) => {
          console.log(result);
          this.message = result.outptString;
        }
      );
    }
    if (this.option === 'List Clients') {
      this.nodeService.listClients().subscribe(
        (results: any) => {
          console.log(results);
          this.clients = results.clients;
          this.dataSource2.data = this.clients;
          this.dataSource2.paginator = this.paginator;
          this.dataSource2.sortingDataAccessor = (item, property) => {
            switch (property) {
              case 'clientName': return item.CLIENT_NAME;
              default: return item[property];
            }
          };
          this.dataSource2.sort = this.sort;
          console.log(this.dataSource);
        }
      );
    }
    if (this.option === 'Deposit Money') {
      const client = {clientName: output1, amountToDeposit: output2};
      this.nodeService.depositMoney(client).subscribe(
        (result: any) => {
          console.log(result);
          this.message = result.outptString;
        }
      );
    }
    if (this.option === 'Transfer Money') {
      const client = {originClient: output1, destClient: output2, amountToTransfer: output3};
      this.nodeService.transferMoney(client).subscribe(
        (result: any) => {
          console.log(result);
          this.message = result.outptString;
        }
      );
    }
    if (this.option === 'Withdrawl Money') {
      const client = {clientName: output1, amountToWithdrawl: output2};
      this.nodeService.withdrawlMoney(client).subscribe(
        (result: any) => {
          console.log(result);
          this.message = result.outptString;
        }
      );
    }
    if (this.option === 'List Actions') {
      this.nodeService.listActions().subscribe(
        (results: any) => {
          this.actions = results.actions;
          this.dataSource.data = this.actions;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sortingDataAccessor = (item, property) => {
            switch (property) {
              case 'actionName': return item.ACTION_NAME;
              case 'actionTime': return item.ACTION_TIME;
              case 'clientName': return item.CLIENT_NAME;
              case 'balance': return item.BALANCE;
              default: return item[property];
            }
          };
          this.dataSource.sort = this.sort;
          console.log(this.dataSource);
        }
      );
    }
  }
}

export interface Actions {
  ACTION_NAME: string;
  ACTION_TIME: string;
  CLIENT_NAME: string;
  BALANCE: string;
}

export interface Clients {
  CLIENT_NAME: string;
}

