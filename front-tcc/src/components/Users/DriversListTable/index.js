import React, {Component} from 'react';
import MaterialTable from "material-table";
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'

import Box from '@material-ui/core/Box';

class DriverListTable extends Component {

  _isTableMounted=false;
  columns = [
    { field: 'id', title: 'Id', tooltip:'Index do Usuário'},
    { field: 'name', title: 'Nome', tooltip:'Nome do Usuário' },
    { field: 'numberOfPoints', title: 'Pontos na Carteira', tooltip:'Pontos acumulados na Carteira' },
    { field: 'driverAddress', title: 'Chave Do Motorista', tooltip:'Chave única do motorista'},
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


  componentDidMount() {
    this._isTableMounted = true;
    console.log(this.props)

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
                data={this.props.rows}
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
                  exportFileName: "motoristas registrados",
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
                title="Motoristas Registrados"
                
                //onRowClick={(event, rowData, togglePanel) => togglePanel()}
              />
          </Box>
      )
    }
  }
}

export default (DriverListTable);