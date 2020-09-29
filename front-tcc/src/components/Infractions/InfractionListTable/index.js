import React, {Component} from 'react';
import MaterialTable from "material-table";
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'

import Box from '@material-ui/core/Box';

class InfractionListTable extends Component {

  _isTableMounted=false;
  columns = [
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
      currentPage:1
    };
  }

  /*getRooms = (url, rooms, resolve, reject) => {
    axios.get(url)
    .then(response => {
      const retrivedRooms = rooms.concat(response.data.results)
      if (response.data.next !== null) {
        var nextUrl = (response.data.next).replace("http","https")

        this.setState({currentPage: ((response.data.next).match(/(\d+)/))})
        this.getRooms(nextUrl, retrivedRooms, resolve, reject)
      } else {
        resolve(retrivedRooms)
      }
    })
    .catch(error => {
      console.log(error)
      reject('Something wrong. Please refresh the page and try again.')
    })
  }*/

/*
  loadDataInTable(callback){
    const url = new URL(AUDIENCIAS_ROOM_API_URL)

    new Promise((resolve, reject) => {
      this.getRooms(url, [], resolve, reject)
    })
    .then(response => {
      this.setState({rows: response})
      callback()
    })
    //callback();
  }*/
  
  componentDidMount() {
    this._isTableMounted = true;
    
    if(this._isTableMounted){
      //this.loadDataInTable( () => {
        this.setState({isLoadingTable:false});
      //});
    }
  }
    
  render(){
    const loading = this.state.isLoadingTable
    const tableRef = React.createRef();

    if(loading){
      return (<div align="center"> 
                <Box width="auto" display="inline">
                  <CircularProgress></CircularProgress> 
                </Box>
                <Box>
                  Buscando dados da página {this.state.currentPage[0]}
                </Box>
              </div>
             )
    }else{
      return (
          <Box width="auto" display="inline">
              <MaterialTable
                columns={this.columns}
                tableRef={tableRef}
                data={this.state.rows}
                actions={[
                  {
                    icon: 'refresh',
                    tooltip: 'Refresh Data',
                    isFreeAction: true,
                    onClick: () => tableRef.current && tableRef.current.onQueryChange(),
                  }
                ]}
                options={{
                  sorting: true,
                  exportButton: true,
                  exportAllData: true,
                  exportFileName: "salas_audiencias_interativas",
                  pageSize:10,
                  pageSizeOptions:[5, 10, 20, 30, 40, 50, 100,1300],
                  emptyRowsWhenPaging:false,
                  removable:true
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
                
                onRowClick={(event, rowData, togglePanel) => togglePanel()}
              />
          </Box>
      )
    }
  }
}

export default (InfractionListTable);