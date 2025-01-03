import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',

  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
    
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: '1 1 50%',
    // maxWidth: "50%",
    wordWrap: 'break-word', // Ensures text wraps
    overflowWrap: 'break-word',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
  imageSection: {
    flex: '1 1 50%',
    // maxWidth: '50%',
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      maxWidth: '100%',
    },
    
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
  },
}));