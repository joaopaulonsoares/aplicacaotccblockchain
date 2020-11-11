import React, {Component} from 'react';
import MaterialTable from "material-table";
import Box from '@material-ui/core/Box';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SendIcon from '@material-ui/icons/Send';
import GavelIcon from '@material-ui/icons/Gavel';

import CustomizedModal from '../../CustomizedModal/index'
import InfractionCancelRequestForm from '../InfractionCancelRequestForm/index'
import InfractionTransferRequestForm from '../InfractionTransferRequestForm/index'
import InfractionPayment from '../InfractionPayment/index'

class InfractionListTable extends Component {

  _isTableMounted=false;
  columns = [
    { field: 'id', title: 'Id', tooltip:'Id da infração'},
    { field: 'vehiclePlate', title: 'Placa', tooltip:'Placa do veículo'},
    { field: 'infractionCategory', title: 'Categoria', tooltip:'Categoria da infração(leve, média...)' },
    { field: 'dateInfraction', title: 'Data', tooltip:'Data da infração' },
    { field: 'infractionPoints', title: 'Pontos', tooltip:'Pontos da infração'},
    { field: 'observations', title: 'Observações', tooltip:'Observações inseridas' },
    { field: 'valueToPay', title: 'Valor', tooltip:'Custo referente a infração de trânsito.'},
    { field: 'statusOfInfraction', title: 'Situação', tooltip:'Situação da infração no momento' },
    { field: 'infractorDriverAddress', title: 'Motorista', tooltip:'Motorista autor da infração'},
    { field: 'authorityResponsableAdress', title: 'Autoridade', tooltip:'Autoridade responsável por registrar a infração'},
  ] 
    
  constructor(props) {
    super(props);
    this.state = {
      isLoadingTable:true,
      page: 0,
      setPage: 0,
      rowsPerPage: 30,
      setRowsPerPage : 10,
      rows: [ ],
      totalCount:0,
      currentPage:1,
      loadingTransaction: false,
      openCancelInfractionModalRequest:false,
      openTransferInfractionModalRequest:false,
      openPayInfractionModal:false
    };
    this.handleModalCancelInfractionClose = this.handleModalCancelInfractionClose.bind(this);
    this.handleModalTransferInfractionClose = this.handleModalTransferInfractionClose.bind(this);
    this.handleModalPayInfractionClose = this.handleModalPayInfractionClose.bind(this);
  }

  componentDidMount() {
    this._isTableMounted = true;
    if(this._isTableMounted){
      //this.loadDataInTable( () => {
        this.setState({isLoadingTable:false});
      //});
    }
  }


  handleModalCancelInfractionOpen(rowData){
    this.setState({infractionInfoRequest:rowData, openCancelInfractionModalRequest:true})
  }

  handleModalCancelInfractionClose(){
    this.setState({infractionInfoRequest:"", openCancelInfractionModalRequest:false})
  }

  handleModalTransferInfractionOpen(rowData){
    this.setState({infractionInfoRequest:rowData, openTransferInfractionModalRequest:true})
  }

  handleModalTransferInfractionClose(){
    this.setState({infractionInfoRequest:"", openTransferInfractionModalRequest:false})
  }

  handleModalPayInfractionOpen(rowData){
    this.setState({infractionInfoRequest:rowData, openPayInfractionModal:true})
  }

  handleModalPayInfractionClose(){
    console.log("chamou")
    this.setState({infractionInfoRequest:"", openPayInfractionModal:false})
  }
    
  render(){
    const tableRef = React.createRef();

 
      return (
          <Box width="auto" display="inline">
              <CustomizedModal open={this.state.openCancelInfractionModalRequest} handleClose={this.handleModalCancelInfractionClose} title="Recurso de Infração">
                <InfractionCancelRequestForm ticket={this.state.infractionInfoRequest} contract={this.props.contract} account={this.props.account}></InfractionCancelRequestForm>
              </CustomizedModal>
              
              <CustomizedModal open={this.state.openTransferInfractionModalRequest} handleClose={this.handleModalTransferInfractionClose} title="Transferência de Infração">
                <InfractionTransferRequestForm ticket={this.state.infractionInfoRequest} contract={this.props.contract} account={this.props.account}></InfractionTransferRequestForm>
              </CustomizedModal>
              
              <CustomizedModal open={this.state.openPayInfractionModal} handleClose={this.handleModalPayInfractionClose} title="Pagamento de Infração">
                <InfractionPayment ticket={this.state.infractionInfoRequest} contract={this.props.contract} account={this.props.account} handleClose={this.handleModalPayInfractionClose}></InfractionPayment>
              </CustomizedModal>
              
              <MaterialTable
                columns={this.columns}
                tableRef={tableRef}
                data={this.props.rows}
                actions={[
                  rowData => ({
                    icon: GavelIcon,
                    tooltip: 'Entrar com Recurso',
                    onClick: (event, rowData) => (
                      this.handleModalCancelInfractionOpen(rowData)
                   ),
                    disabled: rowData.statusOfInfraction !== "Active"
                  }),
                  rowData => ({
                    icon: SendIcon,
                    tooltip: 'Transferir Infração',
                    onClick: (event, rowData) => (
                      this.handleModalTransferInfractionOpen(rowData)
                   ),
                    disabled: rowData.statusOfInfraction !== "Active"
                  }),
                  rowData => ({
                    icon: AttachMoneyIcon,
                    tooltip: 'Pagar Infração',
                    onClick: (event, rowData) => (
                      this.handleModalPayInfractionOpen(rowData)
                   ),
                    disabled: rowData.statusOfInfraction !== "Active"
                  })
                ]}
                options={{
                  sorting: true,
                  exportButton: true,
                  exportAllData: true,
                  exportFileName: "infrações de trânsito",
                  pageSize:10,
                  pageSizeOptions:[5, 10, 20, 30, 40, 50, 100,1300],
                  emptyRowsWhenPaging:false,
                  removable:true,
                  actionsColumnIndex: -1
                }}
                localization={{
                  body: {
                    emptyDataSourceMessage: 'Nenhum resultado encontrado'
                  },
                  toolbar: {
                    searchTooltip: 'Pesquisar',
                    searchPlaceholder: 'Pesquisar'
                  },
                  pagination: {
                    labelRowsSelect: 'Linhas',
                    labelDisplayedRows: ' {from}-{to} de {count}',
                    firstTooltip: 'Primeira página',
                    previousTooltip: 'Página Anterior',
                    nextTooltip: 'Próxima página',
                    lastTooltip: 'Última página'
                  }
                }}
                title="Infrações Registradas"
                
              />

          </Box>
      )
    
  }
}

export default (InfractionListTable);