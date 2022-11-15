import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },

    box: {
        marginTop: '3em',
    },
    userbox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    container: {
        marginTop: '10em',
        backgroundColor: '#f5f9ff',
        padding: '2em',
        borderRadius: '10px',
    },
    containerUsers: {
        marginTop: '20em',
    },
    typography: {
        marginBottom: '1em',
        display: 'flex',
        justifyContent: 'space-between',
    },
    paper: {
        backgroundColor: '#f5f9ff',
        padding: '2em',
      
    },
    avatar: {
        height: '2em',
        width: '2em',
    },

    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    fileInput: {
        width: '97%',
        margin: '10px 0',
    },
    buttonSubmit: {
        marginBottom: 10,
    },
    btn: {
        marginRight: '2em',
    },

}));
