import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import {
  withStyles
} from '@material-ui/core/styles';


const useStyles = theme => ({
  '@global': {
    body: {
      backgroundColor: "theme.palette.common.white",
      fontFamily: "Lato, sans-serif",
    },
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },

  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  },
  tableRoot: {
    width: '100%',
  },
  tableWrapper: {
    maxHeight: 440,
    overflow: 'auto',
  },

});

class InitialDashboard extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      openSnackBar:false,
      snackBarMessageError:""
    };
  }


  componentDidMount() {
    this._isMounted = true;
    /*
    if(this._isMounted){
      // If we need to wait for something to full render before render the page
      this.checkIfUserIsAuthenticaded(() => {

        this.checkIfUserIsAdmin( () => {

          this.setState({isLoadingPage:false});

        });

      });
    }
    */
    this.setState({isLoadingPage:false});

  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleCloseSnackBar() {
    this.openSnackBar = false;
  }


  render() {
    
    
    return  (
      
        <React.Fragment>
          <Paper>
            <Box style={{padding: '1rem'}}>
              <center><h1>Dados da participação pública da Câmara dos Deputados</h1>
              <img src="/img/initial_dashboard.svg" height="500" width="500" alt="Imagem logo" />
              <h2 style={{lineHeight: '1.5', padding: '1rem', textAlign: 'justify'}}><center> Bem vindo a plataforma de participação pública da Câmara dos Deputados! </center></h2>
              <p style={{fontSize: '1.2rem', lineHeight: '2.5', padding: '0 5rem 0 5rem', textAlign: 'justify'}}> Neste portal, nós disponibilizamos os dados em forma gráfica e textual das plataformas de participação da Câmara dos Deputados.
                Como ainda estamos em fase de protótipo, somente os relatórios estão disponíveis. Estes dados são obtidos diretamente das API's das aplicações e são dados reais das plataformas, obtidos no momento que a página está sendo carregada.
                </p> <p style={{fontSize: '1.2rem', lineHeight: '1.5', padding: '1rem', textAlign: 'justify'}}><center> Agradecemos a sua colaboração!</center></p>
              </center>
            </Box>
          </Paper>
        </React.Fragment>
      
    );
  }

}

export default withStyles(useStyles)(InitialDashboard);