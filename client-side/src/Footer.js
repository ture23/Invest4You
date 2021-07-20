import React from "react";
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    row: {
        marginLeft: '67%',
        marginTop: '5%'
    }
  
}));
function Footer() {

    const classes = useStyles();
    return (
        <footer>
            <div >
                <div className="col span-1-of-2">
                    {/* <ul className="footer-nav">
                        <li><a href="nesto">About us</a></li>
                        <li><a href="nesto">Blog</a></li>
                        <li><a href="nesto">Press</a></li>
                        <li><a href= "nesto">iOS App</a></li>
                        <li><a href="nesto">Andriod App</a></li>
                    </ul> */}
                    
                </div>
                {/* <div className="col span-1-of-2">
                    <ul className="social-links">
                        <li><a href="www.facebook.com" target="_blank"><img src="Resorces/CSS/IMAGES/png-transparent-facebook-.png" alt="Invest logo"></img><i></i></a></li>
                        <li><a href="nesto"><img src="Resorces/CSS/IMAGES/twiter.png" alt="Invest logo"></img></a></li>
                        <li><a href="nesto"><img src="Resorces/CSS/IMAGES/Instagram400x230.png" alt="Invest logo"></img> <i></i> </a> </li>
                        <li><a href="nesto"><img src="Resorces/CSS/IMAGES/logo-google-.jpg" alt="Invest logo"></img><i></i></a></li>
                    </ul>
                </div> */}
            </div>
            <div className={classes.row}>
                <p className="copyright">copyright &copy; 2019 by Invest4You. all rights reserved  This page is made exclusively for Invest4You purposes.</p>
            </div>
		</footer>
		
	
        

    );
}

export default Footer