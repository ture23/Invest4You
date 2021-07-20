import React from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useStyles from './style';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { Button} from '@material-ui/core/';



import DeleteIcon from '@material-ui/icons/Delete';

import { useDispatch } from 'react-redux';


import { deleteCompany, likeCompany } from '../../../action/company';


const  Company = ({company, setCurrentId}) =>  {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  // console.log(company)
   const Likes = () => {
    if (company.likes.length > 0) {
      return company.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{company.likes.length > 2 ? `You and ${company.likes.length - 1} others` : `${company.likes.length} like${company.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{company.likes.length} {company.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const handleExpandClick = () => {
    setExpanded(!expanded)
  };
  const goTo = () => {window.scrollBy(0, 1500) }


  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>{company.name[0]}</Avatar>
        }
        action={
        
          
          (user?.result?.role === "admin") ?
          <IconButton aria-label="settings" onClick={() => setCurrentId(company._id) }>
            <MoreVertIcon onclick={(goTo())}/>
            </IconButton> : <Typography />
        
        }
        title= {company.name}
        subheader={company.dateOfPurchase}
      />
        <CardMedia className={classes.media} image={company.selectedFile} title="Paella dish" /><CardContent>
            <Typography variant="body2" color="textSecondary" component="p">Adresa: {company.address}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">{company.descriptionSmall}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button size="small" color="primary"  onClick={() => dispatch(likeCompany(company._id))}>
          <Likes />
        </Button>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        {(user) && (<IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>)}
        
        {(user?.result?.role === "admin")? 
          <IconButton aria-label="delete" className={classes.dalete} onClick={() => dispatch(deleteCompany(company._id))}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        : <Typography /> } 
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
            <Typography paragraph>Kupovna cijena: {company.bothPrice}$</Typography>
          
            <Typography paragraph>Trenutna cijena: {company.currentPrice}$</Typography>
            <Typography paragraph> Broj Dionica {company.numberOfStocks}</Typography>
            <Typography paragraph> Izracunata Vrijdnost {company.myValuePrice}$</Typography>
            <Typography paragraph> Podrucje: {company.industry}</Typography>      
            <Typography paragraph>{company.descriptionFull}</Typography>
            <Typography></Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Company;