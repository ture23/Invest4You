import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
  container: {
    position: 'relative',
    maxWidth: '100%'
    // flexWrap:  
  },
   item: {
    maxWidth: '25%'
  },
  [theme.breakpoints.down('xs')]: {
    item: {maxWidth: 'none'}
    
  }
}));  