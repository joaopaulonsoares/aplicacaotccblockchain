import React from 'react';
import PhoneIcon from '@material-ui/icons/Phone';
import ListIcon from "@material-ui/icons/List";
import AudienciasLogo from './icons/audiencias-icone.svg'
import eDemocraciaLogo from './icons/e-Democracia.svg'
import PautaLogo from './icons/pauta-icone.svg'
import AssignmentIcon from '@material-ui/icons/Assignment';
import WikilegisLogo from './icons/logo-wikilegis-icone.svg'
import { makeStyles } from '@material-ui/core/styles';


export const toolsInfo={

    audiencias:{
      icon: false,
      icon_svg: AudienciasLogo,
      title:"Audiências",
      pageisActive:{
        chart:false,
        report:true,
        analytics:true,
      },
      url:{
        chart:"/audiencias-graficos",
        report:"/audiencias-relatorios",
        analytics:"/audiencias-analytics"
      }
    },
    eDemocracia:{
      icon: false,
      icon_svg: eDemocraciaLogo,
      title:"Portal e-Democracia",
      pageisActive:{
        chart:false,
        report:true,
        analytics:true,
      },
      url:{
        chart:"/edemocracia-graficos",
        report:"/edemocracia-relatorios",
        analytics:"/edemocracia-analytics"
      }
    },
    enquetes:{
      icon: <ListIcon></ListIcon>,
      title:"Enquetes",
      pageisActive:{
        chart:false,
        report:true,
        analytics:true,
      },
      url:{
        chart:"/enquetes-graficos",
        report:"/enquetes-relatorios",
        analytics:"/enquetes-analytics"
      }
    },
    pauta:{
      icon: false,
      icon_svg: PautaLogo,
      title:"Pauta Participativa",
      pageisActive:{
        chart:false,
        report:true,
        analytics:true,
      },
      url:{
        chart:"/pauta-graficos",
        report:"/pauta-relatorios",
        analytics:"/pauta-analytics"
      }
    },
    plenarinho:{
      icon: <AssignmentIcon></AssignmentIcon>,
      title:"Plenarinho",
      pageisActive:{
        chart:false,
        report:false,
        analytics:false,
      },
      url:{
        chart:"",
        report:"",
        analytics:""
      }
    },
    wikilegis:{
      icon: false,
      icon_svg: WikilegisLogo,
      title:"Wikilegis",
      pageisActive:{
        chart:false,
        report:true,
        analytics:true,
      },
      url:{
        chart:"/wikilegis-graficos",
        report:"/wikilegis-relatorios",
        analytics:"/wikilegis-analytics"
      }
    },
    zero800:{
      icon: <PhoneIcon></PhoneIcon>,
      title:"Disque Câmara",
      pageisActive:{
        chart:false,
        report:false,
        analytics:false,
      },
      url:{
        chart:"/0800-graficos",
        report:"/0800-relatorios",
        analytics:"/0800-analytics"
      }
    },
}

const drawerWidth = 300;

export const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    padding: theme.spacing(1),
    paper: {
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
  }));