import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
// import { spacing } from '@material-ui/system';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none',
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  [theme.breakpoints.down('xs')]: {
    image: {
      margin: 0,
    },
    userName: {
      display: 'none',
    },
    purple: {
      marginLeft: '20px'
    },
    logout: {
      marginLeft: '10px',
      alignItems: 'left'
    },
    login: {
      marginLeft: '50px',
      height: '40px',
      width: '100px',
      alignItems: 'left'
    },
    profile: {
      width: '100% ',
      margin: 0
    },
    appBar: {
      width: '60%',
      padding: 0,

    },
    heading: {
      fontSize: 40
    },
  }
}));