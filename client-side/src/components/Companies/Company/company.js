import React from 'react';
import clsx from 'clsx';
import Card from '@mui/material/core/Card';
import CardHeader from '@mui/material/core/CardHeader';
import CardMedia from '@mui/material/core/CardMedia';
import CardContent from '@mui/material/core/CardContent';
import CardActions from '@mui/material/core/CardActions';
import Collapse from '@mui/material/core/Collapse';
import Avatar from '@mui/material/core/Avatar';
import IconButton from '@mui/material/core/IconButton';
import Typography from '@mui/material/core/Typography';
// import FavoriteIcon from '@mui/material/icons/Favorite';
import ShareIcon from '@mui/material/icons/Share';
import ExpandMoreIcon from '@mui/material/icons/ExpandMore';
import MoreVertIcon from '@mui/material/icons/MoreVert';
import useStyles from './style';
import ThumbUpAltIcon from '@mui/material/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/material/icons/ThumbUpAltOutlined';
import { Button} from '@mui/material/core/';



import DeleteIcon from '@mui/material/icons/Delete';

import { useDispatch } from 'react-redux';


import { deleteCompany, likeCompany } from '../../../action/company';


const  Company = ({company, setCurrentId}) =>  {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  // console.log(company)
  let viedAddres = company.address.substring(0, 15);
  let viedDescription = company.descriptionSmall.substring(0, 52);
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
    <Card className={classes.root} >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>{company.name[0]}</Avatar>
        }
        action={
        
          
          (user?.result?.role === "admin") ?
          <IconButton aria-label="settings" onClick={() => (setCurrentId(company._id), goTo()) }>
            <MoreVertIcon  />
          </IconButton>
            : <IconButton aria-label="settings" href="/CompanyOverview"  onClick={() => setCurrentId(company._id) }>
                  <MoreVertIcon  />
              </IconButton>
        
        }
        title= {company.name}
        subheader={company.dateOfPurchase}
      />
      <CardMedia className={classes.media} image={company.selectedFile} title="Paella dish" />
      <CardContent>
            <Typography paragraph className={classes.view} variant="body2" color="textSecondary" component="p">Adresa: {viedAddres}...</Typography>
            <Typography maxLength={12} className={classes.view} variant="string" color="textSecondary" component="p">{viedDescription}...</Typography>
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